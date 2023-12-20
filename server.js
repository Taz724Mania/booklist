// dependencies

require('dotenv').config() //how we make use of .env variables
const express = require('express')
const morgan = require ('morgan') //logger; she's got all the tea

const app = express()
const {PORT = 3013} = process.env;

//Middleware



// Routes & Router


// Server listener

app.listen(PORT, () => console.log(`You're listening to the smooth sounds of ${PORT}`))