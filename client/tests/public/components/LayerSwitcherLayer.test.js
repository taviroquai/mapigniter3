import React from 'react';
//import ReactDOM from 'react-dom';
import LayerSwitcherLayer from '../../../src/public/components/LayerSwitcherLayer';
import '../../../src/i18nTest';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders layerswitcher layer without crashing', () => {
  const layer = {
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
  };
  const wrapper = mount(
      <LayerSwitcherLayer layer={layer}
          activeItems={["1"]}
          expandedItems={["1"]}
          getLayersWithExtent={() => ['KML']}
      />
  );
  wrapper.unmount();
});
