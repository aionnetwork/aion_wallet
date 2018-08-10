var axios = require('axios');
var ad= "0xa08849e680dbede69077b3be7d9c8c37f5849c46cce63eafb26bd2083ce32a48";
console.log("here");
    var data = {
        "jsonrpc":"2.0",
        "method":"eth_getBalance",
        "params":[ad , "latest"],
        "id":1
    };
console.log('0x'+ad);
    // console.log("the logggg is "+request.post({url: window.web3addr, body: data, json: true}, function(error, response, body){
    //     this.balance= parseInt(body.result); 
    //     console.log("the body is "+body.result);
    //     window.balance = this.balance;
    //     return this.balance/Math.pow(10,18);
    // }));
    /*
    request.post({url: window.web3addr, headers:{'Content-Type': 'application/json'}, body: data, json: true}, function(error, response, body){
        Wallet.setter(parseInt(body.result)); 
       window.balance = parseInt(body.result);
    });
    */
    axios.post("http://127.0.0.1:8545", data)
      .then(function (response) {
        console.log("in get balance "+ parseInt(response.data.result));

      })
      .catch(function (error) {
        console.log(error);
    });