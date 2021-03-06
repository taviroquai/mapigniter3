'use strict'

const uuidV4 = require('uuid/v4')
const mime = require('mime-types')
const mmm = require('mmmagic')

class Utils {

    /**
     * Get file extention
     * @param  {String}  filename The filename
     * @return {Promise}
     */
    static async getFileExtension(filename) {
        const Magic = mmm.Magic
        const magic = new Magic(mmm.MAGIC_MIME_TYPE);
        return new Promise(resolver => {
            magic.detectFile(filename, (err, result) => {
                if (err) return resolver(false)
                resolver(mime.extension(result))
            })
        })
    }

    /**
     * Process file upload
     * @param  {Object}  request the HTTP request
     * @param  {Array}   types   Valid upload file types
     * @param  {String}  target  Target folder to move the file into
     * @return {Promise}
     */
    static async processFileUpload(request, types, target) {
        const file = request.file('file', { types, size: '4mb' })
        if (!file) return false
        const ext = await this.getFileExtension(file.tmpPath)
        if (!ext) return false
        const filename = uuidV4()+'.'+ext
        await file.move(target, { name: filename })
        if (!file.moved()) return false
        return filename
    }
}

module.exports = Utils
