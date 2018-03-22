'use strict'

const Schema = use('Schema')

class LayersSchema extends Schema {
    up () {
        this.create('layers', (table) => {
            table.increments()
            table.timestamps()
            table.string('title');
            table.string('seo_slug');
            table.string('type');
            table.string('bing_key').nullable();
            table.string('bing_imageryset').nullable();
            table.string('mapquest_layer').nullable();
            table.string('wms_servertype').nullable();
            table.string('wms_url').nullable();
            table.string('wms_layers').nullable();
            table.boolean('wms_tiled').nullable();
            table.string('wms_version').nullable();
            table.string('wfs_url').nullable();
            table.string('wfs_typename').nullable();
            table.string('feature_info_template').nullable();
            table.string('wfs_version').nullable();
            table.string('gpx_filename').nullable();
            table.string('kml_filename').nullable();
            table.string('postgis_host').nullable();
            table.string('postgis_port').nullable();
            table.string('postgis_user').nullable();
            table.string('postgis_pass').nullable();
            table.string('postgis_dbname').nullable();
            table.string('postgis_schema').nullable();
            table.string('postgis_table').nullable();
            table.string('postgis_field').nullable();
            table.string('postgis_attributes').nullable();
            table.string('geojson_geomtype').nullable();
            table.string('geojson_attributes').nullable();
            table.text('geojson_features').nullable();
            table.string('geopackage_filename').nullable();
            table.string('geopackage_table').nullable();
            table.string('geopackage_fields').nullable();
            table.string('ol_style_static_icon').nullable();
            table.string('ol_style_static_fill_color').nullable();
            table.string('ol_style_static_stroke_color').nullable();
            table.string('ol_style_static_stroke_width').nullable();
            table.string('ol_style_field_icon').nullable();
            table.string('ol_style_field_fill_color').nullable();
            table.string('ol_style_field_stroke_color').nullable();
            table.string('ol_style_field_stroke_width').nullable();
            table.string('search').nullable();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('users.id').onDelete('cascade');
            table.integer('projection_id').unsigned()
            table.foreign('projection_id').references('projections.id').onDelete('cascade')
        })
    }

    down () {
        this.drop('layers')
    }
}

module.exports = LayersSchema
