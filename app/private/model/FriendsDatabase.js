"use strict";
/* global require, module */

const terminal = require('terminal-kit').terminal;


class FriendsDatabase {

    constructor(config) {

        this.database = [];

        this.isWriteLocked = false;
        this.writeQueue = [];

        this.PRIVATE_seedDatabase(config);
    }

    static get failedToAddNewFriend() { return "Failed to add new friend ► "; }

    addFriend(name, photoURL, scores) {

        return new Promise((resolve, reject) => {

            const newFriend = new Friend(name, photoURL, scores);

            if (newFriend.isValid) {

                if (!this.PRIVATE_doesFriendAlreadyExist(newFriend)) {

                    newFriend.minimizeThisObject();

                    this.PRIVATE_pushNewFriend(newFriend);
    
                    resolve(newFriend);
                }
                else {  //we are trying to add a duplicate friend entry...

                    const error =
                    {
                        message: FriendsDatabase.failedToAddNewFriend,
                        reason: "Friend already exists in database"
                    };
    
                    reject(error);
                }
            }
            else {

                const error =
                {
                    message: FriendsDatabase.failedToAddNewFriend,
                    reason: newFriend.validationErrorMSG
                };

                reject(error);
            }
        });
    }

    getAllFriendsJSON() {

        return new Promise((resolve) => {
   
            const databaseCopy = [];

            this.database.forEach(friend => databaseCopy.push(friend));

            resolve(databaseCopy);  //temporarily uses extra memory, but protects the internal database (this.database) from external modification.
        });
    }

    getFriendMatch(newFriend) {

        return new Promise((resolve) => {

            const bestFriendMatch = this.PRIVATE_findBestFriendMatch(newFriend);

            const bestFriendMatchCopy = new Friend(bestFriendMatch.name, bestFriendMatch.photo, bestFriendMatch.scores);

            bestFriendMatchCopy.id = bestFriendMatch.id;
            
            bestFriendMatchCopy.percentageMatch = bestFriendMatch.percentageMatch;

            resolve(bestFriendMatchCopy);  //temporarily uses extra memory, but protects the datbase's friend object from external modification.
        });
    }

    PRIVATE_findBestFriendMatch(newFriend) {

        let bestFriendMatch;

        const maxDiff = newFriend.scores.length * 4;

        let lowestDiff = maxDiff;  //initialized to worst possible match (40)

        for (const friend of this.database) {

            let diff = 0;

            if (friend.id !== newFriend.id) {  //don't compare new friend to itself

                for (let i = 0; i < friend.scores.length; i++) {

                    diff += Math.abs(friend.scores[i] - newFriend.scores[i]);

                    if (lowestDiff < diff) {

                        break;  //No need to continue, not going to be the best match
                    }
                }

                if (lowestDiff >= diff) {  // '>=' promotes most recent added friend to be chosen for identical match diffs

                    lowestDiff = diff;

                    bestFriendMatch = friend;
                }
            }
        }

        const percentageMatch = ((1 - (lowestDiff / maxDiff)) * 100).toFixed(0) + "%";

        bestFriendMatch.percentageMatch = percentageMatch;

        return bestFriendMatch;
    }

    PRIVATE_seedDatabase(config) {

        const seedData = require(config.friendsDatabaseSeedPath);

        const promises = [];

        for (const friend of seedData) {

            const promise = this.addFriend(friend.name, friend.photoURL, friend.scores);

            promises.push(promise);
        }

        Promise.all(promises).catch((error) => {

            terminal.red(`  ${error.message}`).gray(`${error.reason}\n\n`);
        });
    }

    PRIVATE_doesFriendAlreadyExist(newFriend) {

        for (const friend of this.database) {

            if (!this.PRIVATE_areFriendsUnique(friend, newFriend)) {

                return true;
            }
        }

        return false;
    }

    PRIVATE_areFriendsUnique(friend1, friend2) {

        let areScoresTheSame = true;

        //compare survey results
        for (let i = 0; i < friend1.scores.length; i++) {

            if (friend1.scores[i] !== friend2.scores[i]) {

                areScoresTheSame = false;
            }
        }

        if (friend1.name.toLowerCase() === friend2.name.toLowerCase() &&
            friend1.photo.toLowerCase() === friend2.photo.toLowerCase() &&
            areScoresTheSame) {

            return false;  //same names, same photos, and same scores; friends are NOT unique
        }

        return true;
    }

    PRIVATE_pushNewFriend(newFriend) {

        //Write lock simulates auto-incrementing integrity (it should now be thread-safe... even though this app is single-threaded!)
        if (!this.isWriteLocked) {

            this.isWriteLocked = true;

            if (this.database.length > 0) {

                newFriend.id = this.database[this.database.length - 1].id + 1;  //assign incremental id (last-friend-entered's id + 1)
            }
            else {

                newFriend.id = 1;
            }

            this.database.push(newFriend);

            this.PRIVATE_printNewFriend(newFriend);

            if (this.writeQueue.length > 0) {

                const waitingFriend = this.writeQueue.shift();

                terminal.white("  Database write queue length → ").brightGreen(`${this.writeQueue.length}\n\n`);

                this.isWriteLocked = false;

                this.PRIVATE_pushNewFriend(waitingFriend);
            }
            else {

                this.isWriteLocked = false;
            }
        }
        else {

            this.writeQueue.push(newFriend);

            const length = this.writeQueue.length;  //capture length at this moment in time

            setTimeout(() => {

                terminal.white("  Database write queue length → ").brightGreen(`${length}\n\n`);

            }, 0);  //move to end of event loop, allow header to finish printing
        }
    }

    PRIVATE_printNewFriend(friend) {

        setTimeout(() => {

            terminal.cyan("  Added new friend\n");
            terminal.white("  id     → ").gray(`${friend.id}\n`);
            terminal.white("  name   → ").gray(`${friend.name}\n`);
            terminal.white("  photo  → ").gray(`${friend.photo}\n`);
            terminal.white("  scores → ").gray(`[${friend.scores}]\n\n`);

        }, 0); //move to end of event loop, allow header to finish printing
    }
}


class Friend {

    constructor(name, photoURL, scores) {

        this.isValid = false;
        this.validationErrorMSG = "";

        if (typeof name !== 'string' || name.trim().length === 0) {

            this.validationErrorMSG = "Bad value: \'name\'";
            return;
        }

        if (typeof photoURL !== 'string' || photoURL.trim().length === 0) {

            this.validationErrorMSG = "Bad value: \'photoURL\'";
            return;
        }

        if (typeof scores === 'undefined' || !Array.isArray(scores)) {

            this.validationErrorMSG = "Bad value: \'scores\'";
            return;
        }

        if (scores.length !== 10) {

            this.validationErrorMSG = "Bad value: \'scores\' array does not have a length of 10";
            return;
        }

        scores = scores.map(score => parseInt(score));  //convert all values to integers

        for (const score of scores) {

            if (typeof score !== 'number') {

                this.validationErrorMSG = `Bad value: \'scores\' array contains a value that is not a number:  '${score}'`;
                return;
            }
            else {

                if (score < 1 || score > 5) {

                    this.validationErrorMSG = `Bad value: \'scores\' array contains a number not between [1 <-> 5]:  '${score}'`;
                    return;
                }
            }
        }

        this.id = null;
        this.name = name.trim();
        this.photo = photoURL.trim();
        this.scores = scores;

        this.isValid = true;
    }

    minimizeThisObject() {

        delete this.isValid;
        delete this.validationErrorMSG;
    }
}


module.exports = FriendsDatabase;