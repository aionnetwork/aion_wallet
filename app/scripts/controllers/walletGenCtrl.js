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
var walletGenCtrl = function($scope) {
    $scope.password = "";
    $scope.retypePassword = "";
    $scope.wallet = null;
    $scope.showWallet = false;
    $scope.blob = $scope.blobEnc = "";
    $scope.isDone = true;
    $scope.showPass = true;
    $scope.fileDownloaded = false;
    $scope.showPaperWallet = false;
    $scope.showGetAddress = false;
    $scope.genNewWallet = function() { 
        if (!$scope.isStrongPass() ) {
            $scope.notifier.danger(globalFuncs.errorMsgs[1]);
        }else if (!$scope.isRetypeMatch()){
            $scope.notifier.danger(globalFuncs.errorMsgs[40]);
        }
         else if ($scope.isDone) {
            $scope.wallet = $scope.blob = $scope.blobEnc = null;
            if (!$scope.$$phase) $scope.$apply();
            $scope.isDone = false;
            $scope.wallet = Wallet.generate(false);
            $scope.showWallet = true;

            var encodedFile = $scope.wallet.toV3($scope.password);

            $scope.blobEnc = globalFuncs.getBlob("application/octet-stream", encodedFile);

            $scope.encFileName = $scope.wallet.getV3Filename(); console.log("wallet control "+$scope.encFileName);
            if (parent != null)
                parent.postMessage(JSON.stringify({ address: $scope.wallet.getAddressString(), checksumAddress: $scope.wallet.getChecksumAddressString() }), "*");
            $scope.isDone = true;
            if (!$scope.$$phase) $scope.$apply();
        }
    }
    $scope.printQRCode = function() {        
        var pub = $scope.wallet.pubToAddress();
        var priv = $scope.wallet.getPrivateKeyString();

        globalFuncs.printPaperWallets(JSON.stringify([{
            address: '0x'+Buffer(pub,'hex').toString('hex'),
            private: '0x'+priv.substring(0,64)+'\n'+priv.substring(64,128)
        }]));
    }
    $scope.isStrongPass = function() {
        return globalFuncs.isStrongPass($scope.password);
    }
    $scope.isRetypeMatch = function() {
        return globalFuncs.isRetypeMatch($scope.password, $scope.retypePassword);
    }
    $scope.downloaded = function() {
        $scope.fileDownloaded = true;
    }
    $scope.continueToPaper = function() {
        $scope.showPaperWallet = true;
    }
    $scope.getAddress = function(){
        $scope.showPaperWallet = false;
        $scope.wallet = null;
        $scope.showGetAddress = true;
    }
};
module.exports = walletGenCtrl;
