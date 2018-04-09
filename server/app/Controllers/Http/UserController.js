'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {

    /**
     * Login user from post values
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  auth     Auth middleware
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async login ({ request, auth, response }) {
        try {
          const secret = request.all()
          const email = secret.email
          const user = await User.query().where('email', email).first()
          if (!user) throw new Error('Invalid email')
          if (!user.active) throw new Error('Account is disabled.')
          const token = await auth
            .withRefreshToken()
            .attempt(secret.email, secret.password)
          response.send({success: true, profile: user, jwt: token})
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    };

    /**
     * Get user profile
     * @param  {Object}  auth     The auth middleware
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async show ({ auth, response }) {
        try {
          var user = await auth.getUser()
          response.send({success: true, user: user});
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    }

    /**
     * Store user data
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
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
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async recover ({ request, response }) {
        try {
            const email = request.input('email')
            const url = request.input('url')

            // Validate user account
            const ids = await User.query().where('email', email).pluck('id')
            if (!ids.length) throw new Error('Account not found.')
            const user = await User.find(ids[0])
            if (!user.active) throw new Error('Account is disabled.')

            // Send recover email
            const result = user.sendRecoverPasswordEmail(url)
            response.send({success: true})
        } catch (error) {
          response.send({success: false, error: error.message})
        }
    };

    /**
     * Reset user password
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
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

             // Reset user password
             user.password = post.password
             await user.save()
             response.send({success: true});
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }
}

module.exports = UserController
