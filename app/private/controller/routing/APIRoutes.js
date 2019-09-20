"use strict";
/* global require, __dirname, module */

const terminal = require('terminal-kit').terminal;
const express = require('express');
const axios = require('axios');
const path = require('path');


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

            this.validatePhotoURL(photo).then(() => {
                
                this.friendsDatabase.addFriend(name, photo, scores).then((newFriend) => {
               
                    this.friendsDatabase.getFriendMatch(newFriend).then((bestFriendMatch) => {
                        
                        response.json(bestFriendMatch);
    
                    });
                }).catch((error) => {
                   
                    terminal.red(`  ${error.message}`).gray(`${error.reason}\n\n`);
     
                    response.status(422).send(error);  //Unprocessable Entity (bad request data)                      
                });

            }).catch((error) => {
                
                terminal.red(`  ${error.message}`).gray(`${error.reason}\n\n`);

                response.status(422).send(error);  //Unprocessable Entity (bad request data) 
            });
        });
    }

    validatePhotoURL(photoURL) {

        return new Promise((resolve, reject) => {
           
            const error =
            {
                message: "Rejected photo ► ",
                reason: ""
            };

            const urlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

            if (!urlPattern.test(photoURL)) {
                
                error.reason = "Submitted photo URL is not a valid URL pattern";

                reject(error);

                return;
            }

            const validExts = [ ".jpeg", ".jpg", ".png", ".gif", ".tiff", ".webp" ];

            const photoURLExt = path.extname(photoURL).toLowerCase();

            if (!validExts.includes(photoURLExt)) {

                error.reason = `Submitted photo URL does not have a valid image format extension [${photoURLExt}]`;

                reject(error);

                return;
            }

            axios.get(photoURL).then(() => {
                
                resolve();  //it is a valid submitted photo URL

                return;

            }).catch(() => {
                
                error.reason = "Submitted photo URL is invalid (404 error)";

                reject(error);

                return;
            });
        });
    }
}


module.exports = APIRoutes;