"use strict";
/* global require, __dirname, module */

const path = require('path');


function getFullPath(relativePath) {

    return path.join(__dirname, relativePath);
}

const config =
{
    printHeaderFunctionsPath: getFullPath('./app/private/code/functions/printHeaderFunctions.js'),
    friendsDatabasePath:      getFullPath('./app/private/data/FriendsDatabase.js'),
    htmlRoutesPath:           getFullPath('./app/private/code/routing/HTMLRoutes.js'),
    apiRoutesPath:            getFullPath('./app/private/code/routing/APIRoutes.js'),
    homeHTMLPath:             getFullPath('./app/public/home.html'),
    surveyHTMLPath:           getFullPath('./app/public/survey.html')
};


module.exports = config;