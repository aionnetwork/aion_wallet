/*******************************************************************************
 * Copyright (c) 2017-2018 Aion foundation.
 *
 *     This file is part of the Aion Network project.
 *
 *     The Aion Network project is free software: you can redistribute it
 *     and/or modify it under the terms of the GNU General Public License
 *     as published by the Free Software Foundation, either version 3 of
 *     the License, or any later version.
 *
 *     The Aion Network project is distributed in the hope that it will
 *     be useful, but WITHOUT ANY WARRANTY; without even the implied
 *     warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *     See the GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with the Aion Network project source files.
 *     If not, see <https://www.gnu.org/licenses/>.
 *
 *     The Aion Network project leverages useful source code from other
 *     open source projects. We greatly appreciate the effort that was
 *     invested in these projects and we thank the individual contributors
 *     for their work. For provenance information and contributors
 *     please see <https://github.com/aionnetwork/aion/wiki/Contributors>.
 *
 * Contributors to the aion source files:
 *     Aion foundation.
 *     MyEtherWallet LLC  
 *******************************************************************************/

'use strict';
var nacl = require('./nacl.js');
var blake2b = require('./blake2b');
var blake2bHex = blake2b.blake2bHex;
const RLP = require('./RLPlib.js');
var axios = require('axios');

function hexStringToByte(str) { 
  var a = [];
  for (var i = 0, len = str.length; i < len; i+=2) {
    a.push(parseInt(str.substr(i,2),16));
  }
  
  return new Uint8Array(a);
}

var uiFuncs = function() {}
uiFuncs.getTxData = function($scope) {
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
    
    if (txData.to != "0xCONTRACT" && !ethFuncs.validateEtherAddress(txData.to)) throw globalFuncs.errorMsgs[5];
    else if (!globalFuncs.isNumeric(txData.value) || parseFloat(txData.value) < 0) throw globalFuncs.errorMsgs[0];
    else if (!globalFuncs.isNumeric(txData.gasLimit) || parseFloat(txData.gasLimit) <= 0) throw globalFuncs.errorMsgs[8];
    else if (!ethFuncs.validateHexString(txData.data)) throw globalFuncs.errorMsgs[9];
    if (txData.to == "0xCONTRACT") txData.to = '';
}

uiFuncs.generateTx = function($scope, txData, callback) {     

    try {
        uiFuncs.isTxDataValid(txData);
        
        txData.gasprice =1; 
        
        var genTxWithInfo = function(data) {

            var tempNonce="";

            var data = {
                "jsonrpc":"2.0",
                "method":"eth_getTransactionCount",
                "params":['0x'+$scope.wallet.getPublicKeyString(),'latest'],
                "id":1
            };
/*
            request.post({url: window.web3addr,headers:{'Content-Type': 'application/json'}, body: data, json: true}, function(error, response, body){
                tempNonce= body.result;
            });
*/          

            axios.post(window.web3addr, data)
              .then(function (response) {
                tempNonce= response.data;
              })
              .catch(function (error) {
                console.log(error);
            });

            var rawTx = {
                RLP_TX_NONCE: tempNonce,
                RLP_TX_TO: ethFuncs.sanitizeHex(txData.to),
                RLP_TX_VALUE: txData.value,
                RLP_TX_DATA: ethFuncs.sanitizeHex(txData.data),
                RLP_TX_TIMESTAMP: Date.now()*1000, //microseconds, big endian byte array
                RLP_TX_NRG: txData.gasLimit,
                RLP_TX_NRGPRICE: data.gasprice,
                RLP_TX_TYPE: "0x01"               
            };
           

            txData.gasprice =1; 

            var rawTxArray= [ethFuncs.sanitizeHex('0x'+tempNonce), 
                ethFuncs.sanitizeHex(txData.to), 
                ethFuncs.sanitizeHex((txData.value*Math.pow(10, 18)).toString(16)), 
                ethFuncs.sanitizeHex('0x'+txData.data), 
                ethFuncs.sanitizeHex('0x'+(Date.now()*1000).toString(16)),  
                ethFuncs.sanitizeHex('0x'+txData.gasLimit.toString(16)), 
                ethFuncs.sanitizeHex('0x'+txData.gasprice.toString(16)), 
                "0x01"];

            var RAWTX = RLP.encode(rawTxArray); 

            var SIG = Buffer.concat ([new Buffer (hexStringToByte($scope.wallet.getPublicKeyString())),
                new Buffer (nacl.sign.detached(hexStringToByte(blake2bHex(RAWTX,"",32)), hexStringToByte($scope.wallet.getPrivateKeyString())))]);

            rawTx.signedTx = RLP.encode(rawTxArray.concat(SIG)).toString('hex'); 
            rawTx.rawTx = JSON.stringify(rawTx);
            rawTx.isError = false;
            if (callback !== undefined) callback(rawTx);
        }

        if (txData.nonce || txData.gasPrice) { 
            var data = {
                nonce: txData.nonce,
                gasprice: txData.gasPrice
            }
            data.isOffline = txData.isOffline ? txData.isOffline : false;
            genTxWithInfo(data);
        } else { 

            genTxWithInfo(data);
        }
    } catch (e) {
        if (callback !== undefined) callback({
            isError: true,
            error: e
        });
    }
}
uiFuncs.sendTx = function( signedTx, callback) {

    var data = {
        "jsonrpc":"2.0",
        "method":"eth_sendRawTransaction",
        "params":['0x'+signedTx],
        "id":1
    };
/*
    request.post({url: window.web3addr, headers:{'Content-Type': 'application/json'}, body: data, json: true}, function(error, response, body){
        var resp = {};
        if (error){
            console.log("error "+error);
            resp = {
                isError: true,
                error: error
            };
        } else {
            console.log("data "+ body.result);
            resp = {
                isError: false,
                data: body.result
            };
        }
        if (callback !== undefined) callback(resp);
    })
    */

    axios.post(window.web3addr, data)
      .then(function (response) {
        var resp = {};
        console.log("data "+ response.data.result);
        resp = {
            isError: false,
            data: response.data.result
        };
        if (callback !== undefined) callback(resp);
      })
      .catch(function (error) {
        var resp = {};
        console.log("error "+error);
        resp = {
            isError: true,
            error: error
        };
        if (callback !== undefined) callback(resp);
    });
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
  
uiFuncs.kernelRunning = true;

module.exports = uiFuncs;
