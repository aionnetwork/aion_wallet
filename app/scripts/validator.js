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
 *     Aion foundation.
 *     MyEtherWallet LLC  
 *******************************************************************************/

'use strict';
var validator = function() {}

validator.isValidAddress = function(address) {
    if (address && address == "0x0000000000000000000000000000000000000000") return false;
    if (address)
        //return ethFuncs.validateEtherAddress(address);
        return address.length == 64 || address.length == 66;
    return false;
}
validator.isChecksumAddress = function(address) {
    return ethFuncs.isChecksumAddress(address);
}

validator.isValidENSName = function(str) {
    try {
        return (str.length > 6 && ens.normalise(str) != '' && str.substring(0, 2) != '0x');
    } catch (e) {
        return false;
    }
}
validator.isValidTxHash = function(txHash) {
    return txHash.substring(0, 2) == "0x" && txHash.length == 66 && this.isValidHex(txHash);
}

validator.isValidBTCAddress = function(address) {
    return ethUtil.WAValidator.validate(address, 'BTC');
}
validator.isPositiveNumber = function(value) {
    return globalFuncs.isNumeric(value) && parseFloat(value) >= 0;
}
validator.isValidHex = function(hex) {
    return ethFuncs.validateHexString(hex);
}
validator.isValidPrivKey = function(privkeyLen) {
    //return privkeyLen == 64 || privkeyLen == 66 || privkeyLen == 128 || privkeyLen == 132;
    return privkeyLen == 128 || privkeyLen == 130;
}
validator.isPasswordLenValid = function(pass, len) {
    if (pass === 'undefined' || pass == null) return false;
    return pass.length > len;
}
validator.isAlphaNumeric = function(value) {
    return globalFuncs.isAlphaNumeric(value);
}
validator.isAlphaNumericSpace = function(value) {
    if (!value) return false;
    return globalFuncs.isAlphaNumeric(value.replace(/ /g, ''));
}
validator.isJSON = function(json) {
    return ethUtil.solidityUtils.isJson(json);
}
validator.isValidURL = function(str) {
    var pattern = new RegExp('^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}
module.exports = validator;
