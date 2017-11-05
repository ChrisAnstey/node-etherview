var express = require('express')
var router = express.Router()

const Web3 = require('web3');

// create connection to geth node - in this case, the docker host
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

/**
 * Displays block info
 * @param  {[type]} req  [description]
 * @param  {[type]} res [description]
 * @return {[type]}          [description]
 */
router.get('/:account', (req, res) => {

    res.render('pages/account', {
            title: 'View Account: ' + req.params.account,
            account: req.params.account,
            balance: web3.fromWei(web3.eth.getBalance(req.params.account), 'ether'),
            transactionCount: web3.eth.getTransactionCount(req.params.account),
        });
})

module.exports = router