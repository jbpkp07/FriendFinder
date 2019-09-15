"use strict";
/* global require, process, __dirname */

const port = process.env.PORT || 3000;

const config = require('./config.js');
const terminal = require('terminal-kit').terminal;
const express = require('express');
const header = require(config.printHeaderFunctionsPath);
const FriendsDatabase = require(config.friendsDatabasePath);
const HTMLroutes = require(config.htmlRoutesPath);
const APIRoutes = require(config.apiRoutesPath);

const app = express();

app.use(express.static(config.publicAssetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const friendsDatabase = new FriendsDatabase(config);

const htmlRoutes = new HTMLroutes(config);
const apiRoutes  = new APIRoutes(config, friendsDatabase);

app.use(htmlRoutes.router);
app.use(apiRoutes.router);

app.listen(port, () => {

    terminal.hideCursor();

    header.printHeader();

    terminal.white("  Webserver listening on port ► ").brightGreen(port + "\n\n");
});