var express = require('express')
var router = express.Router()

var moment = require('moment')

const Web3 = require('web3');

// create connection to geth node - in this case, the docker host
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

/**
 * Displays transaction info
 * @param  {[type]} req  [description]
 * @param  {[type]} res [description]
 * @return {[type]}          [description]
 */
router.get('/:transaction', (req, res) => {

    // load the transaction info using web3
    var transaction = web3.eth.getTransaction(req.params.transaction)
    var transactionReceipt = web3.eth.getTransactionReceipt(req.params.transaction)

    // convert transaction values to ether
    transaction.valueEther = web3.fromWei(transaction.value, 'ether');
    transaction.gasPriceEther = web3.fromWei(transaction.gasPrice, 'ether');

    res.render('pages/transaction', {
            title: 'View Transaction: ' + transaction.hash,
            transaction: transaction,
            receipt: transactionReceipt,
            web3: web3
        });
})

module.exports = router