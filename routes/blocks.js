var express = require('express')
var router = express.Router()

var moment = require('moment')

const Web3 = require('web3');

// create connection to geth node - in this case, the docker host
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

/**
 * Displays block info
 * @param  {[type]} req  [description]
 * @param  {[type]} res [description]
 * @return {[type]}          [description]
 */
router.get('/:block', (req, res) => {

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

module.exports = router