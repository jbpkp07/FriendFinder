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

        this.getSurveyPage();
    }

    getHomePage() {

        this.router.get("/", (request, response) => {

            response.sendFile(this.config.homeHTMLPath);
        });
    }

    getSurveyPage() {

        this.router.get("/survey", (request, response) => {

            response.sendFile(this.config.surveyHTMLPath);
        });
    }
}


module.exports = HTMLRoutes;