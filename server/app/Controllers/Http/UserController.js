'use strict'

const User = use('App/Models/User')

class UserController {

    async login ({ request, auth, response, session }) {
        try {
          await auth.check()
          var profile = await auth.getUser()
          if (!profile.active) throw new Error('Account is disabled.')
          session.put('logged', profile.id)
          response.send({success: true, profile: profile})
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    };

    async show ({ params, response, session }) {
        try {
          var user = await User.find(session.get('logged'))
          response.send({success: true, user: user});
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    }

    async logout ({ request, response, session }) {
        try {
          session.clear()
          response.send({success: true})
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    };

    /**
     * User store
     * @param  {Object}  request  [description]
     * @param  {Object}  response [description]
     * @return {Promise}          [description]
     */
    async store ({request, response}) {
        try {
            const post = request.post()
            const errors = await User.validate(post)
            if (errors) return response.send({
                success: false,
                error: 'Please check errors', errors: errors
            })
            const item = await User.saveFromPost(post)
            response.send({success: true, user: item});
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Start recover password
     * @param  {[type]}  request  [description]
     * @param  {[type]}  response [description]
     * @return {Promise}          [description]
     */
    async recover ({ request, response }) {
        try {
            const email = request.input('email')
            const url = request.input('url')
            const ids = await User.query().where('email', email).pluck('id')
            if (!ids.length) throw new Error('Account not found.')
            const user = await User.find(ids[0])
            if (!user.active) throw new Error('Account is disabled.')
            const result = user.sendRecoverPasswordEmail(url)
            response.send({success: true})
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    };

    /**
     * User reset password store
     * @param  {Object}  request  [description]
     * @param  {Object}  response [description]
     * @return {Promise}          [description]
     */
     async resetPassword ({request, response}) {
         try {
             const post = request.post()

             // Validate token
             const user = await User.query().where('recover_token', post.token).first()
             if (!user) throw new Error('Recover not found.')

             // Validate password
             const errors = await user.validateChangePassword(post)
             if (errors) return response.send({success: false, errors})

             // Reset
             user.password = post.password
             await user.save()
             response.send({success: true});
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }
}

module.exports = UserController
