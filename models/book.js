/**
 * Dependencies
 */
const mongoose = require("mongoose")

// create our schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    completed: Boolean
})

// compose our model from the schema
const Book = mongoose.model("book", bookSchema)

// Export our model
module.exports = Book

