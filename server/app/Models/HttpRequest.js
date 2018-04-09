'use strict'

const { validate } = use('Validator')
const Model = use('Model')

class HttpRequest extends Model {

    /**
     * Validate HTTP request data
     * @param  {Object}  data The record input
     * @return {Promise}
     */
    static async validate(data) {
        const rules = {
            map_id: 'required',
            http_url: 'required',
            http_method: 'required',
            http_path: 'required',
            ip: 'required'
        }
        const validation = await validate(data, rules)
        return validation.fails() ? validation.messages() : false
    }
}

module.exports = HttpRequest
