import React, {useCallback, useMemo} from 'react';
import {StyleProp, StyleSheet} from 'react-native';
import MapboxGL, {SymbolLayerStyle, UserTrackingMode} from '@rnmapbox/maps';
import {OnPressEvent} from '@rnmapbox/maps/src/types/OnPressEvent';
import GeoJSON from 'geojson';

import { ExampleWithMetadata } from '../common/ExampleMetadata'; // exclude-from-doc

const data: Marker[] = [
  {
    coordinates: [50.07959274896757, 14.436165032841956],
    id: 'id_0',
    name: 'MindMaze Prague Escape Games',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/29bcba87-89a6-4426-bc73-92666e01eb8f.JPG',
  },
  {
    coordinates: [50.08624686600919, 14.420250430408032],
    id: 'id_1',
    name: 'The World of Banksy',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/ba79604a-f385-4341-91db-0b6f77c1c6d1.jpeg',
  },
  {
    coordinates: [50.089888176796734, 14.41526344250181],
    id: 'id_2',
    name: 'Galerie Rudolfinum',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/46a984af-ebf6-4dcc-9e36-8305b6dd7957.jpg',
  },
  {
    coordinates: [50.08764733675608, 14.419153256325359],
    id: 'id_3',
    name: 'Trichodon - Sculpture Line installation',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/ad8c8df0-06b0-48e6-b031-6f821f7ec044.jpg',
  },
  {
    coordinates: [50.0996716, 14.445984],
    id: 'id_4',
    name: 'Prague Marketplace',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/697d43a1-0f48-455a-aa55-b9bd477da1da/resources/76964.jpg',
  },
  {
    coordinates: [50.0988, 14.408623],
    id: 'id_5',
    name: 'Sucharda Family Villa',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/a7f40272-c9c5-433a-96a0-fe2a3bfd2609/resources/76966.jpg',
  },
  {
    coordinates: [50.099255, 14.409747],
    id: 'id_6',
    name: 'Sucharda Studio Villa',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/0efc6b69-ffe9-407d-831a-14a4b3dd5159/resources/76967.jpg',
  },
  {
    coordinates: [50.09897, 14.409668],
    id: 'id_7',
    name: 'Karel Maška Villa',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/22da451f-1a76-4140-b91f-89dfe45a439d/resources/76968.jpg',
  },
  {
    coordinates: [50.098868, 14.407649],
    id: 'id_8',
    name: 'Villa Pellé',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/f17f1c55-94a4-4905-a8b1-f7ec20d9b7d3/resources/76969.jpg',
  },
  {
    coordinates: [50.098763, 14.408357],
    id: 'id_9',
    name: 'Jan Koula Villa',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/d5c8d3d9-0e1b-48b1-ad45-b5e3b7d5285e/resources/76970.jpg',
  },
  {
    coordinates: [50.102424, 14.40714],
    id: 'id_10',
    name: 'Villa Lanna',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/218920c2-2cf0-4dd0-b134-2a8c5a47f9a6/resources/76971.jpg',
  },
  {
    coordinates: [50.104528, 14.414237],
    id: 'id_11',
    name: "Governor's Summer Palace",
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/6fd12bb0-3419-43fc-b474-3430fe3accdf/resources/76972.jpg',
  },
  {
    coordinates: [50.102361, 14.408033],
    id: 'id_12',
    name: 'Julius Petschek Villa',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/e5e66f38-e245-487f-b58a-c3ffc9357596/resources/76973.jpg',
  },
  {
    coordinates: [50.0763316, 14.4370984],
    id: 'id_13',
    name: 'Vinohrady Theatre',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/7ab8dae9-79f1-4393-822b-d4ab2c1fee2d/resources/76974.jpg',
  },
  {
    coordinates: [50.1015228, 14.4323338],
    id: 'id_14',
    name: 'National Gallery - Trade Fair Palace',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/d09b7a41-7376-4c01-b77d-4d1fcf9e974a/resources/76976.jpg',
  },
  {
    coordinates: [50.103763, 14.414041],
    id: 'id_15',
    name: 'Friedrich Petschek Villa',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/48aebdaa-99fa-4520-98da-b1dca1587672/resources/76977.jpg',
  },
  {
    coordinates: [50.104497, 14.419532],
    id: 'id_16',
    name: "Rudolf's Water Tunnel",
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/eddc15f0-0dab-449b-9a48-28305d726f75/resources/76978.jpg',
  },
  {
    coordinates: [50.105043, 14.422109],
    id: 'id_17',
    name: 'Vozovna - Former Tram Depot',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/d173ac12-3b69-40f0-bf0b-49af9e7a2dae/resources/76979.jpg',
  },
  {
    coordinates: [50.1067851, 14.4475545],
    id: 'id_18',
    name: 'DOX',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/d9ba8113-c221-4913-8d03-f2b03eca4853/resources/76980.jpg',
  },
  {
    coordinates: [50.1164253, 14.4128699],
    id: 'id_19',
    name: 'Troja Château',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/982057d0-92da-41d7-9dd0-7d872c286121.jpg',
  },
  {
    coordinates: [50.1177728, 14.4056288],
    id: 'id_20',
    name: 'Prague Zoo',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/85ae5689-3f2c-41af-b413-f37614affb19/resources/76983.jpg',
  },
  {
    coordinates: [50.079641, 14.440128],
    id: 'id_21',
    name: 'Rieger Gardens Viewpoint',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/1c2b8d44-59fc-4cce-93d1-214dd361c9fe/resources/76984.jpg',
  },
  {
    coordinates: [50.103706, 14.408427],
    id: 'id_22',
    name: 'Na Slamníku Pub',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/b07c6b3b-f295-4c75-8f9b-90abf0c7bf56/resources/76985.jpg',
  },
  {
    coordinates: [50.108661, 14.454758],
    id: 'id_23',
    name: 'Holešovice Docks',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/ce80968f-10ea-4f5f-b193-a6f20a3c0196/resources/76986.jpg',
  },
  {
    coordinates: [50.105779, 14.45024],
    id: 'id_24',
    name: 'Holešovice Town Brewery',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/c13545de-afcd-4db4-ae87-77732fc524a4/resources/76987.jpg',
  },
  {
    coordinates: [50.1082927, 14.443228],
    id: 'id_25',
    name: 'Cross Club',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/c5a64bbe-1b17-45fe-a90a-a98e31e5f360/resources/76988.jpg',
  },
  {
    coordinates: [50.099567, 14.4357],
    id: 'id_26',
    name: 'Hussite Church',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/af64e95d-d9f9-4c3c-9ed3-3c7a51c03b99/resources/76990.jpg',
  },
  {
    coordinates: [50.0866732, 14.419156],
    id: 'id_27',
    name: 'Hard Rock Cafe',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/6250c7fb-cce6-42b2-8e1c-cfb746195bae/resources/76992.jpg',
  },
  {
    coordinates: [50.084798, 14.421787],
    id: 'id_28',
    name: 'Angelato - Ice Cream Heaven',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/07a26e9e-4169-4e48-ba88-cbab6d27d83f/resources/76999.jpg',
  },
  {
    coordinates: [50.084459, 14.420688],
    id: 'id_29',
    name: 'Praha exchange',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/96faf741-76a6-4cd0-9a31-b400bdb54a1b/resources/77000.jpg',
  },
  {
    coordinates: [50.085081, 14.427874],
    id: 'id_30',
    name: 'Nekázanka Exchange',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/ab44402c-6c92-4cf5-94b0-f340df97b1e0/resources/77001.jpg',
  },
  {
    coordinates: [50.085287, 14.425518],
    id: 'id_31',
    name: 'Papilonia - The Butterfly House',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/ed5edb5d-fe20-41a7-ab18-565ef474e6dd/resources/77002.jpg',
  },
  {
    coordinates: [50.085077, 14.425316],
    id: 'id_32',
    name: 'Černá Růže Shopping Center',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/b52f6e71-809c-4bf7-affe-f43e97e71bd5.jpg',
  },
  {
    coordinates: [50.087059, 14.435094],
    id: 'id_33',
    name: 'Eurochange',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/e1c49b14-0c02-466e-beac-42f8d5f598c6/resources/77006.jpg',
  },
  {
    coordinates: [50.080333, 14.447064],
    id: 'id_34',
    name: 'Švehla Dormitory',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/b42806f7-6c72-4a3d-854b-dfb7a0902d9c/resources/77007.jpg',
  },
  {
    coordinates: [50.091089, 14.423032],
    id: 'id_35',
    name: 'U Obecního dvora Street',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/b32a8618-462f-4dd8-9751-354f1c04c3b4/resources/77008.jpg',
  },
  {
    coordinates: [50.077992, 14.449747],
    id: 'id_36',
    name: 'King George of Poděbrady Square',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/ca2230c3-1297-442f-9e36-4415decc5a68/resources/77009.jpg',
  },
  {
    coordinates: [50.0918217, 14.4189194],
    id: 'id_37',
    name: 'Intercontinental',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/81760022-5ce8-47b2-a2a1-297f386ad790/resources/77010.jpg',
  },
  {
    coordinates: [50.0999576, 14.4299521],
    id: 'id_38',
    name: 'Bio Oko',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/2fd1205b-84ee-47ea-8ae4-1ece9e572f55/resources/77011.jpg',
  },
  {
    coordinates: [50.0857528, 14.4144773],
    id: 'id_39',
    name: 'Colloredo-Mansfeld Palace',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/245c7963-90ce-4b75-8395-f809210de1e1/resources/77012.jpg',
  },
  {
    coordinates: [50.080484, 14.448642],
    id: 'id_40',
    name: 'Škroupovo Square',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/6e6bc1bb-3c7c-4703-94ed-9d0dd52df1cd/resources/77013.jpg',
  },
  {
    coordinates: [50.09292, 14.425693],
    id: 'id_41',
    name: 'Ministry of Industry and Trade',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/f546bf51-c2c3-48ab-bc08-3ef2b9363c21/resources/77014.jpg',
  },
  {
    coordinates: [50.09188, 14.421439],
    id: 'id_42',
    name: 'U Milosrdných Street',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/228239bd-2cbe-4899-8046-7a05b47f9dc6/resources/77015.jpg',
  },
  {
    coordinates: [50.086515, 14.45259],
    id: 'id_43',
    name: 'Prokopovo Square',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/ccbad111-8209-4351-bbe7-b1a4dc678305/resources/77016.jpg',
  },
  {
    coordinates: [50.087239, 14.405819],
    id: 'id_44',
    name: 'Elixir Mystery',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/93828590-ca5d-49e2-ac49-5b2e8decbff5/resources/77017.jpg',
  },
  {
    coordinates: [50.08844, 14.399714],
    id: 'id_45',
    name: 'Creperie by Kajetan',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/resources/images/bba5da74-1e0a-4ee4-8493-85ba2c8c062b.jpg',
  },
  {
    coordinates: [50.091443, 14.423635],
    id: 'id_46',
    name: 'Ve Stínadlech Lane',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/31dd8522-efcd-4639-bf6c-c5c699ec1c77/resources/77019.jpg',
  },
  {
    coordinates: [50.081844, 14.449232],
    id: 'id_47',
    name: 'International Telephone Exchange Building',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/36383451-e18c-4645-88a6-9de21f31d84a/resources/77020.jpg',
  },
  {
    coordinates: [50.092039, 14.4206186],
    id: 'id_48',
    name: 'Church of Saints Simon and Jude',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/980946b4-544d-44e4-b59c-2cb7b1398629/resources/77021.jpg',
  },
  {
    coordinates: [50.086036, 14.454215],
    id: 'id_49',
    name: 'Bethlehem Chapel in Žižkov',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/b606be8e-1272-4181-9767-c4afa79b4d4b/resources/77022.jpg',
  },
  {
    coordinates: [50.085134, 14.454296],
    id: 'id_50',
    name: 'Havlíčkovo Square',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/9ecf6264-441c-4adb-bfa0-e899edae2fdf/resources/77023.jpg',
  },
  {
    coordinates: [50.090773, 14.42252],
    id: 'id_51',
    name: 'Speculum Alchemiae',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/f2fee001-80d1-4a6c-aac6-f9e545901afa/resources/77024.jpg',
  },
  {
    coordinates: [50.092013, 14.425003],
    id: 'id_52',
    name: 'Řásnovka Street',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/752bc048-58c1-4834-a3b2-b00a35ab1327/resources/77026.jpg',
  },
  {
    coordinates: [50.085949, 14.415063],
    id: 'id_53',
    name: 'Good Food Coffee & Bakery',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/23f27e92-730e-449c-bebe-0f015bdc9768/resources/76998.jpg',
  },
  {
    coordinates: [50.078444, 14.421393],
    id: 'id_54',
    name: 'Invisible Exhibition',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/60eafa65-88c3-475c-b6cb-f29ff4b6b144/resources/77027.jpg',
  },
  {
    coordinates: [50.085565, 14.355285],
    id: 'id_55',
    name: 'Vojtěška - Garden Pavilion',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/f5b96763-ad2a-4a61-9a8f-dafd58c21765/resources/76500.jpg',
  },
  {
    coordinates: [50.0850615, 14.3567619],
    id: 'id_56',
    name: 'Břevnov Monastery',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/c906a341-b5ba-4104-b4bb-66ff242a92f3/resources/76502.jpg',
  },
  {
    coordinates: [50.089458, 14.372432],
    id: 'id_57',
    name: 'Na Kocourkách Street',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/15ca21a7-f585-4ab3-bf0a-8ae60a55f6cd/resources/76505.jpg',
  },
  {
    coordinates: [50.08628, 14.363658],
    id: 'id_58',
    name: 'Sartoriova Street',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/79a55df1-3a1c-4d2d-92f0-5302c88b7e74/resources/76508.jpg',
  },
  {
    coordinates: [50.088119, 14.351276],
    id: 'id_59',
    name: 'Windmill',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/db9dda52-6847-4948-bfb0-c3e6056f5fca/resources/76510.jpg',
  },
  {
    coordinates: [50.08658, 14.389855],
    id: 'id_60',
    name: 'Strahov Picture Gallery',
    url: 'https://d37rmf1ynyg9aw.cloudfront.net/filters:format(png)/120x120/data/v4/pois/c75a8dc7-e64a-4dad-a777-4fa7bf82ddaf/resources/76511.jpg',
  },
];

