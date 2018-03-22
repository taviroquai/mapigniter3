'use strict'

const Database = use('Database')
const Model = use('Model')
const { validate } = use('Validator')
const uuidV4 = require('uuid/v4')
const Helpers = use('Helpers')
const Env = use('Env')
const moment = require('moment')

class Map extends Model {
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

    hasUpload(request) {
        const file = request.file('upload', {
            types: ['image'],
            size: '4mb'
        })
        return file
    }

    async upload(file, ext) {
        const itemPublicPath = this.getStoragePath()
        const filename = uuidV4()+'.'+ext
        await file.move(itemPublicPath, { name: filename })
        return file.moved() ? filename : false
    }

    async processUpload(request, post) {
        const file = this.hasUpload(request)
        if (file) {
            const filename = await this.upload(file, post.upload_type)
            if (!filename) return false
            this[post.upload_field] = filename
            await this.save()
            return filename
        } else return true
    }
}

module.exports = Map
