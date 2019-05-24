# Full Stack MERN App

## Introduction

* Created with MERN by Ewen Earle
* School database where users can interact with the application by retrieving a list of courses, view details for specific course, as well as create, update and delete courses in the database.
* Users are required to create an account and sign in to make changes.
* This was the final project of the Full Stack Javascript Techdegree program with <a href="https://teamtreehouse.com" target="_blank">Team Treehouse</a>

## Set Up Back-End

To get up and running with this project, run the following commands from the API directory of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install
```

Second, ensure that you have MongoDB installed globally on your system.

* Open a `Command Prompt` (on Windows) or `Terminal` (on Mac OS X) instance and run the command `mongod` (or `sudo mongod`) to start the MongoDB daemon.
* If that command failed then you’ll need to install MongoDB.
* [How to Install MongoDB on Windows](http://treehouse.github.io/installation-guides/windows/mongo-windows.html)
* [How to Install MongoDB on a Mac](http://treehouse.github.io/installation-guides/mac/mongo-mac.html)

Third, seed your MongoDB database with data.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

## Set Up Front-End

Secondly, open another terminal and change to the CLIENT directory to install the project's front end dependencies using `npm`.

```
npm install
```
And start the application.

```
npm start
```

Application will start on URL http://localhost:3000/