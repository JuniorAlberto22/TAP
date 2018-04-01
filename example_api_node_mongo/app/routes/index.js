const appRoutes = require('./app_routes.js');

module.exports = function(app, db){
    appRoutes(app, db);
}