'use strict'

class UserControllerDefault {

    async login ({ request, auth }) {
        const { email, password } = request.all()
        await auth.attempt(email, password)
    };

    show ({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
          return 'You cannot see someone else\'s profile'
        }
        return auth.user
    }
}

module.exports = UserController
