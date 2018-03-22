'use strict'

const Hash = use('Hash')

const UserHook = module.exports = {}

/**
* Hash using password as a hook.
*
* @method
*
* @param  {Object} userInstance
*
* @return {void}
*/
UserHook.hashPassword = async (userInstance) => {
    console.log('user password', userInstance.password)
    if (userInstance.password) {
        userInstance.password = await Hash.make(userInstance.password)
    }
}
