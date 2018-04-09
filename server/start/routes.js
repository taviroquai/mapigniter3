'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/
const { graphqlAdonis, graphiqlAdonis  } = require('apollo-server-adonis');
const { formatError } = require('apollo-errors');
const graphqlPublicSchema = require('../api/PublicSchema');
const graphqlAdminSchema = require('../api/AdminSchema');
const Route = use('Route')

Route.on('/').render('welcome')

Route.post('/api', graphqlAdonis({ formatError, schema: graphqlPublicSchema }));
Route.get('/api', graphqlAdonis({ formatError, schema: graphqlPublicSchema }));

Route.post('/api/admin', graphqlAdonis({ formatError, schema: graphqlAdminSchema })).middleware('auth');
Route.get('/api/admin', graphqlAdonis({ formatError, schema: graphqlAdminSchema })).middleware('auth');

Route.get('/graphiql',
    graphiqlAdonis({
        formatError,
        schema: graphqlPublicSchema,
        endpointURL: '/api'
    })
);

Route.post('login', 'UserController.login');
Route.get('user', 'UserController.show').middleware('auth');
Route.post('user', 'UserController.store').middleware('auth');
Route.get('logout', 'UserController.logout');
Route.post('recover', 'UserController.recover');
Route.post('reset', 'UserController.resetPassword');

Route.post('request', 'HttpRequestController.store');

Route.post('map/:id/upload/:field', 'MapController.storeFile').middleware('auth');
Route.post('layer/:id/upload/:field', 'LayerController.storeFile').middleware('auth');
Route.get('layer/resource/:id/:name', 'LayerController.getResource');
Route.post('layer/postgis/connect', 'LayerController.postgisConnect').middleware('auth');
Route.get('layer/postgis/:id/geojson', 'LayerController.postgisGeoJSON');
Route.post('layer/wms/getcapabilities', 'LayerController.getWMSCapabilities').middleware('auth');
Route.post('layer/wfs/getcapabilities', 'LayerController.getWFSCapabilities').middleware('auth');
