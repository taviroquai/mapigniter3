'use strict'

const Map = use('App/Models/Map')

class MapController {

    /**
     * Map index
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async index ({request, response}) {
        try {
            const items = await Map.all()
            response.send({success: true, items });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Published map index
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async publishedIndex ({request, response, session}) {
        try {
            const items = await Map.query().where('publish', true).get()
            response.send({success: true, items });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Map item
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  params   The URI params
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async item ({request, params, response}) {
        try {
            const item = await Map.find(params.id)
            await item.load(['layers.layer.projection'])
            await item.load(['projection'])
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Map store
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
            const errors = await Map.validate(post)
            if (errors) return response.send({
                success: false,
                error: 'Invalid item',
                errors
            })

            // Fields to save
            const data = {}
            const fields = [
                'title',
                'seo_slug',
                'projection_id',
                'coordx',
                'coordy',
                'publish',
                'image',
                'description',
                'zoom'
            ].forEach(f => data[f] = post[f])

            // Save
            var item = await Map.find(post.id || 0)
            if (item) item.merge(data)
            else item = await Map.create(data)
            await item.save()
            await item.load(['layers.layer'])

            // Send response
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Store map image
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async storeImage ({request, params, response}) {
        try {

            // Get map
            const item = await Map.find(params.id)
            const post = request.post()

            // Process upload
            item.image = await item.processImageUpload(request, 'image', ['image'])
            if (!item.image) throw new Error('Could not upload image')
            await item.save()

            // Send response
            response.send({success: true, image: item.image });
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
            const item = await Map.find(params.id)
            await item.delete()
            response.send({success: true});
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    }
}

module.exports = MapController
