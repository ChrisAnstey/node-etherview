/**
 * Basic web app to view the ethereum blockchain
 */
require('dotenv').config()

var express = require('express')
var app = express()

app.set('view engine', 'ejs');

// static files
app.use(express.static('public'))

// routes/controllers
app.use(require('./routes/'))

// load middleware (currently just errors)
app.use(require('./middlewares/errors'))

app.listen(process.env.HTTP_PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`webserver is listening on ${process.env.HTTP_PORT}`)
})

// load the websocket server
var wss = require('./wsserver');
