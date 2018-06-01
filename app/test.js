var request = require('request');

var tab = function (addr){

    var data = {
    	"jsonrpc":"2.0",
    	"method":"eth_blockNumber",
    	"params":[],
    	"id":83};

console.log(addr);
    request.post({url: addr, body: data, json: true}, function(error, response, body){
 		console.log("body result is "+body.result);

    });
}

tab("https://conquest-web3.aion.network:443");