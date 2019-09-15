"use strict";
/* global require, __dirname, module */

const terminal = require('terminal-kit').terminal;
const express = require("express");


class APIRoutes {

    constructor(config, friendsDatabase) {
        
        this.config = config;
        this.friendsDatabase = friendsDatabase;

        this.router = express.Router();

        this.assignRouteListeners();
    }

    assignRouteListeners() {

        this.getAPIFriends();

        this.postAPIFriends();
    }

    getAPIFriends() {

        this.router.get("/api/friends", (request, response) => {

            this.friendsDatabase.getAllFriendsJSON().then((jsonData) => {
               
                response.json(jsonData); 
            });
        });
    }

    postAPIFriends() {

        this.router.post("/api/friends", (request, response) => {

            const { name }   = request.body;
            const { photo }  = request.body;
            const { scores } = request.body;

            this.friendsDatabase.addFriend(name, photo, scores).then((newFriend) => {
               
                this.friendsDatabase.getFriendMatch(newFriend).then((bestFriendMatch) => {
                    
                    response.json(bestFriendMatch);

                });
            }).catch((error) => {
               
                terminal.red(`  ${error.message}`).gray(`${error.reason}\n\n`);
 
                response.status(422).send(error);  //Unprocessable Entity (bad request data)                      
            });
        });
    }
}


module.exports = APIRoutes;