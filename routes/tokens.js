var express = require('express')
var router = express.Router()

var Token = require('../models/token.js');

/**
 * Displays token info
 * @param  {[type]} req  [description]
 * @param  {[type]} res [description]
 * @return {[type]}          [description]
 */
router.get('/:token', (req, res) => {

	token = new Token(req.params.token);

    res.render('pages/token', {
            title: 'View Token: ' + token.name(),
            token: token,
        });
})

module.exports = router