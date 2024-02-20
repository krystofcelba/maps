package com.rnmapbox.rnmbx.utils

import android.content.Context
import android.graphics.Bitmap
import android.net.Uri
import android.util.DisplayMetrics
import android.util.Log
import com.facebook.common.references.CloseableReference
import com.facebook.datasource.DataSources
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.imagepipeline.common.RotationOptions
import com.facebook.imagepipeline.image.CloseableImage
import com.facebook.imagepipeline.image.CloseableStaticBitmap
import com.facebook.imagepipeline.request.ImageRequestBuilder
import com.facebook.react.views.imagehelper.ImageSource
import com.mapbox.maps.MapboxMap
import com.rnmapbox.rnmbx.components.images.ImageManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File
import java.lang.ref.WeakReference
import com.rnmapbox.rnmbx.components.images.ImageInfo
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll

data class DownloadedImage(val name: String, val bitmap: Bitmap, val info: ImageInfo)

class DownloadMapImageCoroutine(
    context: Context,
    private val map: MapboxMap,
    private val imageManager: ImageManager?,
    private val callback: OnAllImagesLoaded? = null
) {
    private val mContext: WeakReference<Context> = WeakReference(context.applicationContext)

    interface OnAllImagesLoaded {
        fun onAllImagesLoaded()
    }

    fun downloadImages(imageEntries: Array<Map.Entry<String, ImageEntry>>) {
        CoroutineScope(Dispatchers.IO).launch {
            val images = imageEntries.map { (name, imageEntry) ->
                async { downloadImage(name, imageEntry) }
            }.awaitAll().filterNotNull()

            withContext(Dispatchers.Main) {
                postProcessImages(images)
            }
        }
    }

    private suspend fun downloadImage(name: String, imageEntry: ImageEntry): DownloadedImage? =
        withContext(Dispatchers.IO) {
            val context = mContext.get() ?: return@withContext null
            var uri = imageEntry.uri
            if (uri.startsWith("/")) {
                uri = Uri.fromFile(File(uri)).toString()
            }
            val source = ImageSource(context, uri)
            val request = ImageRequestBuilder.newBuilderWithSource(source.uri)
                .setRotationOptions(RotationOptions.autoRotate())
                .build()
            val dataSource = Fresco.getImagePipeline().fetchDecodedImage(request, null)
            var result: CloseableReference<CloseableImage>? = null
            try {
                result = DataSources.waitForFinalResult(dataSource)
                result?.get()?.let { image ->
                    if (image is CloseableStaticBitmap) {
                        val bitmap = image.underlyingBitmap.copy(Bitmap.Config.ARGB_8888, true)
                        Log.e(
                            "RNMBXImageManager",
                            "downloadImage: $name $uri $image ${image.width}x${image.height}"
                        )
                        bitmap.density = DisplayMetrics.DENSITY_DEFAULT
                        return@withContext DownloadedImage(name, bitmap, imageEntry.info)
                    }
                }
            } catch (e: Throwable) {
                e.localizedMessage?.let { Logger.w(LOG_TAG, it) }
            } finally {
                dataSource.close()
                result?.let { CloseableReference.closeSafely(it) }
            }
            null
        }

    private fun postProcessImages(images: List<DownloadedImage>) {
        val map = map
        if (images.isNotEmpty()) {
            map.getStyle { style ->
                images.forEach { image ->
                    imageManager?.resolve(image.name, image.bitmap)
                    style.addImage(image.name, image.bitmap)
                }
                callback?.onAllImagesLoaded()
            }
        }
    }

    companion object {
        const val LOG_TAG = "DownloadMapImageCoroutine"
    }
}
