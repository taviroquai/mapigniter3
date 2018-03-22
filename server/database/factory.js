'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (fake) => {
    return {
        username: fake.username(),
        email: fake.email(),
        password: fake.password(),
        active: true
    }
})

Factory.blueprint('App/Models/LayerType', async (fake) => {
    return {
        label: fake.sentence(),
        key: fake.bool()
    }
})
