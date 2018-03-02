'use strict';
const AionWeb3 = require('./aionWeb3/index')
var aionweb3 = new AionWeb3(new AionWeb3.providers.HttpProvider('http://127.0.0.1:8545'));

var nacl = require('./nacl.js');
var blake2b = require('./blakejs/blake2b');
var blake2bHex = blake2b.blake2bHex;
const RLP = require('./RLPlib.js')

function hexStringToByte(str) { 
  var a = [];
  for (var i = 0, len = str.length; i < len; i+=2) {
    a.push(parseInt(str.substr(i,2),16));
  }
  
  return new Uint8Array(a);
}

var uiFuncs = function() {}
uiFuncs.getTxData = function($scope) {console.log("getting data");
    return {
        to: $scope.tx.to,
        value: $scope.tx.value,
        unit: $scope.tx.unit,
        gasLimit: $scope.tx.gasLimit,
        data: $scope.tx.data,
        from: $scope.wallet.getAddressString(),
        privKey: $scope.wallet.privKey ? $scope.wallet.getPrivateKeyString() : '',
        path: $scope.wallet.getPath(),
        hwType: $scope.wallet.getHWType(),
        hwTransport: $scope.wallet.getHWTransport()
    };
}
uiFuncs.isTxDataValid = function(txData) { 
    console.log("txData.to: ",txData.to);
    console.log("txData.value: ",txData.value);
    console.log("txData.unit: ",txData.unit);
    console.log("txData.gasLimit: ",txData.gasLimit);
    console.log("txData.data: ",txData.data);
    console.log("txData.from: ",txData.from);
    console.log("txData.privKey: ",txData.privKey);
    console.log("txData.path: ",txData.path);
    console.log("txData.hwType: ",txData.hwType);
    console.log("txData.hwTransport: ",txData.hwTransport);




    if (txData.to != "0xCONTRACT" && !ethFuncs.validateEtherAddress(txData.to)) throw globalFuncs.errorMsgs[5];
    else if (!globalFuncs.isNumeric(txData.value) || parseFloat(txData.value) < 0) throw globalFuncs.errorMsgs[0];
    else if (!globalFuncs.isNumeric(txData.gasLimit) || parseFloat(txData.gasLimit) <= 0) throw globalFuncs.errorMsgs[8];
    else if (!ethFuncs.validateHexString(txData.data)) throw globalFuncs.errorMsgs[9];
    if (txData.to == "0xCONTRACT") txData.to = '';
}
uiFuncs.signTxTrezor = function(rawTx, txData, callback) {
    var localCallback = function(result) {
        if (!result.success) {
            if (callback !== undefined) {
                callback({
                    isError: true,
                    error: result.error
                });
            }
            return;
        }

        rawTx.v = "0x" + ethFuncs.decimalToHex(result.v);
        rawTx.r = "0x" + result.r;
        rawTx.s = "0x" + result.s;
        var eTx = new ethUtil.Tx(rawTx);
        rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
        rawTx.isError = false;
        if (callback !== undefined) callback(rawTx);
    }

    TrezorConnect.signEthereumTx(
        txData.path,
        ethFuncs.getNakedAddress(rawTx.nonce),
        ethFuncs.getNakedAddress(rawTx.gasPrice),
        ethFuncs.getNakedAddress(rawTx.gasLimit),
        ethFuncs.getNakedAddress(rawTx.to),
        ethFuncs.getNakedAddress(rawTx.value),
        ethFuncs.getNakedAddress(rawTx.data),
        rawTx.chainId,
        localCallback
    );
}
uiFuncs.signTxLedger = function(app, eTx, rawTx, txData, old, callback) {
    eTx.raw[6] = Buffer.from([rawTx.chainId]);
    eTx.raw[7] = eTx.raw[8] = 0;
    var toHash = old ? eTx.raw.slice(0, 6) : eTx.raw;
    var txToSign = ethUtil.rlp.encode(toHash);
    var localCallback = function(result, error) {
        if (typeof error != "undefined") {
            error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
            if (callback !== undefined) callback({
                isError: true,
                error: error
            });
            return;
        }
        rawTx.v = "0x" + result['v'];
        rawTx.r = "0x" + result['r'];
        rawTx.s = "0x" + result['s'];
        eTx = new ethUtil.Tx(rawTx);
        rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
        rawTx.isError = false;
        if (callback !== undefined) callback(rawTx);
    }
    app.signTransaction(txData.path, txToSign.toString('hex'), localCallback);
}
uiFuncs.signTxDigitalBitbox = function(eTx, rawTx, txData, callback) {
    var localCallback = function(result, error) {
        if (typeof error != "undefined") {
            error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
            if (callback !== undefined) callback({
                isError: true,
                error: error
            });
            return;
        }
        uiFuncs.notifier.info("The transaction was signed but not sent. Click the blue 'Send Transaction' button to continue.");
        rawTx.v = ethFuncs.sanitizeHex(result['v']);
        rawTx.r = ethFuncs.sanitizeHex(result['r']);
        rawTx.s = ethFuncs.sanitizeHex(result['s']);
        var eTx_ = new ethUtil.Tx(rawTx);
        rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = ethFuncs.sanitizeHex(eTx_.serialize().toString('hex'));
        rawTx.isError = false;
        if (callback !== undefined) callback(rawTx);
    }
    uiFuncs.notifier.info("Touch the LED for 3 seconds to sign the transaction. Or tap the LED to cancel.");
    var app = new DigitalBitboxEth(txData.hwTransport, '');
    app.signTransaction(txData.path, eTx, localCallback);
}
uiFuncs.trezorUnlockCallback = function(txData, callback) {
    TrezorConnect.open(function(error) {
        if (error) {
            if (callback !== undefined) callback({
                isError: true,
                error: error
            });
        } else {
            txData.trezorUnlocked = true;
            uiFuncs.generateTx(txData, callback);
        }
    });
}
uiFuncs.generateTx = function($scope, txData, callback) { 
    if ((typeof txData.hwType != "undefined") && (txData.hwType == "trezor") && !txData.trezorUnlocked) {
        uiFuncs.trezorUnlockCallback(txData, callback);
        return;
    }
    try {
        uiFuncs.isTxDataValid(txData);
        var genTxWithInfo = function(data) {

console.log("nonce is "+aionweb3.eth.getTransactionCount('0x'+$scope.wallet.getPublicKeyString()));

            var rawTx = {
                RLP_TX_NONCE: aionweb3.eth.getTransactionCount('0x'+$scope.wallet.getPublicKeyString()),
                RLP_TX_TO: ethFuncs.sanitizeHex(txData.to),
                RLP_TX_VALUE: txData.value,
                RLP_TX_DATA: ethFuncs.sanitizeHex(txData.data),
                RLP_TX_TIMESTAMP: Date.now()*1000, //microseconds, big endian byte array
                RLP_TX_NRG: txData.gasLimit,
                RLP_TX_NRGPRICE: data.gasprice,
                RLP_TX_TYPE: "0x01"               
            };
console.log("rawtx " +aionweb3.eth.getTransactionCount('0x'+$scope.wallet.getPublicKeyString())+" "+txData.to+ " "+txData.value+txData.data+" "+Date.now()*1000+" "+txData.gasLimit+" "+ txData.gasprice);
            txData.gasprice =1; 

            //var rawTxArray= ["0x00", txData.to,txData.value, '0x'+txData.data, Date.now()*1000,  txData.gasLimit, 1, "0x01"];
            var rawTxArray= [ethFuncs.sanitizeHex('0x'+aionweb3.eth.getTransactionCount('0x'+$scope.wallet.getPublicKeyString())), 
                ethFuncs.sanitizeHex(txData.to), 
                ethFuncs.sanitizeHex((txData.value*Math.pow(10, 18)).toString(16)), 
                ethFuncs.sanitizeHex('0x'+txData.data), 
                ethFuncs.sanitizeHex('0x'+(Date.now()*1000).toString(16)),  
                ethFuncs.sanitizeHex('0x'+txData.gasLimit.toString(16)), 
                ethFuncs.sanitizeHex('0x'+txData.gasprice.toString(16)), 
                "0x01"];

            console.log(rawTxArray);

            if (ajaxReq.eip155) rawTx.chainId = ajaxReq.chainId;
            //var eTx = new ethUtil.Tx(rawTx);
            /*
            if ((typeof txData.hwType != "undefined") && (txData.hwType == "ledger")) {
                var app = new ledgerEth(txData.hwTransport);
                var EIP155Supported = false;
                var localCallback = function(result, error) {
                    if (typeof error != "undefined") {
                        if (callback !== undefined) callback({
                            isError: true,
                            error: error
                        });
                        return;
                    }
                    var splitVersion = result['version'].split('.');
                    if (parseInt(splitVersion[0]) > 1) {
                        EIP155Supported = true;
                    } else
                    if (parseInt(splitVersion[1]) > 0) {
                        EIP155Supported = true;
                    } else
                    if (parseInt(splitVersion[2]) > 2) {
                        EIP155Supported = true;
                    }
                    uiFuncs.signTxLedger(app, eTx, rawTx, txData, !EIP155Supported, callback);
                }
                app.getAppConfiguration(localCallback);
            } else if ((typeof txData.hwType != "undefined") && (txData.hwType == "trezor")) {
                uiFuncs.signTxTrezor(rawTx, txData, callback);
            } else if ((typeof txData.hwType != "undefined") && (txData.hwType == "web3")) { 
              // for web3, we dont actually sign it here
              // instead we put the final params in the "signedTx" field and
              // wait for the confirmation dialogue / sendTx method
              var txParams = Object.assign({ from: txData.from }, rawTx)
              rawTx.rawTx = JSON.stringify(rawTx);
              rawTx.signedTx = JSON.stringify(txParams);
              rawTx.isError = false;
              callback(rawTx)
            } else if ((typeof txData.hwType != "undefined") && (txData.hwType == "digitalBitbox")) {
                uiFuncs.signTxDigitalBitbox(eTx, rawTx, txData, callback);
            } else {
              //  eTx.sign(new Buffer(txData.privKey, 'hex'));
               // rawTx.rawTx = JSON.stringify(rawTx);
               // rawTx.signedTx = '0x' + eTx.serialize().toString('hex');

*/              var RAWTX = RLP.encode(rawTxArray); 
				console.log("transactionRaw serialized "+ RAWTX.toString('hex'));

                var SIG = Buffer.concat ([new Buffer (hexStringToByte($scope.wallet.getPublicKeyString())),
                    new Buffer (nacl.sign.detached(hexStringToByte(blake2bHex(RAWTX,"",32)), hexStringToByte($scope.wallet.getPrivateKeyString())))]);

                console.log("public key length: "+ new Buffer (hexStringToByte($scope.wallet.getPublicKeyString())).length+" length of back: "+new Buffer (nacl.sign.detached(hexStringToByte(blake2bHex(RAWTX,"",32)), hexStringToByte($scope.wallet.getPrivateKeyString()))).length);


                console.log("signiture "+ SIG.toString('hex'));
                rawTx.signedTx = RLP.encode(rawTxArray.concat(SIG)).toString('hex'); 
                console.log("transaction with signiture "+ rawTx.signedTx);
                rawTx.rawTx = JSON.stringify(rawTx);
                rawTx.isError = false;
                if (callback !== undefined) callback(rawTx);
           // }
        }
        if (txData.nonce || txData.gasPrice) { 
            var data = {
                nonce: txData.nonce,
                gasprice: txData.gasPrice
            }
            data.isOffline = txData.isOffline ? txData.isOffline : false;
            genTxWithInfo(data);
        } else { 
            ajaxReq.getTransactionData(txData.from, function(data) {
                /*if (data.error && callback !== undefined) {
                    callback({
                        isError: true,
                        error: es
                    });
                } else */{
                    data = data.data;
                   // data.isOffline = txData.isOffline ? txData.isOffline : false;
                    genTxWithInfo(data);
                }
            });
        }
    } catch (e) {
        if (callback !== undefined) callback({
            isError: true,
            error: e
        });
    }
}
uiFuncs.sendTx = function(signedTx, callback) {/*
  // check for web3 late signed tx
    if (signedTx.slice(0,2) !== '0x') {
      var txParams = JSON.parse(signedTx)
      window.web3.eth.sendTransaction(txParams, function(err, txHash){
        if (err) {
          return callback({
            isError: true,
            error: err.stack,
          })
        }
        callback({ data: txHash })
      });
      return
    }

    ajaxReq.sendRawTx(signedTx, function(data) {
        var resp = {};
        if (data.error) {
            resp = {
                isError: true,
                error: data.msg
            };
        } else {
            resp = {
                isError: false,
                data: data.data
            };
        }
        if (callback !== undefined) callback(resp);
    });*/

    
    // if (signedTx.slice(0,2) !== '0x') {
    //   var txParam = signedTx.toString('hex');
    //   params.push(txParam)
    // }
    //var txParam = '0x' + signedTx.toString('hex');
    
    aionweb3.eth.sendRawTransaction('0x'+signedTx, function(err, txHash) {
        var resp = {};
        if (err) {
            resp = {
                isError: true,
                error: err
            };
        } else {
            resp = {
                isError: false,
                data: txHash
            };
        }
        if (callback !== undefined) callback(resp);
    })
}
uiFuncs.transferAllBalance = function(fromAdd, gasLimit, callback) {
    try {
        ajaxReq.getTransactionData(fromAdd, function(data) {
            if (data.error) throw data.msg;
            data = data.data;
            var gasPrice = new BigNumber(ethFuncs.sanitizeHex(ethFuncs.addTinyMoreToGas(data.gasprice))).times(gasLimit);
            var maxVal = new BigNumber(data.balance).minus(gasPrice);
            maxVal = etherUnits.toEther(maxVal, 'wei') < 0 ? 0 : etherUnits.toEther(maxVal, 'wei');
            if (callback !== undefined) callback({
                isError: false,
                unit: "ether",
                value: maxVal
            });
        });
    } catch (e) {
        if (callback !== undefined) callback({
            isError: true,
            error: e
        });
    }
}
uiFuncs.notifier = {
    alerts: {},
    warning: function(msg, duration = 5000) {
        this.addAlert("warning", msg, duration);
    },
    info: function(msg, duration = 5000) {
        this.addAlert("info", msg, duration);
    },
    danger: function(msg, duration = 7000) {
        msg = msg.message ? msg.message : msg;
        // Danger messages can be translated based on the type of node
        msg = globalFuncs.getEthNodeMsg(msg);
        this.addAlert("danger", msg, duration);
    },
    success: function(msg, duration = 5000) {
        this.addAlert("success", msg, duration);
    },
    addAlert: function(type, msg, duration) {
        if (duration == undefined) duration = 7000;
        // Save all messages by unique id for removal
        var id = Date.now();
        alert = this.buildAlert(id, type, msg);
        this.alerts[id] = alert
        var that = this;
        if (duration > 0) { // Support permanent messages
            setTimeout(alert.close, duration);
        }
        if (!this.scope.$$phase) this.scope.$apply();
    },
    buildAlert: function(id, type, msg) {
        var that = this;
        return {
            show: true,
            type: type,
            message: msg,
            close: function() {
                delete that.alerts[id];
                if (!that.scope.$$phase) that.scope.$apply();
            }
        }
    },
  }
  
console.log(navigator.userAgent);
uiFuncs.kernelRunning = true;
if (navigator.userAgent.indexOf("Linux")==-1) {
    alert("You are not running a linux machine, please note that you can only generate accounts on this wallet, for full functionality please log on to a lunix machine and connect to an Aion node");
    uiFuncs.kernelRunning = false;
}

module.exports = uiFuncs;
