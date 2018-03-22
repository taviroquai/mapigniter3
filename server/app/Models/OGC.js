'use strict'

const request = require('request')

class OGC {

    /**
     * Init postgis with connection params
     * @param  {Object} params The connection params
     * @return {Postgis}
     */
    constructor(url) {
        this.url = url
        this.capabilities = '';
    }

    /**
     * Connect to WMS service
     * @return {Promise}
     */
    async getWMSCapabilities(version) {
        if (this.capabilities) return this.capabilities;
        return new Promise( async (resolver) => {
            var url = this.url + '?'
                + [
                    'service=WMS',
                    'version='+version,
                    'request=getCapabilities'
                ].join('&')
            request(url, function (error, response, body) {
                if (error) return resolver(false)
                this.capabilities = body
                resolver(this.capabilities)
            });
        });
    }

    /**
     * Connect to WFS service
     * @return {Promise}
     */
    async getWFSCapabilities(version) {
        if (this.capabilities) return this.capabilities;
        return new Promise( async (resolver) => {
            var url = this.url + '?'
                + [
                    'service=WFS',
                    'version='+version,
                    'request=getCapabilities'
                ].join('&')
            request(url, function (error, response, body) {
                if (error) return resolver(false)
                this.capabilities = body
                resolver(this.capabilities)
            });
        });
    }
}

module.exports = OGC
