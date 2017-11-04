/**
 * Basic web app to view the ethereum blockchain
 */
require('dotenv').config()

const Web3 = require('web3');
const ejs = require('ejs')

var express = require('express')
var app = express()

app.set('view engine', 'ejs');

var moment = require('moment')

// create connection to geth node - in this case, the docker host
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

/**
 * Displays block info
 * @param  {[type]} req  [description]
 * @param  {[type]} res [description]
 * @return {[type]}          [description]
 */
app.get('/blocks/:block', (req, res) => {

    // load the block info using web3
    var block = web3.eth.getBlock(req.params.block, true)

    // convert transaction values to ether
    Object.keys(block.transactions).forEach(function(item) {
        block.transactions[item].value = web3.fromWei(block.transactions[item].value, 'ether');
    });

    res.render('pages/block', {
            title: 'View Block: ' + block.number,
            block: block,
            dateTime: moment.unix(block.timestamp ).format('LLL'),
            web3: web3
        });
})

/**
 * Display eth node status value
 * @param  {[type]} req  [description]
 * @param  {[type]} res [description]
 * @return {[type]}          [description]
 */
app.get('/status', (req, res) => {

    res.render('pages/status', {
            title: 'Status',
            syncStats: web3.eth.syncing,
            latestBlock: web3.eth.blockNumber,
            accounts: web3.eth.accounts,
        });
})

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