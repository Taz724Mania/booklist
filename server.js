/**
 * Dependencies
 */
require("dotenv").config() // this is how we make use of our .env variables
require("./config/db") // bring in our db config
const express = require("express")
const morgan = require("morgan") // logger
const methodOverride = require('method-override')

const app = express();
const { PORT = 3013 } = process.env; 

// Bring in our model
const Book = require("./models/Book")

/**
 * Middleware
 */
// app.use((req, res, next) => {
//     console.log("this is middleware")
//     next()
// })
app.use(morgan("dev")) // logging
app.use(express.urlencoded({ extended: true })) // body parser this is how we get access to req.body
app.use(methodOverride("_method")) //lets us use DELETE PUT HTTP verbs


/**
 * Routes & Router
 */

// Index - GET render all of the books
app.get("/books", async (req, res) => {
    // find all of the books
    let books = await Book.find({})

    // render all of the books to index.ejs
    res.render("index.ejs", {
        books: books.reverse()
    })
})

// New - GET for the form to create a new book
app.get("/books/new", (req, res) => {
    // render the create form
    res.render("new.ejs")
})

//DELETE
app.delete("/books/:id", (req, res) => {
    try {
           //Find a book and then delete it
    let deletedBook = Book.findByIdAndDelete(req.params.id)
    //redirect back to the index
    res.redirect("/books")
    } catch (error) {
        res.status(500).send('something went wrong')
    }
 
})


//UPDATE

// Create - POST
app.post("/books", async (req, res) => {
    try {
        if (req.body.completed === "on") {
            // if checked
            req.body.completed = true
        } else {
            // if not checked
            req.body.completed = false
        }
    
        let newBook = await Book.create(req.body)
        res.redirect("/books")

    } catch (err) {
        res.send(err)
    }
})

//EDIT

// Show - GET rendering only one book
app.get("/books/:id", async (req, res) => {
  // find book by _id
  let foundBook = await Book.findById(req.params.id) //the request params object

  //render show.ejs w/ the foundbook
  res.render("show.ejs", {
    book: foundBook
  })
})
/**
 * Server listener
 */
app.listen(PORT, () => console.log(`Listening to the sounds of ${PORT}`))