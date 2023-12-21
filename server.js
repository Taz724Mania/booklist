// dependencies

require('dotenv').config() //how we make use of .env variables
require('./config/db.js')
const express = require('express')
const morgan = require ('morgan') //logger; she's got all the tea

const app = express()
const {PORT = 3013} = process.env;

//bring in our model
const book = require('./models/book.js')

//Middleware
// app.use((req, res, next) => {
//     console.log('this is middleware')
//     next()
// })
app.use(morgan('dev')) //logging
app.use(express.urlencoded({extended: true}))


// Routes & Router

//Index - GET render all of the books

// New - GET for the form to create a new book

// Create - POST
app.post('/books', async (req, res) => {
    if (req.body.completed === 'on') {
        // if checked 
        req.body.completed = true
    } else {
        // if not checked
        req.body.completed = false
    }

    let newBook = await book.create(req.body)
    res.send(newBook)
})


// Show


// Server listener

app.listen(PORT, () => console.log(`You're listening to the smooth sounds of ${PORT}`))