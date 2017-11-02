/**
 * Basic web app to view the ethereum blockchain
 */

const http = require('http')
const url  = require('url');
const Web3 = require('web3');
const ejs = require('ejs')
const port = 3000

/**
 * Code to handle web requests
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
const requestHandler = (request, response) => {
  response.writeHead(200, {'content-type': 'text/html'});

  // pass true as 2nd param to parse querystring too
  var reqDeets = url.parse(request.url, true)

  // create connection to geth node - in this case, the docker host
  var web3 = new Web3(new Web3.providers.HttpProvider("http://172.28.0.1:8545"))

  // load the block info using web3
  var block = web3.eth.getBlock(reqDeets.query.block)

  ejs.renderFile(__dirname + '/views/pages/block.ejs',
  	{
  		title : 'View Block: ' + block.number,
  		hash  : block.hash, block: block
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

}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
