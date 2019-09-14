"use strict";
/* global require, __dirname, module */


class HTMLRoutes {

    constructor(expressApp, config) {
        
        this.expressApp = expressApp;
        this.config = config;

        this.startListeners();
    }

    startListeners() {

        this.getHomePage();

        this.getSurveyPage();
    }

    getHomePage() {

        this.expressApp.get("/", (request, response) => {

            response.sendFile(this.config.homeHTMLPath);
        });
    }

    getSurveyPage() {

        this.expressApp.get("/survey", (request, response) => {

            response.sendFile(this.config.surveyHTMLPath);
        });
    }
}


module.exports = HTMLRoutes;