"use strict";
/* global require, __dirname, module */

const express = require("express");


class HTMLRoutes {

    constructor(config) {

        this.config = config;

        this.router = express.Router();

        this.assignRouteListeners();
    }

    assignRouteListeners() {

        this.getHomePage();
    }

    getHomePage() {  //Single page web app, this is the only page needed!

        this.router.get("/", (request, response) => {

            response.sendFile(this.config.homeHTMLPath);
        });
    }
}


module.exports = HTMLRoutes;