'use strict'

const Database = use('Database')
const Model = use('Model')
const { validate } = use('Validator')
const uuidV4 = require('uuid/v4')
const Helpers = use('Helpers')
const Env = use('Env')
const moment = require('moment')
const Utils = require('./Utils')

class Map extends Model {

    static fillable() {
        return [
            'title',
            'seo_slug',
            'projection_id',
            'coordx',
            'coordy',
            'publish',
            'description',
            'zoom',
            'image'
        ]
    }

    static filterInput(input) {
        const data = {}
        const fields = Map.fillable().forEach(f => {
            if (Object.keys(input).indexOf(f) > -1) data[f] = input[f]
        })
        return data
    }

    projection () {
        return this.belongsTo('App/Models/Projection')
    }

    layers () {
        return this.hasMany('App/Models/MapLayer')
    }

    static async getDashboardActivity() {
        const sql = `
            SELECT
                (to_char(d, 'Mon') || ' ' || to_char(d, 'YY')) AS name,
                (SELECT count(id)
                FROM http_requests
                WHERE extract('month' from created_at) = EXTRACT('month' FROM d)
                    and extract('year' from created_at) = EXTRACT('year' FROM d)
                ) as value,
                to_char(d, 'MON') as month,
                to_char(d, 'YYYY') as year
            FROM
            GENERATE_SERIES(
                now(),
                now() - interval '12 months',
                interval '-1 month'
            ) AS d
            ORDER BY extract('year' from d), extract('month' from d)
        `
        const result = await Database.raw(sql);
        return result.rows;
    }

    /**
     * Validate input
     * @param  {Object}  input The record input
     * @return {Promise}
     */
    static async validate(input) {
        const rules = {
            title: 'required',
            seo_slug: 'required',
            projection_id: 'required'
        }
        const validation = await validate(input, rules)
        return validation.fails() ? validation.messages() : false
    }

    getStoragePath() {
        return Helpers.publicPath(Env.get('PUBLIC_STORAGE')+'/map/'+this.id);
    }

    async processImageUpload(request, field, types) {
        const target = this.getStoragePath()
        return await Utils.processFileUpload(request, field, types, target)
    }
}

module.exports = Map
