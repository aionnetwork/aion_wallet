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
var blake2B = blake2b.blake2b;
const RLP = require('./RLPlib.js');
var axios = require('axios');

function bin2string(array){
    var result = "";
    for(var i = 0; i < array.length; ++i){
        result+= (String.fromCharCode(array[i]));
    }
    return result;
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}


function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

// creating a wallet object
var Wallet = function(priv, pub, address, path, hwType, hwTransport) {
    if (typeof priv != "undefined") {
        this.privKey = priv.length == 32 ? priv : Buffer(priv, 'hex')
    }
    this.pubKey = pub; console.log("creating address "+address);
    this.address = address;
    this.path = path;
    this.hwType = hwType;
    this.hwTransport = hwTransport;
    this.type = "default";
    this.balance=5;
}

Wallet.setter=function (b){
    this.balance= b;
}

Wallet.generate = function(icapDirect) {
    var keys = nacl.sign.keyPair();
    return new Wallet(keys.secretKey, keys.publicKey);
}

Wallet.prototype.setBalance = function(callback) {
    var parentObj = this; 
/*
    try {   
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const AionWeb3 = require('./aionWeb3/lib/web3.js');
        var aionweb3 = new AionWeb3(new AionWeb3.providers.HttpProvider(window.web3addr));
        this.balance = aionweb3.eth.getBalance('0x'+this.pubKey);
    } catch (err) {
        console.log("not connected");
        uiFuncs.notifier.danger("You are not connected to a node, please connect to a functional node from the drop down menu");
    } 
*/
    var data = {
        "jsonrpc":"2.0",
        "method":"eth_getBalance",
        "params":['0x'+this.pubToAddress() , "latest"],
        "id":1
    };
/*
    request.post({url: window.web3addr, headers:{'Content-Type': 'application/json'}, body: data, json: true}, function(error, response, body){
        this.balance= parseInt(body.result); console.log("body result is "+typeof this.balance);
        window.balance = this.balance;
    });
*/
    axios.post(window.web3addr, data)
      .then(function (response) {
        console.log( "the balance is "+typeof parseInt(response.data.result));
        this.balance=parseInt(response.data.result);
        window.balance = this.balance;
      })
      .catch(function (error) {
        console.log(error);
    });

}
Wallet.prototype.getBalance = function() { 

    var data = {
        "jsonrpc":"2.0",
        "method":"eth_getBalance",
        "params":['0x'+this.pubToAddress() , "latest"],
        "id":1
    };
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
    axios.post(window.web3addr, data)
      .then(function (response) {
        //Wallet.setter(parseInt(response.data.result));
        window.balance = parseInt(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
    });

    return window.balance/Math.pow(10,18);

}
Wallet.prototype.getPath = function() {
    return this.path;
}
Wallet.prototype.getHWType = function() {
    return this.hwType;
}
Wallet.prototype.getHWTransport = function() {
    return this.hwTransport;
}
Wallet.prototype.getPrivateKey = function() {
    return this.privKey
}
Wallet.prototype.getPrivateKeyString = function() {
    if (typeof this.privKey != "undefined") {
        return this.getPrivateKey().toString('hex')
    } else {
        return "";
    }
}
Wallet.prototype.getPublicKey = function() {
        return this.pubKey;
}
Wallet.prototype.getPublicKeyString = function() {
        return this.pubKey;
}
Wallet.prototype.getAddress = function() {
    return this.pubKey;
}
Wallet.prototype.getAddressString = function() {
    //return '0x' + this.getAddress().toString('hex')
    return '0x' + Buffer(this.privKey, 'hex').toString('hex')
}
Wallet.prototype.getChecksumAddressString = function() {
    return ethUtil.toChecksumAddress(this.getAddressString())
}
Wallet.fromPrivateKey = function(priv) {
    return new Wallet(priv)
}

// converting from a public key to a public address
Wallet.prototype.pubToAddress= function (){
    if (this.address) return this.address;
    
    var Pub = Buffer.from(this.pubKey,'hex');
    var buf = new Buffer (['0xA0']);
    var buff = Buffer.concat([buf,new Buffer(blake2B(Pub,'',32).slice(1,32))]);

    return buff.toString('hex');
}

//creating a keystore file
Wallet.prototype.toV3 = function(password) {

    var salt = ethUtil.crypto.randomBytes(32);
    //var n = 262144;
    var n = 8192;
    var p = 1;
    var r = 8;
    var dklen = 32;

console.log("we are here");

    var kdfparams=[];
    kdfparams[0] = "";
    kdfparams[1] = dklen;
    kdfparams[2] = n;
    kdfparams[3] = p;
    kdfparams[4] = r;
    kdfparams[5] = salt.toString('hex');
    var Kdfparams = RLP.encode(kdfparams);

    var tempParams =  ethUtil.crypto.randomBytes(16);
    var cipherparams=[];
    cipherparams[0] = tempParams.toString('hex');
    var Cipherparams = RLP.encode(cipherparams);

    var derivedKey = ethUtil.scrypt(new Buffer(password), new Buffer (salt,'hex'), n, r, p, dklen);
 
    var cipher = ethUtil.crypto.createCipheriv('aes-128-ctr', derivedKey.slice(0, 16), tempParams);
    var ciphertext = Buffer.concat([cipher.update(this.privKey), cipher.final()]);
    var mac = blake2bHex(Buffer.concat([new Buffer(derivedKey.slice(16,32)),ciphertext]),'',32);
 
    var crypto=[];
    crypto[0] = 'aes-128-ctr'; // cypher
    crypto[1] = ciphertext.toString('hex');
    crypto[2] = "scrypt"; 
    crypto[3] = mac;
    crypto[4] = Cipherparams;
    crypto[5] = Kdfparams;
    var Crypto = RLP.encode(crypto);

    var keystore = [];
    keystore[0] = ethUtil.crypto.randomBytes(16).toString('hex');
    keystore[1] = 3;
    //keystore[2] = Buffer(this.pubKey, 'hex').toString('hex'); 
    keystore[2] = this.pubToAddress();
    keystore[3] = Crypto;

console.log('---------');
    console.log(keystore[0]);
    console.log(keystore[1]);
    console.log(keystore[2]);
    console.log(keystore[3]);
console.log('---------');



    var Keystore = RLP.encode(keystore);
console.log("we are returning");
    return Keystore;
}

//reading from the keystore file
Wallet.fromV3 = function($scope, input, password, nonStrict) {

    var KeystoreItem = RLP.decode(input);

    if (KeystoreItem.length ==4){
        var Crypto = RLP.decode(KeystoreItem[3]);
        var CipherParams = RLP.decode(Crypto[4]);  
        var KdfParams = RLP.decode(Crypto[5]);

        var Keystore = {};
        Keystore['id'] = ab2str(KeystoreItem[0]); //0
        Keystore['version'] = toHexString(KeystoreItem[1]); //1
        Keystore['address'] = ab2str(KeystoreItem[2]);//2

        Keystore['crypto'] = {};//3
        Keystore.crypto['cipher'] = ab2str(Crypto[0]);//4
        Keystore.crypto['cipherText'] = ab2str(Crypto[1]);//5
        Keystore.crypto['kdf'] = ab2str(Crypto[2]);//6
        Keystore.crypto['mac'] = ab2str(Crypto[3]);//7

        Keystore.crypto['cipherParams'] = {};//8
        Keystore.crypto.cipherParams['iv'] = ab2str(CipherParams[0]);//10

        Keystore.crypto['kdfParams'] = {};
        Keystore.crypto.kdfParams['c'] = toHexString(KdfParams[0]);//11
        Keystore.crypto.kdfParams['dklen'] = toHexString(KdfParams[1]);//12
        Keystore.crypto.kdfParams['n'] = toHexString(KdfParams[2]);//13
        Keystore.crypto.kdfParams['p'] = toHexString(KdfParams[3]);//14
        Keystore.crypto.kdfParams['r'] = toHexString(KdfParams[4]);//15
        Keystore.crypto.kdfParams['salt'] = ab2str(KdfParams[5]);//16
        
        var derivedKey;
        if (Keystore.crypto['kdf'] === 'scrypt') {
                derivedKey = ethUtil.scrypt(
                    new Buffer(password), 
                    new Buffer(Keystore.crypto.kdfParams['salt'], 'hex'), 
                    parseInt(Keystore.crypto.kdfParams['n'],16),
                    parseInt(Keystore.crypto.kdfParams['r'],16), 
                    parseInt(Keystore.crypto.kdfParams['p'],16), 
                    parseInt(Keystore.crypto.kdfParams['dklen'],16));
        } else {
            throw new Error('Unsupported key derivation scheme')
        }

        var ciphertext = new Buffer(Keystore.crypto['cipherText'], 'hex');

        var part = derivedKey.slice(16,32);    
        var actual = blake2bHex(Buffer.concat([new Buffer(part),new Buffer (ciphertext)]),'',32);

        if (actual.toString('hex') != Keystore.crypto['mac'].toString('hex')) {
            $scope.kernelKeystore = false;
            throw new Error("Invalid Password!");
        }

        var decipher = ethUtil.crypto.createDecipheriv(Keystore.crypto['cipher'], derivedKey.slice(0, 16), new Buffer(Keystore.crypto.cipherParams['iv'], 'hex'))
        var seed = Wallet.decipherBuffer(decipher, ciphertext, 'hex')

        return new Wallet(seed,'',Keystore['address']);

    } else {

        var keyStoreContents = RLP.decode(input);
        var keyStoreContent =[];
        for(var i = 0; i < keyStoreContents.length; i++){
            keyStoreContent[i] = keyStoreContents[i].toString();
        }

        var derivedKey
        if (keyStoreContent[5] === 'scrypt') {

                derivedKey = ethUtil.scrypt(new Buffer(password), new Buffer(keyStoreContent[7], 'hex'), 
                    parseInt(keyStoreContent[8]), parseInt(keyStoreContent[9]), parseInt(keyStoreContent[10]), parseInt(keyStoreContent[6]));
        } else {
            throw new Error('Unsupported key derivation scheme')
        }
        var ciphertext = new Buffer(keyStoreContent[2], 'hex')
      
        var mac = blake2bHex(Buffer.concat([derivedKey.slice(16, 32), new Buffer(ciphertext, 'hex')]));
        if (mac.toString('hex') !== keyStoreContent[11]) {
            throw new Error('Key derivation failed - possibly wrong passphrase')
        }
        var decipher = ethUtil.crypto.createDecipheriv(keyStoreContent[4], derivedKey.slice(0, 16), new Buffer(keyStoreContent[3], 'hex'))
        var seed = Wallet.decipherBuffer(decipher, ciphertext, 'hex')
        while (seed.length < 32) {
            var nullBuff = new Buffer([0x00]);
            seed = Buffer.concat([nullBuff, seed]);
        }

        return new Wallet(seed,'',keyStoreContent[1]);
    }
}






Wallet.prototype.toJSON = function() {

    return {
        privKey: this.getPrivateKeyString(),
        pubKey: this.getPublicKeyString(),
        publisher: "AionWallet",
        encrypted: false,
        version: 2
    }
}

Wallet.fromAionWalletKey = function(input, password) {
    var cipher = input.slice(0, 128)
    cipher = Wallet.decodeCryptojsSalt(cipher)
    var evp = Wallet.evp_kdf(new Buffer(password), cipher.salt, {
        keysize: 32,
        ivsize: 16
    })
    var decipher = ethUtil.crypto.createDecipheriv('aes-256-cbc', evp.key, evp.iv)
    var privKey = Wallet.decipherBuffer(decipher, new Buffer(cipher.ciphertext))
    privKey = new Buffer((privKey.toString()), 'hex')
    return new Wallet(privKey)
}

Wallet.prototype.toV3String = function(password, opts) {
    return JSON.stringify(this.toV3(password, opts))
}

//creating the name of the keystore file
Wallet.prototype.getV3Filename = function(timestamp) { 
    var ts = timestamp ? new Date(timestamp) : new Date();

    console.log("UTC--"+ ts.toJSON().replace(/:/g, "-")+ "--"+this.privKey.toString('hex').substring(64));

    return "UTC--"+ ts.toJSON().replace(/:/g, "-")+ "--"+this.privKey.toString('hex').substring(64);
}
Wallet.decipherBuffer = function(decipher, data) {
    return Buffer.concat([decipher.update(data), decipher.final()])
}


module.exports = Wallet;
