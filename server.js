// DEPENDENCIES
require("dotenv").config();
require("./config/db.js");
const express = require("express");
const morgan = require("morgan");
const Book = require('./models/Book.js')
const app = express();
const { PORT = 3013 } = process.env;

// MIDDLE WARE
app.use(morgan("dev")); // logging
app.use(express.urlencoded({ extended: false }));
// how we get access to the req.body

// ROUTES
// Index - Get render all books

// New - Get for the form to create a new book
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});

// Create - Post
app.post("/books", async (req, res) => {
  try {
    if (req.body.completed === "on") {
      // if checked
      req.body.completed = true;
    } else {
      // not checked
      req.body.completed = false;
    }
    let newBook = await Book.create(req.body);
    console.log(newBook)
    res.send(newBook);
  } catch (err) {
    console.log(err);
  }
});
// Show

// LISTENER
app.listen(PORT, () => console.log(`listening to the sound of ${PORT}`));