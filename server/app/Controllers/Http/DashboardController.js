'use strict'

const Map = use('App/Models/Map')

class DashboardController {

    async index ({ request, response }) {
        try {
            const data1 = await Map.getDashboardActivity()
            response.send({success: true, data1})
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    };
}

module.exports = DashboardController
