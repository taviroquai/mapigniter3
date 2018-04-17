import React from 'react';
//import ReactDOM from 'react-dom';
import LayerSwitcher from '../../../src/public/components/LayerSwitcher';
import '../../../src/i18nTest';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders layerswitcher without crashing', () => {
  const map = {
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
      <LayerSwitcher map={map}
          activeItems={["1"]}
      />
  );
  wrapper.unmount();
});
