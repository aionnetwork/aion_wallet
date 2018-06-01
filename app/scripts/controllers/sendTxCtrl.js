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

var sendTxCtrl = function($scope, $sce, walletService, $rootScope) {

    $scope.tx = {};
    $scope.signedTx
    $scope.sendTxModal = new Modal(document.getElementById('sendTransaction'));
    walletService.wallet = null;
    walletService.password = '';
    $scope.showAdvance = false;
    $rootScope.rootScopeShowRawTx = false;
    $scope.dropdownEnabled = true;
    $scope.Validator = Validator;
    $scope.gasLimitChanged = false;
    $scope.tx.readOnly = globalFuncs.urlGet('readOnly') == null ? false : true;
    var currentTab = $scope.globalService.currentTab;
    var tabs = $scope.globalService.tabs;
    $scope.tokenTx = {
        to: '',
        value: 0,
        id: -1
    };

    $scope.tx = {
        // if there is no gasLimit or gas key in the URI, use the default value. Otherwise use value of gas or gasLimit. gasLimit wins over gas if both present
        gasLimit: "",
        data: "",
        to: "",
        value: "",
        nonce: null,
        gasPrice: "1",
    }

    var applyScope = function() {
        if (!$scope.$$phase) $scope.$apply();
    }

    $scope.$watch(function() {
        if (walletService.wallet == null) return null;
        return walletService.wallet.getAddressString();
    }, function() {
        if (walletService.wallet == null) return;
        $scope.wallet = walletService.wallet;
        $scope.wd = true;
        $scope.wallet.setBalance(applyScope);
    });



    var isEnough = function(valA, valB) {
        return new BigNumber(valA).lte(new BigNumber(valB));
    }

    $scope.hasEnoughBalance = function() {
        if ($scope.wallet.balance == 'loading') return false;
        return isEnough($scope.tx.value, $scope.wallet.balance);
    }

    $scope.generateTx = function() {

        if (!window.connectStatus){
            console.log("status "+window.connectStatus);
            uiFuncs.notifier.danger("You are not connected to a node, please connect to a functional node from the drop down menu"); 
            return;
        } 
        if (!$scope.Validator.isValidAddress($scope.tx.to)) {
            $scope.notifier.danger(globalFuncs.errorMsgs[5]);
            return;
        }


        var txData = uiFuncs.getTxData($scope);
        txData.gasPrice = $scope.tx.gasPrice ? '0x' + new BigNumber($scope.tx.gasPrice).toString(16) : null;
        txData.nonce = $scope.tx.nonce ? '0x' + new BigNumber($scope.tx.nonce).toString(16) : null;

        // set to true for offline tab and txstatus tab
        // on sendtx tab, it pulls gas price from the gasprice slider & nonce
        // if its true the whole txData object is set - don't try to change it
        // if false, replace gas price and nonce. gas price from slider. nonce from server.
        if (txData.gasPrice && txData.nonce) txData.isOffline = true;

        if (txData.value > window.balance){ 
            $scope.notifier.danger("you do not have enough balance in your account!");
            return;
        }

        uiFuncs.generateTx($scope, txData, function(rawTx) {
            if (!rawTx.isError) {
                $scope.rawTx = rawTx.rawTx;
                $scope.signedTx = rawTx.signedTx;
                $rootScope.rootScopeShowRawTx = true;
            } else {
                $rootScope.rootScopeShowRawTx = false;
                $scope.notifier.danger(rawTx.error);
            }
            if (!$scope.$$phase) $scope.$apply();            
        });
    }

    $scope.sendTx = function() {
        $scope.sendTxModal.close();
        uiFuncs.sendTx( $scope.signedTx, function(resp) {
            if (!resp.isError) {
                var completeMsg = '<p>' + globalFuncs.successMsgs[2] + '<strong>' + resp.data + '</strong></p>';
                $scope.notifier.success(completeMsg, 0);
                $scope.wallet.setBalance(applyScope);
            } else {
                $scope.notifier.danger(resp.error);
            }
        });
    }
    $scope.parseSignedTx = function( rawt ) {
      $scope.parsedSignedTx = {}
      var raw = JSON.parse (rawt);

      $scope.parsedSignedTx.balance       = $scope.wallet.getBalance();
      $scope.parsedSignedTx.from          = "0x"+walletService.wallet.pubToAddress();
      $scope.parsedSignedTx.to            = raw.RLP_TX_TO;
      $scope.parsedSignedTx.value         = raw.RLP_TX_VALUE;
      $scope.parsedSignedTx.timeStamp     = raw.RLP_TX_TIMESTAMP;
      $scope.parsedSignedTx.gasLimit      = raw.RLP_TX_NRG;
      $scope.parsedSignedTx.gasPrice      = raw.RLP_TX_NRGPRICE;     
      $scope.parsedSignedTx.nonce         = raw.RLP_TX_NONCE;
      $scope.parsedSignedTx.data          = raw.RLP_TX_DATA;
      $scope.parsedSignedTx.type          = raw.RLP_TX_TYPE;
    }

};
module.exports = sendTxCtrl;
