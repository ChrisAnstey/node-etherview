const WebSocket = require('ws');
const http = require('http');
const url = require('url');

// load Web3 client, so we can talk to ethereum node
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

var express = require('express')
var app = express()

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

});

server.listen(process.env.WS_PORT, function listening() {
    console.log('websocket server is listening on %d', server.address().port);
});

var filter = web3.eth.filter('latest');

// watch for latest block changes
filter.watch(function(error, result){
    if (!error) {
        // send latest block update to each ws client
        wss.clients.forEach(function each(ws) {
            ws.send(JSON.stringify({'latestBlock': web3.eth.blockNumber}));
        });
    }
});

module.exports = wss