'use strict'

const Map = use('App/Models/Map')
const Layer = use('App/Models/Layer')
const MapLayer = use('App/Models/MapLayer')

class MapLayerController {

    /**
     * Layer index
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async index ({request, params, response}) {
        try {
            const items = await MapLayer.query()
                .with('layer', )
                .where('map_id', params.map_id)
                .fetch()
            response.send({success: true, items });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Layer item
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  params   The URI params
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async item ({request, params, response}) {
        try {
            const item = await MapLayer.find(params.id)
            await item.load('layer')
            await item.load('map')
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Layer store
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async store ({request, response}) {
        try {

            // Get input
            const post = request.post()

            // Validate input
            const errors = await MapLayer.validate(post)
            if (errors) return response.send({
                success: false,
                error: 'Invalid item',
                errors
            })

            // Fields to save
            var data = {
                parent_id: post.parent_id || null,
                map_id: post.map_id,
                layer_id: post.layer_id,
                visible: post.visible,
                display_order: post.display_order,
                baselayer: post.baselayer
            }

            // Save
            var item = await MapLayer.find(post.id)
            if (item) item.merge(data)
            else item = await MapLayer.create(data)
            await item.save()

            // Send response
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Remove item
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  params   The URI params
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async remove ({request, params, response}) {
        try {
            const item = await MapLayer.find(params.id)
            await MapLayer.query()
                .where('parent_id', item.layer_id)
                .delete()
            await item.delete()
            response.send({success: true});
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    }
}

module.exports = MapLayerController
