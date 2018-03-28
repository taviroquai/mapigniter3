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
const graphqlSchema = require('../api/Schema');
const Route = use('Route')

Route.on('/').render('welcome')

Route.post('/api', graphqlAdonis({ formatError, schema: graphqlSchema }));
Route.get('/api', graphqlAdonis({ formatError, schema: graphqlSchema }));

Route.get('/graphiql',
    graphiqlAdonis({
        formatError,
        schema: graphqlSchema,
        endpointURL: '/api'
    })
);

Route.get('login', 'UserController.login').middleware('auth');
Route.get('user', 'UserController.show');
Route.post('user', 'UserController.store');
Route.get('logout', 'UserController.logout');
Route.post('recover', 'UserController.recover');
Route.post('reset', 'UserController.resetPassword');

Route.post('request', 'HttpRequestController.store');
Route.get('dashboard', 'DashboardController.index');

Route.get('maplayer/:map_id/:id', 'MapLayerController.item');
Route.get('maplayer/:map_id', 'MapLayerController.index');
Route.post('maplayer', 'MapLayerController.store');
Route.delete('maplayer/:id', 'MapLayerController.remove');

Route.get('public/map', 'MapController.publishedIndex');
Route.get('map/:id', 'MapController.item');
Route.get('map', 'MapController.index');
Route.post('map', 'MapController.store');
Route.post('map/:id/image', 'MapController.storeImage');
Route.delete('map/:id', 'MapController.remove');

Route.get('layertype/:id', 'LayerTypeController.item');
Route.get('layertype', 'LayerTypeController.index');
Route.post('layertype', 'LayerTypeController.store');
Route.delete('layertype/:id', 'LayerTypeController.remove');

Route.get('projection/:id', 'ProjectionController.item');
Route.get('projection', 'ProjectionController.index');
Route.post('projection', 'ProjectionController.store');
Route.delete('projection/:id', 'ProjectionController.remove');

Route.get('layer/:id', 'LayerController.item');
Route.get('layer', 'LayerController.index');
Route.post('layer', 'LayerController.store');
Route.post('layer/:id/image', 'LayerController.storeImage');
Route.post('layer/:id/file', 'LayerController.storeFile');
Route.delete('layer/:id', 'LayerController.remove');
Route.get('layer/resource/:id/:name', 'LayerController.getResource');
Route.post('layer/postgis/connect', 'LayerController.postgisConnect');
Route.get('layer/postgis/:id/geojson', 'LayerController.postgisGeoJSON');
Route.post('layer/wms/getcapabilities', 'LayerController.getWMSCapabilities');
Route.post('layer/wfs/getcapabilities', 'LayerController.getWFSCapabilities');
