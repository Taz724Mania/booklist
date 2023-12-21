// dependencies

const mongoose = require('mongoose')

//connected to our database
mongoose.connect(process.env.DATABASE_URL)

//connection status listeners
mongoose.connection.on('error', (err) => console.log(err.message + "oops, something went wrong!"))
mongoose.connection.on('connected', () => console.log('connected to mongo'))
mongoose.connection.on('disconnected', () => console.log('disconnected from mongo'))