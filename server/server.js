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

const PORT = 4000;

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
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

// Allow cross origin reqs
app.use(cors());

setTimeout(() => {
  // User endpoints setup

  // Read the user's session data
  app.get("/api/user-data", userController.readUserData);

  // Add a new item to cart
  app.post("/api/user-data/cart", userController.addToCart);

  // Remove an item from the cart
  app.delete("/api/user-data/cart/:id", userController.removeFromCart);

  // When a User logs in
  app.post("/api/login", userController.login);

  // When a User logs out
  app.post("/api/logout", userController.logout);

  // Products endpoints setup

  // Read all product data
  app.get("/api/products", productsController.readAllProducts);

  // Reading a specific product
  app.get("/api/products/:id", productsController.readProduct);

  // Admin endpoints setup

  // Gets the admin users
  app.get("/api/users", adminController.getAdminUsers);

  // Admin creates a new product
  app.post("/api/products", adminController.createProduct);

  // Admin updating a product
  app.put("/api/products/:id", adminController.updateProduct);

  // Admin deleting a product
  app.delete("/api/products/:id", adminController.deleteProduct);
}, 200);

app.listen(PORT, () => console.log("Listening on Port: ", PORT));
