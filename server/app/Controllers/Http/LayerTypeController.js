'use strict'

const LayerType = use('App/Models/LayerType')

class LayerTypeController {

    /**
     * LayerType index
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async index ({request, response, session}) {
        try {
            const items = await LayerType.all()
            response.send({success: true, items });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * LayerType item
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  params   The URI params
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async item ({request, params, response}) {
        try {
            const item = await LayerType.find(params.id)
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * LayerType store
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
            const errors = await LayerType.validate(post)
            if (errors) return response.send({
                success: false,
                error: 'Invalid item',
                errors
            })

            // Fields to save
            var data = {
                label: post.label,
                key: post.key,
                display_order: post.display_order
            }

            // Save
            var item = await LayerType.find(post.id)
            if (item) item.merge(data)
            else item = await LayerType.create(data)
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
            const item = await LayerType.find(params.id)
            await item.delete()
            response.send({success: true});
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    }
}

module.exports = LayerTypeController
