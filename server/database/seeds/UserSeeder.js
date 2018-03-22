'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')
const User = use('App/Models/User')

class UserSeeder {
    async run () {
        //await Database.truncate('users')
        await User.create({
            email: 'admin@isp.com',
            username: 'admin',
            password: 'admin',
            active: true
        });
    }
}

module.exports = UserSeeder
