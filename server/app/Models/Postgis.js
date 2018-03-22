'use strict'

class Postgis {

    /**
     * Init postgis with connection params
     * @param  {Object} params The connection params
     * @return {Postgis}
     */
    constructor(params) {
        this.params = params
        this.conn = null;
    }

    /**
     * Run raw SQL
     * @param  {String} sql    The SQL string
     * @param  {Array}  params The SQL params
     * @return {Function}
     */
    raw(sql, params) {
        return this.conn.raw(sql, params)
    }

    /**
     * Connect to database
     * @return {Promise}
     */
    async connect() {
        return new Promise( async (resolver) => {
            this.conn = require('knex')(this.params);
            resolver(this.conn);
        });
    }

    /**
     * Get the postgis options for layer
     * @return {Promise}
     */
    async getLayerOptions() {
        var result = {}
        return new Promise( async (resolver) => {
            var columns = await this.getGeomColumns();
            if (!columns) resolver(false);
            if (!columns.length) resolver(result);
            var count = 0
            columns.map(async (item) => {
                if (!result[item.f_table_schema]) result[item.f_table_schema] = {}
                if (!result[item.f_table_schema][item.f_table_name]) {
                    result[item.f_table_schema][item.f_table_name] = await this.getColumnsFromTable(
                        item.f_table_schema,
                        item.f_table_name
                    )
                }
                count++
                if (count === columns.length) resolver(result);
            });
        });
    }

    /**
     * Get the geometry columns
     * @return {Promise}
     */
    async getGeomColumns() {
        if (!this.conn) return [];
        return new Promise(resolver => {
            const sql = 'SELECT * FROM geometry_columns'
            this.conn.raw(sql).then(function(resp) {
                resolver(resp.rows);
            })
            .catch(function() {
                resolver(false);
            });
        });
    }

    /**
     * Get the table columns
     * @param  {String}   schema_name The schema name
     * @param  {String}   table_name  The table name
     * @return {Promise}
     */
    async getColumnsFromTable(schema_name, table_name) {
        if (!this.conn) return [];
        return new Promise(resolver => {
            const sql = `
                SELECT column_name as name
                FROM information_schema.columns
                WHERE table_schema = ? AND table_name = ?
            `
            this.conn.raw(sql, [schema_name, table_name]).then(function(resp) {
                resolver(resp.rows);
            })
            .catch(function() {
                resolver(false);
            });
        });
    }
}

module.exports = Postgis
