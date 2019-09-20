# FriendFinder

This is a webserver application that hosts a client web page that provides a simulated experience for matching with friends based on personality metrics.

### Deployed website:

https://jbpkp07-friendfinder.herokuapp.com


### Run it locally:

You can clone this repository via command line (if you have Git installed) by typing:  

`git clone https://github.com/jbpkp07/FriendFinder`

If you already have Node.js installed, open your terminal, and browse to where you have cloned this Git repository and type:  

`node server.js` or if you have nodemon installed, `nodemon server.js`

If there are Node module dependencies that you are missing, please type `npm install` and it will reference the package.json file in this repository to automatically resolve those missing dependencies.

The main entry point for the server application is `server.js`, and the other auxillary files are used to provide Node modules that the application depends on.

To view the client hosted webpage, browse to http://localhost:3000 for the locally hosted page.


**Technologies used:**  Node.js, Javascript, NPM, npm terminal-kit, npm axios, npm express, HTML, CSS, jQuery

There is also strict validation for the survey question answers, with appropriate error messages if the input is invalid.

I am the sole developer of this application.


### Screenshots:

#### Locally running webserver:

![1](https://github.com/jbpkp07/FriendFinder/blob/master/app/public/images/serverScreenshot.png)

#### Hosted website:

![2](https://github.com/jbpkp07/FriendFinder/blob/master/app/public/images/websiteScreenshot1.png)

![3](https://github.com/jbpkp07/FriendFinder/blob/master/app/public/images/websiteScreenshot2.png)

![4](https://github.com/jbpkp07/FriendFinder/blob/master/app/public/images/websiteScreenshot3.png)
