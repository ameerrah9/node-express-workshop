const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');

// dotenv.config({ path: './config/config.env' });
require('dotenv').config({ path: './config/config.env' });

connectDB();

const app = express();

// Body parser
/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

app.use(logger)

app.use('/user', userRoute);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
// instead of crashing the server
// for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});


module.exports = server;