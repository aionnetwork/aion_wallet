'use strict';
require('./localStoragePolyfill');
var IS_CX = false;
if (typeof chrome != 'undefined') IS_CX = chrome.windows === undefined ? false : true;
var angular                  = require('angular');
var angularTranslate         = require('angular-translate');
var angularTranslateErrorLog = require('angular-translate-handler-log');
var angularSanitize          = require('angular-sanitize');
var angularAnimate           = require('angular-animate');

window.web3addr = "http://127.0.0.1:8545";
window.currentNode ="Default: localhost:8545";

window.connectStatus = true;

var marked                   = require('./staticJS/customMarked');
window.marked                = marked;
var BigNumber                = require('bignumber.js');
window.BigNumber             = BigNumber;
var ethUtil                  = require('ethereumjs-util');
ethUtil.crypto               = require('crypto');
ethUtil.Tx                   = require('ethereumjs-tx');
ethUtil.scrypt               = require('scryptsy');
ethUtil.uuid                 = require('uuid');
ethUtil.WAValidator          = require('wallet-address-validator');
window.ethUtil               = ethUtil;
var format                   = require('string-format');
window.format                = format;
var browser                  = require('detect-browser');
window.browser               = browser;
var Wallet                   = require('./myetherwallet');
window.Wallet                = Wallet;
var Web3Wallet               = require('./web3Wallet');
window.Web3Wallet            = Web3Wallet;
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
var onboardingCtrl            = require('./controllers/onboardingCtrl');
var decryptWalletCtrl        = require('./controllers/decryptWalletCtrl');
var viewWalletCtrl           = require('./controllers/viewWalletCtrl');
var txStatusCtrl              = require('./controllers/txStatusCtrl');
var sendTxCtrl               = require('./controllers/sendTxCtrl');
var signMsgCtrl              = require('./controllers/signMsgCtrl');
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
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|https|mailto):/);
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
app.controller('onboardingCtrl', ['$scope', onboardingCtrl]);
app.controller('decryptWalletCtrl', ['$scope', '$sce', 'walletService', decryptWalletCtrl]);
app.controller('viewWalletCtrl', ['$scope', 'walletService', viewWalletCtrl]);
app.controller('txStatusCtrl', ['$scope', txStatusCtrl]);
app.controller('sendTxCtrl', ['$scope', '$sce', 'walletService', '$rootScope', sendTxCtrl]);
app.controller('signMsgCtrl', ['$scope', '$sce', 'walletService', signMsgCtrl]);



