var express = require('express')
var router = express.Router()

const Web3 = require('web3');

// create connection to geth node - in this case, the docker host
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

/**
 * Display eth node status value
 * @param  {[type]} req  [description]
 * @param  {[type]} res [description]
 * @return {[type]}          [description]
 */
router.get(['/', '/status'], (req, res) => {

    res.render('pages/status', {
            title: 'Status: ',
            syncStats: web3.eth.syncing,
            latestBlock: web3.eth.blockNumber,
            accounts: web3.eth.accounts,
        });
})

module.exports = router