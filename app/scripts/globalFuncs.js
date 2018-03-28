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
var globalFuncs = function() {}
globalFuncs.lightMode = false;
globalFuncs.getBlockie = function(address) {
    return blockies.create({
        seed: address.toLowerCase(),
        size: 8,
        scale: 16
    }).toDataURL();
};
globalFuncs.printPaperWallets = function(strJson) {
    var win = window.open("about:blank", "_blank");
    var data = "<html>\r\n\r\n<head>\r\n <link rel=\"stylesheet\" href=\"css\/aionwallet-master.min.css\" \/>\r\n <script type=\"text\/javascript\" src=\"js\/jquery-1.12.3.min.js\"><\/script>\r\n <script type=\"text\/javascript\" src=\"js\/aionwallet-static.min.js\"><\/script>\r\n <script type=\"text\/javascript\">\r\n function getBlockie(address) {\r\n return blockies.create({\r\n seed: address.toLowerCase(),\r\n size: 8,\r\n scale: 16\r\n }).toDataURL();\r\n    }\r\n    function generateWallets() {\r\n var json = JSON.parse($(\"#printwalletjson\").html());\r\n for (var i = 0; i < json.length; i++) {\r\n var walletTemplate = $(\'<div\/>\').append($(\"#print-container\").clone());\r\n new QRCode($(walletTemplate).find(\"#paperwalletaddqr\")[0], {\r\n text: json[i][\'address\'],\r\n colorDark: \"#000000\",\r\n colorLight: \"#ffffff\",\r\n correctLevel: QRCode.CorrectLevel.H\r\n });\r\n new QRCode($(walletTemplate).find(\"#paperwalletprivqr\")[0], {\r\n text: json[i][\'private\'],\r\n colorDark: \"#000000\",\r\n colorLight: \"#ffffff\",\r\n correctLevel: QRCode.CorrectLevel.H\r\n });\r\n $(walletTemplate).find(\"#paperwalletadd\").html(json[i][\'address\']);\r\n $(walletTemplate).find(\"#paperwalletpriv\").html(json[i][\'private\']);\r\n walletTemplate = $(walletTemplate).find(\"#print-container\").show();\r\n $(\"body\").append(walletTemplate);\r\n }\r\n setTimeout(function() {\r\n window.print();\r\n }, 2000);\r\n    }\r\n    <\/script>\r\n<\/head>\r\n\r\n<body><span id=\"printwalletjson\" style=\"display: none;\">{{WALLETJSON}}<\/span>\r\n    <div class=\"print-container\" style=\"display: none; margin-bottom: 50px;\" id=\"print-container\"><img src=\"images\/logo-aion-1.png\" class=\"ether-logo-1\" height=\"100%\" width=\"auto\" \/> <img src=\"images\/print-sidebar.png\" height=\"100%\" width=\"auto\" class=\"print-title\" \/>\r\n <div class=\"print-qr-code-1\">\r\n <div id=\"paperwalletaddqr\"><\/div>\r\n <p class=\"print-text\" style=\"padding-top: 25px;\">YOUR ADDRESS<\/p>\r\n <\/div>\r\n <div class=\"print-notes\"><img src=\"images\/notes-bg.png\" width=\"90%;\" height=\"auto\" class=\"pull-left\" \/>\r\n <p class=\"print-text\">AMOUNT \/ NOTES<\/p>\r\n <\/div>\r\n <div class=\"print-qr-code-2\">\r\n <div id=\"paperwalletprivqr\"><\/div>\r\n <p class=\"print-text\" style=\"padding-top: 30px;\">YOUR PRIVATE KEY<\/p>\r\n <\/div> <div class=\"print-address-container\">\r\n <p><strong>Your Address:<\/strong>\r\n <br \/><span id=\"paperwalletadd\"><\/span><\/p>\r\n <p><strong>Your Private Key:<\/strong>\r\n <br \/><span id=\"paperwalletpriv\"><\/span><\/p>\r\n <\/div>\r\n    <\/div>\r\n<\/body>\r\n\r\n<\/html>\r\n";
    data = data.replace("{{WALLETJSON}}", strJson);
    win.document.write(data);
    win.document.write("<script>generateWallets();</script>");
};
globalFuncs.getBlob = function(mime, str) {    
    console.log("getBlob: ", mime);
    console.log("getBlob: ", str);
    if (str == null) return '';
    var blob = new Blob([str], {
        type: mime
    }); 
    return window.URL.createObjectURL(blob);
};
globalFuncs.getSuccessText = function(str) {
    return '<p class="text-center text-success"><strong> ' + str + '</strong></p>'
};
globalFuncs.getDangerText = function(str) {
    return '<p class="text-center text-danger"><strong> ' + str + '</strong></p>'
};

