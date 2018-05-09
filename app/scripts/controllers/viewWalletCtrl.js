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
var viewWalletCtrl = function($scope, walletService) {

    $scope.pkeyVisible = false;

    walletService.wallet = null;
    walletService.password = '';
    $scope.$watch(function() {
        if (walletService.wallet == null) return null;
        return walletService.wallet.getAddressString();
    }, function() {
        if (walletService.wallet == null) return;
        $scope.wallet = walletService.wallet;
        $scope.wd = true;
        $scope.showEnc = walletService.password != '';
        if (walletService.wallet.type == "default") $scope.blob = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toJSON());
        if (walletService.password != '') {
            $scope.blobEnc = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toV3(walletService.password, {
                kdf: globalFuncs.kdf,
                n: globalFuncs.scrypt.n
            }));
            $scope.encFileName = $scope.wallet.getV3Filename();
        }
        $scope.wallet.setBalance();
    });
    $scope.printQRCode = function() {
        globalFuncs.printPaperWallets(JSON.stringify([{
            address: '0x'+$scope.wallet.pubToAddress(),
            private: '0x'+$scope.wallet.getPrivateKeyString().substring(0,64)+'\n'+$scope.wallet.getPrivateKeyString().substring(64,128)
        }]));
    }

    $scope.showHidePkey = function() {
        $scope.pkeyVisible = !$scope.pkeyVisible;
    }
    $scope.resetWallet = function() {
        $scope.wallet = null;
        walletService.wallet = null;
        walletService.password = '';
        $scope.blob = $scope.blobEnc = $scope.password = "";
    }
};
module.exports = viewWalletCtrl;
