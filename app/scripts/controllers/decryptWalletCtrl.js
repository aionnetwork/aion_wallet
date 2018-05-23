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
const RLP = require('../RLPlib.js');

var decryptWalletCtrl = function($scope, $sce, walletService) {
    $scope.walletType = "";
    $scope.requireFPass = $scope.requirePPass = $scope.showFDecrypt = $scope.showPDecrypt = $scope.showAOnly = $scope.showParityDecrypt = false; 
    $scope.filePassword = "";
    $scope.fileContent = "";
    $scope.Validator = Validator;
    $scope.isSSL = window.location.protocol == 'https:';
    $scope.kernelKeystore = false; 
    
    $scope.showContent = function($fileContent) {
        $scope.notifier.info(globalFuncs.successMsgs[4] + document.getElementById('fselector').files[0].name);
        try {
            $scope.requireFPass = true;
            $scope.showFDecrypt = !$scope.requireFPass;
            $scope.fileContent = $fileContent;
        } catch (e) {
            $scope.notifier.danger(e);
        }
    };
    $scope.openFileDialog = function($fileContent) {
        $scope.showAOnly = false;
        document.getElementById('fselector').click();
    };
    $scope.onFilePassChange = function() {
        $scope.showAOnly = false;
        $scope.showFDecrypt = $scope.filePassword.length >= 0;
    };
    $scope.onPrivKeyChange = function() {
        $scope.showAOnly = false;
        var manualprivkey = fixPkey($scope.manualprivkey);
        if ($scope.manualprivkey.substring(0,2)=='0x'){
             manualprivkey = fixPkey($scope.manualprivkey.substring(2));
        }

        $scope.showPDecrypt = (manualprivkey.length == 128); // show when the length is 128
        $scope.requirePPass = (manualprivkey.length != 128); 
    };
    $scope.onPrivKeyPassChange = function() {
        $scope.showAOnly = false;
        $scope.showPDecrypt = $scope.privPassword.length > 0;
    };
    $scope.onAddressChange = function() {
        $scope.requireFPass = $scope.requirePPass = $scope.showFDecrypt = $scope.showPDecrypt = $scope.showParityDecrypt = false;
        $scope.showAOnly = $scope.Validator.isValidAddress($scope.addressOnly);
    };
    $scope.decryptWallet = function() {
        $scope.kernelKeystore = true;
        setTimeout (function (){
            $scope.wallet = null;
            try {
                if ($scope.showPDecrypt && $scope.requirePPass) {
                    $scope.wallet = Wallet.fromAionWalletKey($scope.manualprivkey, $scope.privPassword);
                    walletService.password = $scope.privPassword;
                } else if ($scope.showPDecrypt && !$scope.requirePPass) {
                
                    if (!$scope.Validator.isValidHex($scope.manualprivkey)) {
                        $scope.notifier.danger(globalFuncs.errorMsgs[37]);
                        return;
                    }
                    var temp = fixPkey($scope.manualprivkey);
                    $scope.wallet = new Wallet(temp, temp.substring(64,temp.length));
                    walletService.password = '';
                } else if ($scope.showFDecrypt) {
                    
                    //if (RLP.decode($scope.fileContent).length ==4) {console.log("here"); $scope.kernelKeystore = true;}                    
                    $scope.wallet = Wallet.fromV3($scope, $scope.fileContent, $scope.filePassword, true);
                    $scope.kernelKeystore = false;
                    walletService.password = $scope.filePassword;
                }
                walletService.wallet = $scope.wallet;
            } catch (e) {
                $scope.kernelKeystore = false;
                $scope.notifier.danger(globalFuncs.errorMsgs[6] + e);
            }
            if ($scope.wallet != null) $scope.notifier.info(globalFuncs.successMsgs[1]);
            $scope.wallet.type = "default";
            $scope.kernelKeystore = false;
        },10);
    };
    $scope.decryptAddressOnly = function() {
        if ($scope.Validator.isValidAddress($scope.addressOnly)) {
            var tempWallet = new Wallet();
            $scope.wallet = {
                type: "addressOnly",
                address: $scope.addressOnly,
                getAddressString: function() {
                    return this.address;
                },
                getChecksumAddressString: function() {
                    return ethUtil.toChecksumAddress(this.getAddressString());
                },
                setBalance: tempWallet.setBalance,
            }
            $scope.notifier.info(globalFuncs.successMsgs[1]);
            walletService.wallet = $scope.wallet;
        }
    }
    // helper function that removes 0x prefix from strings
    function fixPkey(key) {
        if (key.indexOf('0x') === 0) {
            return key.slice(2);
        }
        return key;
    }
};
module.exports = decryptWalletCtrl;
