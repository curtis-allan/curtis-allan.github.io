// Enables the .env file, therefore add a env property to process object.
// Recommend to require it at the top of the file
require("dotenv").config();

// Import dependencies/ middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Import controllers
const userController = require("./controllers/user_controller");
const adminController = require("./controllers/admin_controller");
const cloudinaryController = require("./controllers/cloudinary_controller");
const productsController = require("./controllers/products_controller");

// Require the session for saving user data and giving a user a unique experience.
const session = require("express-session");

// Initialize express server
const express = require("express");
const app = express();

const PORT = 5000;

// Connect to mongoDB
mongoose.connect(
  process.env.CONNECTION_STRING,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log("Database Error----------------", err);
    }
    console.log("Connected to database");
  }
);
// Middleware to initialize request body
app.use(bodyParser.json());

// Storing user cookies
app.use(
  session({
    secret: process.en.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

// Allow cross origin reqs
app.use(cors());
