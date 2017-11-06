/**
 * Basic web app to view the ethereum blockchain
 */
require('dotenv').config()

var express = require('express')
var app = express()

app.set('view engine', 'ejs');

// static files
app.use(express.static('public'))

// load routes
var status = require('./routes/status');
app.use('/', status);

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

var transactions = require('./routes/transactions');
app.use('/transactions', transactions);

var accounts = require('./routes/accounts');
app.use('/accounts', accounts);


// Middleware for error handling

function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

function errorHandler (err, req, res, next) {
    res.status(500)
    res.render('pages/error', { error: err })
}

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.listen(process.env.HTTP_PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${process.env.HTTP_PORT}`)
})