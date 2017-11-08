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

// periodically send latest block number to websocket clients
const interval = setInterval(function newinfo() {
    wss.clients.forEach(function each(ws) {

        ws.send(JSON.stringify({'latestBlock': web3.eth.blockNumber}));
    });
  }, 3000);

module.exports = wss