'use strict'

const { validate } = use('Validator')
const Model = use('Model')

class HttpRequest extends Model {

    /**
     * Validate input
     * @param  {Object}  input The record input
     * @return {Promise}
     */
    static async validate(input) {
        const rules = {
            map_id: 'required',
            http_url: 'required',
            http_method: 'required',
            http_path: 'required',
            ip: 'required'
        }
        const validation = await validate(input, rules)
        return validation.fails() ? validation.messages() : false
    }
}

module.exports = HttpRequest
