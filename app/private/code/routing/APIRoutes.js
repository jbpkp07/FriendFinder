"use strict";
/* global require, __dirname, module */


class APIRoutes {

    constructor(expressApp, config, friendsDatabase) {
        
        this.expressApp = expressApp;
        this.config = config;
        this.friendsDatabase = friendsDatabase;

        this.startListeners();
    }

    startListeners() {

        this.getAPIFriends();
    }

    getAPIFriends() {

        this.expressApp.get("/api/friends", (request, response) => {

            this.friendsDatabase.getAllFriendsJSON().then((jsonData) => {
               
                response.json(jsonData); 
            });
        });
    }
}


module.exports = APIRoutes;