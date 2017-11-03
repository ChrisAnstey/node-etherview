/**
 * Basic web app to view the ethereum blockchain
 */
require('dotenv').config()

const Web3 = require('web3');
const ejs = require('ejs')

var express = require('express')
var app = express()

app.set('view engine', 'ejs');

// create connection to geth node - in this case, the docker host
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

/**
 * Code to handle web requests
 * @param  {[type]} req  [description]
 * @param  {[type]} res [description]
 * @return {[type]}          [description]
 */
app.get('/blocks/:block', (req, res) => {

    // load the block info using web3
    var block = web3.eth.getBlock(req.params.block)

    res.render('pages/block', {
            title: 'View Block: ' + block.number,
            block: block
        });
})

app.listen(process.env.HTTP_PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${process.env.HTTP_PORT}`)
})