const SIZE_L = 14;

const pinLargeStyle: StyleProp<SymbolLayerStyle> = {
  textField: ['get', 'title'],
  textSize: SIZE_L,
  textColor: 'black',
  textHaloColor: 'white',
  iconImage: ['get', 'image'],
  iconSize: 1 / 2,
  textHaloWidth: 2,
  textHaloBlur: 0,
  textAnchor: 'top',
  iconAnchor: 'bottom',
  textMaxWidth: 10,
  iconAllowOverlap: false,
  textAllowOverlap: false,
  iconOptional: false,
  symbolSortKey: ['get', 'priority'],
};

interface Marker {
  id: string;
  url: string;
  coordinates: [number, number];
  name: string;
}

const styles = StyleSheet.create({
  container: {flex: 1, overflow: 'hidden'},
});

function MarkersImages() {
  const defaultSettings = useMemo(() => {
    return {
      followUserLocation: false,
      zoomLevel: 9,
      centerCoordinate: [14.420250430408032, 50.08624686600919],
    };
  }, []);

  const onFeaturePress = useCallback((e: OnPressEvent) => {
    const [feature] = e.features;
    console.log('onPress:', feature.id);
  }, []);

  const featuresCollection = useMemo<GeoJSON.FeatureCollection>(() => {
    const features: GeoJSON.FeatureCollection['features'] = data.map((m, i) => {
      return {
        type: 'Feature',
        id: m.id,
        properties: {
          title: m.name,
          image: m.id,
          priority: i,
        },
        geometry: {
          type: 'Point',
          coordinates: [m.coordinates[1], m.coordinates[0]],
        },
      };
    });

    return {
      type: 'FeatureCollection',
      features,
    };
  }, []);

  const images = useMemo<SymbolLayerStyle['images']>(() => {
    const result: {[key: string]: MapboxGL.ImageEntry} = {};

    data.forEach(m => {
      result[m.id] = {
        uri: m.url,
        width: 120,
        height: 120,
      };
    });

    return result;
  }, []);

  return (
    <MapboxGL.MapView style={styles.container} compassEnabled={true}>
      <>
        <MapboxGL.Camera
          maxZoomLevel={18}
          defaultSettings={defaultSettings}
          followUserMode={UserTrackingMode.Follow}
        />
        <>
          <MapboxGL.Images images={images} />
          <MapboxGL.ShapeSource
            id={'ShapeSource_1'}
            shape={featuresCollection}
            onPress={onFeaturePress}
            hitbox={useMemo(() => ({width: 10, height: 10}), [])}>
            <MapboxGL.SymbolLayer id={'SymbolLayer_1'} style={pinLargeStyle} />
          </MapboxGL.ShapeSource>
        </>
      </>
    </MapboxGL.MapView>
  );
}
export default MarkersImages;

const metadata: ExampleWithMetadata['metadata'] = {
  title: 'MarkersImages',
  tags: ['MarkerView'],
  docs: `
Test view for MarkerViews images
`,
};

MarkersImages.metadata = metadata;