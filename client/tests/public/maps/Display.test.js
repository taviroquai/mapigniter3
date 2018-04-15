import React from 'react';
//import ReactDOM from 'react-dom';
import Display from '../../../src/public/maps/components/Display';
import '../../../src/i18nTest';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders public map without crashing', () => {
  const current = {
      "id":"1",
      "title":"map1",
      "seo_slug":"map1",
      "description":"<p>map1</p>",
      "image":"adf28868-633d-4a01-a2fd-5c07d69de912.png",
      "coordx":0,
      "coordy":0,
      "zoom":0,
      "projection":{
          "srid":3857,
          "__typename":"Projection"
      },
      "layers":[
          {
              "id":"1",
              "parent_id":null,
              "map_id":1,
              "layer_id":1,
              "visible":true,
              "display_order":1,
              "baselayer":true,
              "layer":{
                  "id":"1",
                  "title":"osm",
                  "description":"<p>teste</p>",
                  "type":"OSM",
                  "seo_slug":"osm",
                  "publish":true,
                  "image":"d9cbe38e-deb7-4960-a3aa-96303adc56df.png",
                  "feature_info_template":"",
                  "search":"",
                  "min_resolution":"",
                  "max_resolution":"",
                  "bing_key":"",
                  "bing_imageryset":"",
                  "mapquest_layer":"sat",
                  "gpx_filename":"",
                  "kml_filename":"",
                  "geopackage_filename":"",
                  "geopackage_table":"",
                  "geopackage_fields":"",
                  "geojson_geomtype":"Point",
                  "geojson_attributes":"",
                  "geojson_features":"",
                  "postgis_host":"localhost",
                  "postgis_port":"5432",
                  "postgis_user":"",
                  "postgis_dbname":"",
                  "postgis_schema":"public",
                  "postgis_table":"",
                  "postgis_field":"",
                  "postgis_attributes":"",
                  "wms_url":"",
                  "wms_version":"1.3.0",
                  "wms_servertype":"geoserver",
                  "wms_tiled":"true",
                  "wms_layers":"",
                  "wfs_url":"",
                  "wfs_version":"1.0.0",
                  "wfs_typename":"",
                  "projection":{
                      "id":"1",
                      "srid":3857,
                      "__typename":"Projection"
                  },
                  "__typename":"Layer"
              },
              "__typename":"MapLayer"
          }
      ],
      "__typename":"Map"
  };
  const wrapper = mount(
      <Display current={current} />
  );
  wrapper.unmount();
});
