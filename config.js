"use strict";
/* global require, __dirname, module */

const path = require('path');


function getFullPath(relativePath) {

    return path.join(__dirname, relativePath);
}

const config =
{
    friendsDatabasePath:      getFullPath('./app/private/model/FriendsDatabase.js'),
    friendsDatabaseSeedPath:  getFullPath('./app/private/model/seed.js'),
    printHeaderFunctionsPath: getFullPath('./app/private/controller/functions/printHeaderFunctions.js'),
    htmlRoutesPath:           getFullPath('./app/private/controller/routing/HTMLRoutes.js'),
    apiRoutesPath:            getFullPath('./app/private/controller/routing/APIRoutes.js'),
    publicAssetsPath:         getFullPath('./app/public'),
    homeHTMLPath:             getFullPath('./app/public/html/home.html')
};


module.exports = config;