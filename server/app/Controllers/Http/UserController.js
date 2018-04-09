'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {

    async login ({ request, auth, response }) {
        try {
          const secret = request.all()
          console.log('secret', secret)
          const email = secret.email
          const user = await User.query().where('email', email).first()
          if (!user) throw new Error('Invalid email')
          if (!user.active) throw new Error('Account is disabled.')
          const token = await auth
            .withRefreshToken()
            .attempt(secret.email, secret.password)
          /*
          const pwdCheck = await Hash.verify(secret.password, user.password)
          if (!pwdCheck) throw new Error('Invalid password')
          const token = auth.generate(user)
          */
          response.send({success: true, profile: user, jwt: token})
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    };

    async show ({ auth, params, response }) {
        try {
          var user = await auth.getUser()
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
