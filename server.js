/**
 * Basic web app to view the ethereum blockchain
 */
require('dotenv').config()

var express = require('express')
var app = express()

const WebSocket = require('ws');
const http = require('http');
const url = require('url');
const Web3 = require('web3');

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


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

});

server.listen(process.env.WS_PORT, function listening() {
    console.log('Listening on %d', server.address().port);
});

// periodically send latest block number to websocket clients
const interval = setInterval(function newinfo() {
    wss.clients.forEach(function each(ws) {
        var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

        ws.send(JSON.stringify({'latestBlock': web3.eth.blockNumber}));
    });
  }, 3000);