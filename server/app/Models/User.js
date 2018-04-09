'use strict'

const Model = use('Model')
const { validate } = use('Validator')
const pick = require('lodash.pick')
const Hash = use('Hash')
const Mail = use('Mail')
const Env = use('Env')
const uuidV4 = require('uuid/v4')

class User extends Model {
    static boot () {
        super.boot()

        /**
        * A hook to bash the user password before saving
        * it to the database.
        *
        * Look at `app/Models/Hooks/User.js` file to
        * check the hashPassword method
        */
        this.addHook('beforeSave', 'User.hashPassword')
    }

    /**
     * Get the fillable attributes
     * @return {Array} The list of fillable attributes
     */
    static fillable() {
        return [
            'username',
            'email',
            'active',
            'password'
        ]
    }

    /**
    * A relationship on tokens is required for auth to
    * work. Since features like `refreshTokens` or
    * `rememberToken` will be saved inside the
    * tokens table.
    *
    * @method tokens
    *
    * @return {Object}
    */
    tokens () {
        return this.hasMany('App/Models/Token')
    }

    /**
    * Hide fields when exporting users
    * @type {[type]}
    */
    static get hidden () {
        return ['password', 'recover_token']
    }

    /**
    * Validate input
    * @param  {Object}  input The record input
    * @return {Promise}
    */
    static async validate(input) {
        const rules = {
            email: 'required|email|unique:users,email'+(input.id?',id,'+input.id:''),
            username: 'required',
            active: 'required'
        }
        if (input.password) rules['password'] = 'required|min:6|confirmed';
        const validation = await validate(input, rules)
        if (validation.fails()) {
            var errors = {}
            validation.messages().map(i => {
                errors[i.field] ? errors[i.field] : errors[i.field] = [];
                errors[i.field].push(i)
            })
            return errors
        }
        return false
    }

    /**
     * Save from post
     * @param  {Object}  post The post data
     * @return {Promise}      [description]
     */
    static async saveFromPost(post) {
        var data = pick(post, User.fillable())
        var item = await User.find(post.id)
        if (item) {
            item.merge(data)
            await item.save()
        } else {
            item = await User.create(data)
        }
        return item
    }

    /**
     * Send recover password email
     * @param  {String}  url The client base URL
     * @return {Promise}
     */
    async sendRecoverPasswordEmail(url) {
        this.recover_token = uuidV4();
        this.save();
        const link = url + '/#/reset/'+this.recover_token
        const result = await Mail.send('emails.recover', { link }, (message) => {
            message.from(Env.get('MAIL_USERNAME'))
            message.to(email)
        })
        return result
    }

    /**
     * Validate change password
     * @param  {object}  post The user input
     * @return {Promise}
     */
    async validateChangePassword(post) {
        const rules = {
            'password': 'required|min:6|confirmed'
        }
        const validation = await validate(post, rules)
        if (validation.fails()) {
            var errors = {}
            validation.messages().map(i => {
                errors[i.field] ? errors[i.field] : errors[i.field] = [];
                errors[i.field].push(i)
            })
            return errors
        }
        return false
    }
}

module.exports = User
