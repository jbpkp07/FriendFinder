"use strict";
/* global require, module */

const terminal = require("terminal-kit").terminal;


const xCoord = 1;
const yCoord = 15;

function printHeader() {

    terminal.reset();
    terminal.clear();
    terminal("\n");
    terminal.brightBlue(" ┌─────────────────────────────────────────────────────────────────────────────┐\n");
    terminal.brightBlue(" │").brightCyan("                                Friend Finder                                ").brightBlue("│\n");
    terminal.brightBlue(" │").brightCyan("                                    v1.0                                     ").brightBlue("│\n");
    terminal.brightBlue(" │").brightCyan("                          written by: Jeremy Barnes                          ").brightBlue("│\n");
    terminal.brightBlue(" ├─────────────────────────────────────────────────────────────────────────────┤\n");
    terminal.brightBlue(" │").brightCyan(" Usage       : ").brightWhite("node server.js").gray(" or ").brightWhite("npm start").gray(" will start this webserver.").brightBlue("        │\n");
    terminal.brightBlue(" │                                                                             │\n");
    terminal.brightBlue(" │").brightCyan(" Description : ").gray("Welcome to Friend Finder, a Node.js / Express.js webapp!").brightBlue("      │\n");
    terminal.brightBlue(" │").gray("               This screen means the webserver is running...").brightBlue("                 │\n");
    terminal.brightBlue(" │                                                                             │\n");
    terminal.brightBlue(" │").brightCyan(" To Exit     : ").gray("Pressing ").brightWhite("[CTRL + C]").gray(" will stop this webserver and exit.").brightBlue("        │\n");
    terminal.brightBlue(" └─────────────────────────────────────────────────────────────────────────────┘");
    terminal("\n\n");
}

function moveCursorToTop() {

    terminal.moveTo(xCoord, yCoord);
}

function clearScreenBelowHeader() {

    moveCursorToTop();

    terminal.eraseDisplayBelow();
}

module.exports = 
{
    printHeader: printHeader,
    moveCursorToTop: moveCursorToTop,
    clearScreenBelowHeader: clearScreenBelowHeader
};