/**
 * Basic web app to view the ethereum blockchain
 */
require('dotenv').config()

const Web3 = require('web3');
const ejs = require('ejs')

var express = require('express')
var app = express()

/**
 * Code to handle web requests
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
app.get('/blocks/:block', (request, response) => {
    response.writeHead(200, {
        'content-type': 'text/html'
    });

    // create connection to geth node - in this case, the docker host
    var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

    // load the block info using web3
    var block = web3.eth.getBlock(request.params.block)

    ejs.renderFile(__dirname + '/views/pages/block.ejs', {
            title: 'View Block: ' + block.number,
            hash: block.hash,
            block: block
        },
        function(err, result) {
            // render on success
            if (!err) {
                response.end(result);
            }
            // render or error
            else {
                response.end('An error occurred');
                console.log(err);
            }
        }
    );

})

app.listen(process.env.HTTP_PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${process.env.HTTP_PORT}`)
})