// These are translated in the translation files
globalFuncs.errorMsgs = [
    'Please enter a valid amount.', // 0
    'Your password must be at least 9 characters. Please ensure it is a strong password. ', // 1
    'Sorry! We don\'t recognize this type of wallet file. ', // 2
    'This is not a valid wallet file. ', // 3
    'This unit doesn\'t exists, please use the one of the following units ', // 4
    'Please enter a valid address. ', // 5
    'Please enter a valid password. ', // 6
    'Please enter valid decimals (Must be integer, 0-18). ', // 7
    'Please enter a valid NRG limit (Must be integer. Try 21000-4000000). ', // 8
    'Please enter a valid data value (Must be hex). ', // 9
    'Please enter a valid NEG price. ', // 10 - NOT USED
    'Please enter a valid nonce (Must be integer).', // 11
    'Invalid signed transaction. ', // 12
    'A wallet with this nickname already exists. ', // 13
    'Wallet not found. ', // 14
    'Whoops. It doesn\'t look like a proposal with this ID exists yet or there is an error reading this proposal. ', // 15 - NOT USED
    'A wallet with this address already exists in storage. Please check your wallets page. ', // 16
    '(error_17) Insufficient balance.', // 17
    'All NRG would be used on this transaction. This means you have already voted on this proposal or the debate period has ended.', // 18
    'Please enter a valid symbol', // 19
    'Not a valid ASC-20 token', // 20
    'Could not estimate NRG.', // 21
    'Please enter valid node name', // 22
    'Enter valid URL. If you are on https, your URL must be https', // 23
    'Please enter a valid port. ', // 24
    'Please enter a valid chain ID. ', // 25
    'Please enter a valid ABI. ', // 26
    'Minimum amount: 0.01. Max amount: ', // 27
    'You need this `Keystore File + Password` or the `Private Key` (next page) to access this wallet in the future. ', // 28
    'Please enter a valid user and password. ', // 29
    'Please enter a valid name (7+ characters, limited punctuation) ', // 30
    'Please enter a valid secret phrase. ', // 31
    'Could not connect to the node. Refresh your page, try a different node (top-right corner), check your firewall settings. If custom node, check your configs.', // 32
    'The wallet you have unlocked does not match the owner\'s address. ', // 33
    'The name you are attempting to reveal does not match the name you have entered. ', // 34
    'Input address is not checksummed.', // 35
    'Please enter valid TX hash', // 36
    'Please enter valid hex string. Hex only contains: 0x, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, a, b, c, d, e, f', // 37
    'Offer must have either price or reserve set to more than 0', // 38
    'Bid must be more than the specified minimum', // 39
    'Your password and re-typed password do not match!' // 40
];

// These are translated in the translation files
globalFuncs.successMsgs = [
    'Valid address',
    'Wallet successfully decrypted',
    'Transaction submitted. TX Hash: ',
    'Your wallet was successfully added: ',
    'File Selected: ',
    'You are connected to the node ',
    'Message Signature Verified'
];

globalFuncs.scrypt = {
    n: 1024
};
globalFuncs.postDelay = 300;
globalFuncs.kdf = "scrypt";
globalFuncs.defaultTxGasLimit = 21000;
globalFuncs.defaultTokenGasLimit = 200000;
globalFuncs.donateAddress = "0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8";
globalFuncs.isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
globalFuncs.urlGet = function(name) {
    name = name.toLowerCase();
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search.toLowerCase())) return this.stripTags(decodeURIComponent(name[1]));
};
globalFuncs.stripTags = function(str) {
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/;
    while (SCRIPT_REGEX.test(str)) {
        str = str.replace(SCRIPT_REGEX, "");
    }
    return str;
};

globalFuncs.isStrongPass = function(password) {
    return password.length > 8;
};
globalFuncs.isRetypeMatch = function(password, retype) {
    return password == retype;
};

globalFuncs.hexToAscii = function(hex) {
    return hex.match(/.{1,2}/g).map(function(v) {
        return String.fromCharCode(parseInt(v, 16));
    }).join('');
};
globalFuncs.isAlphaNumeric = function(value) {
    return !/[^a-zA-Z0-9]/.test(value);
};
globalFuncs.getRandomBytes = function(num) {
    return ethUtil.crypto.randomBytes(num);
};

globalFuncs.localStorage = {
    isAvailable: function() {
        // return typeof localStorage != "undefined";
        // return globalFuncs.storageAvailable('localStorage');

        // Polyfilled if not available/accessible
        return true;
    },
    setItem: function(key, value) {
        if (this.isAvailable()) {
            localStorage.setItem(key, value);
        } else {
            // console.log("localStorage is available? " + this.isAvailable());
        }
    },
    getItem: function(key, dValue = "") {
        if (this.isAvailable()) {
            return localStorage.getItem(key);
        } else {
            return dValue;
        }
    }
};


module.exports = globalFuncs;
