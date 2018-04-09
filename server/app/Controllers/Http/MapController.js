'use strict'

const Map = use('App/Models/Map')

class MapController {

    /**
     * Store map image
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async storeFile ({request, params, response}) {
        try {

            // Get map
            const item = await Map.find(params.id)
            const post = request.post()
            const field = params.field
            var types
            switch(field) {
                case 'image': types = ['image']; break;
                default: types = ['application'];
            }

            // Process upload
            item[field] = await item.processFileUpload(request, types)
            if (!item[field]) throw new Error('Could not upload file')
            await item.save()

            // Send response
            response.send({success: true, filename: item[field] });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }
}

module.exports = MapController
