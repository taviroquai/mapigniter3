'use strict'

const Hash = use('Hash')
const Encryption = use('Encryption')

const LayerHook = module.exports = {}

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} layerInstance
 *
 * @return {void}
 */
LayerHook.encryptPostgisPass = async (layerInstance) => {
    if (layerInstance.postgis_pass) {
        var pass = await Encryption.encrypt(layerInstance.postgis_pass)
        layerInstance.postgis_pass = pass
    }
}
