// load routes

var express = require('express')
var app = express()

var status = require('./status');
app.use('/', status);

var blocks = require('./blocks');
app.use('/blocks', blocks);

var transactions = require('./transactions');
app.use('/transactions', transactions);

var accounts = require('./accounts');
app.use('/accounts', accounts);

module.exports = app