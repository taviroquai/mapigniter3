# MapIgniter3

MapIgniter3 is the newest version of the previous MapIgniter versions  
MapIgniter is a web mapping application that allows to publish Geographic Information from various sources (OGC web
services and files)

## Client

The web client was built with:
 1. CreateReactApp (CRA) - React application
 2. Apollo Client - Graphql HTTP client
 3. SemanticUI - Full featured and customizable UI framework

### Client File Struture

The file structure was inpired by Redux:  
 1. Components - Contains React components
 2. Containers - Contains React containers (only behaviour allowed, no DOM)
 3. Actions - Contains state changes actions
 4. Queries - Contains Graphql queries

## Server

The server is built using:  
 1. AdonisJS framework - Used for data schema migrations, HTTP and Authentication
 2. ApolloServer - Graphql server for most HTTP communication (except file upload and other non-API features)

### Server File Struture

 1. api - contains Graphql schema and resolvers
 2. app - contains HTTP controllers and Models for Authentication and other non-API features
 3. config - contains Adonis configuration files
 4. database - contains database migrations and seeds
 5. public - public HTTP folder
 6. resources - contains server-side resources ie. email template views
 7. start - contains server bootstrap files

## Colaboration

Anyone is welcome to fork and submit issues and pull requests  

## License

MIT
