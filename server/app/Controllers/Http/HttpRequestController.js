'use strict'

const HttpRequest = use('App/Models/HttpRequest')

class HttpRequestController {

    /**
     * HttpRequest index
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async index ({request, response}) {
        try {
            const items = await HttpRequest.all()
            response.send({success: true, items });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * HttpRequest item
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  params   The URI params
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async item ({request, params, response}) {
        try {
            const item = await HttpRequest.find(params.id)
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * HttpRequest store
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async store ({request, response, session}) {
        try {

            // Get input
            var post = request.post()
            post.ip = request.ip()

            // Get user
            const logged = session.get('logged')
            post.user_id = logged

            // Validate input
            const errors = await HttpRequest.validate(post)
            if (errors) return response.send({
                success: false,
                error: 'Invalid item',
                errors
            })

            // Fields to save
            var data = {
                map_id: post.map_id,
                http_url: post.http_url,
                http_method: post.http_method,
                http_path: post.http_path,
                ip: post.ip
            }

            // Save
            var item = await HttpRequest.find(post.id || null)
            if (item) item.merge(data)
            else item = await HttpRequest.create(data)
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
            const item = await HttpRequest.find(params.id)
            await item.delete()
            response.send({success: true});
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    }
}

module.exports = HttpRequestController
