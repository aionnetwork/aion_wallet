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

//this file is the beginnig of the whole project, everything is being included here
'use strict';
require('./localStoragePolyfill');
var angular                  = require('angular');
var angularTranslate         = require('angular-translate');
var angularTranslateErrorLog = require('angular-translate-handler-log');
var angularSanitize          = require('angular-sanitize');
var angularAnimate           = require('angular-animate');

window.web3addr = "http://127.0.0.1:8545";
window.currentNode ="Default: localhost:8545";

window.connectStatus = true;
window.balance ="Not Connected";

var marked                   = require('./staticJS/customMarked');
window.marked                = marked;
var BigNumber                = require('bignumber.js');
window.BigNumber             = BigNumber;
var ethUtil                  = require('ethereumjs-util');
ethUtil.crypto               = require('crypto');
ethUtil.Tx                   = require('ethereumjs-tx');
ethUtil.scrypt               = require('scryptsy');
ethUtil.WAValidator          = require('wallet-address-validator');
window.ethUtil               = ethUtil;
var format                   = require('string-format');
window.format                = format;
var browser                  = require('detect-browser');
window.browser               = browser;
var Wallet                   = require('./aionwallet');
window.Wallet                = Wallet;
var globalFuncs              = require('./globalFuncs');
window.globalFuncs           = globalFuncs;
var uiFuncs                  = require('./uiFuncs');
window.uiFuncs               = uiFuncs;
var ethFuncs                 = require('./ethFuncs');
window.ethFuncs              = ethFuncs;
var Validator                = require('./validator');
window.Validator             = Validator;
var translate                = require('./translations/translate.js');

var tabsCtrl                 = require('./controllers/tabsCtrl');
var viewCtrl                 = require('./controllers/viewCtrl');
var walletGenCtrl            = require('./controllers/walletGenCtrl');
var decryptWalletCtrl        = require('./controllers/decryptWalletCtrl');
var viewWalletCtrl           = require('./controllers/viewWalletCtrl');
var sendTxCtrl               = require('./controllers/sendTxCtrl');
var globalService            = require('./services/globalService');
var walletService            = require('./services/walletService');
var blockiesDrtv             = require('./directives/blockiesDrtv');
var addressFieldDrtv         = require('./directives/addressFieldDrtv');
var QRCodeDrtv               = require('./directives/QRCodeDrtv');
var walletDecryptDrtv        = require('./directives/walletDecryptDrtv');
var fileReaderDrtv           = require('./directives/fileReaderDrtv');
var balanceDrtv              = require('./directives/balanceDrtv');

var app = angular.module('mewApp', ['pascalprecht.translate', 'ngSanitize','ngAnimate']);
app.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|https|mailto|file):/);
}]);
app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.useMissingTranslationHandlerLog();
  new translate($translateProvider);
}]);
app.config(['$animateProvider', function($animateProvider) {
    $animateProvider.classNameFilter(/^no-animate$/);
}]);
app.factory('globalService', ['$http', '$httpParamSerializerJQLike', globalService]);
app.factory('walletService', walletService);
app.directive('blockieAddress', blockiesDrtv);
app.directive('addressField', ['$compile', addressFieldDrtv]);
app.directive('qrCode', QRCodeDrtv);
app.directive('onReadFile', fileReaderDrtv);
app.directive('walletBalanceDrtv', balanceDrtv);
app.directive('walletDecryptDrtv', walletDecryptDrtv);
app.controller('tabsCtrl', ['$scope', 'globalService', '$translate', '$sce', '$http', tabsCtrl]);
app.controller('viewCtrl', ['$scope', 'globalService', '$sce', viewCtrl]);
app.controller('walletGenCtrl', ['$scope', walletGenCtrl]);
app.controller('decryptWalletCtrl', ['$scope', '$sce', 'walletService', decryptWalletCtrl]);
app.controller('viewWalletCtrl', ['$scope', 'walletService', viewWalletCtrl]);
app.controller('sendTxCtrl', ['$scope', '$sce', 'walletService', '$rootScope', sendTxCtrl]);



