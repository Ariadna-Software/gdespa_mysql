/*
 * index.js:
 * Main entry point 
 */

var dbCon = require('./lib/db_connection'),
    userGroup = require('./lib/user_group'),
    user = require('./lib/user');
    
var authorize = require('./lib/authorize.js');

var app = {
    dbCon: dbCon,
    user: user,
    userGroup: userGroup,
    authorize: authorize
}

module.exports = app;
