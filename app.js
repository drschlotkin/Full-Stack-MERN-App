'use strict';

const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const UserRoute = require("./routes/user");
const CourseRoute = require("./routes/course");
const mongoose = require("mongoose");
const jsonParser = require("body-parser").json;
const path = require('path');

// Create the Express app
const app = express();

// CORS
app.use(cors())

// Setup morgan for HTTP request logging
app.use(morgan('dev'));

// JSON parser to manage HTTP request
app.use(jsonParser());



// Connect to Mongoose
mongoose.connect("mongodb://ewen:ewenearle1@ds261626.mlab.com:61626/course-directory", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

// Error handler for database
db.on("error", err => {
  console.error("Connection error:", err)
});

// Listen for database connection
db.once("open", () => {
  console.log('db connection successful')
});

// Variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   if (req.method == 'OPTIONS'){
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
//     return res.status(200).json({})
//   }
//   next()
// })

// API routes
app.use("/api", UserRoute);
app.use("/api", CourseRoute);


// Friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my school database REST API project!',
  });
});

// Send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// Set our port
app.set('port', process.env.PORT || 8080);



// Start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
