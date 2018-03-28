/*******************************************************************************
 * Copyright (c) 2017-2018 Aion foundation.
 *
 *     This file is part of the aion network project.
 *
 *     The aion network project is free software: you can redistribute it
 *     and/or modify it under the terms of the GNU General Public License
 *     as published by the Free Software Foundation, either version 3 of
 *     the License, or any later version.
 *
 *     The aion network project is distributed in the hope that it will
 *     be useful, but WITHOUT ANY WARRANTY; without even the implied
 *     warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *     See the GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with the aion network project source files.
 *     If not, see <https://www.gnu.org/licenses/>.
 *
 *     The aion network project leverages useful source code from other
 *     open source projects. We greatly appreciate the effort that was
 *     invested in these projects and we thank the individual contributors
 *     for their work. For provenance information and contributors
 *     please see <https://github.com/aionnetwork/aion/wiki/Contributors>.
 *
 * Contributors to the aion source files:
 *     MyEtherWallet LLC  
 *******************************************************************************/
'use strict';
var Wallet = require('./myetherwallet.js')

var Web3Wallet = function(addressBuffer) {
    Wallet.call(this)
    this.addressBuffer = addressBuffer
    this.type = "web3";
    this.hwType = "web3";
}
// subclass Wallet
Web3Wallet.super_ = Wallet;
Web3Wallet.prototype = Object.create(Wallet.prototype);

Web3Wallet.prototype.getAddress = function() {
    return this.addressBuffer
}

Web3Wallet.prototype.getPrivateKey = function() {
    throw new Error('Web3Wallet - method not supported')
}
Web3Wallet.prototype.getPrivateKeyString = function() {
    throw new Error('Web3Wallet - method not supported')
}
Web3Wallet.prototype.getPublicKey = function() {
    throw new Error('Web3Wallet - method not supported')
}
Web3Wallet.prototype.getPublicKeyString = function() {
    throw new Error('Web3Wallet - method not supported')
}
Web3Wallet.prototype.toV3 = function(password, opts) {
    throw new Error('Web3Wallet - method not supported')
}
Web3Wallet.prototype.toJSON = function() {
    throw new Error('Web3Wallet - method not supported')
}
Web3Wallet.prototype.toV3String = function(password, opts) {
    return JSON.stringify(this.toV3(password, opts))
}
Web3Wallet.prototype.getV3Filename = function(timestamp) {
    var ts = timestamp ? new Date(timestamp) : new Date()
    return ['UTC--', ts.toJSON().replace(/:/g, '-'), '--', this.getAddress().toString('hex')].join('')
}


module.exports = Web3Wallet;
