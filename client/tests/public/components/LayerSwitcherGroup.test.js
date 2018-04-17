import React from 'react';
//import ReactDOM from 'react-dom';
import LayerSwitcherGroup from '../../../src/public/components/LayerSwitcherGroup';
import '../../../src/i18nTest';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders layerswitcher group without crashing', () => {
  const group = {
      "id":"1",
      "parent_id":null,
      "map_id":1,
      "layer_id":1,
      "visible":true,
      "display_order":1,
      "baselayer":true,
      "layer": {
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
      "layers":[{
          "id":"2",
          "parent_id":null,
          "map_id":1,
          "layer_id":1,
          "visible":true,
          "display_order":1,
          "baselayer":true,
          "layer":{
              "id":"2",
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
      }],
      "__typename":"MapLayer"
  };
  const wrapper = mount(
      <LayerSwitcherGroup group={group}
          activeItems={["1", "2"]}
          expandedItems={["1", "2"]}
          getLayersWithExtent={() => ['KML']}
      />
  );
  wrapper.unmount();
});
