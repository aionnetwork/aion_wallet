'use strict';
var decryptWalletCtrl = function($scope, $sce, walletService) {
    $scope.walletType = "";
    $scope.requireFPass = $scope.requirePPass = $scope.showFDecrypt = $scope.showPDecrypt = $scope.showAOnly = $scope.showParityDecrypt = false; 
    $scope.filePassword = "";
    $scope.fileContent = "";
    $scope.Validator = Validator;
    $scope.isSSL = window.location.protocol == 'https:';
    
    $scope.showContent = function($fileContent) {
        $scope.notifier.info(globalFuncs.successMsgs[4] + document.getElementById('fselector').files[0].name);
        try {
            //$scope.requireFPass = Wallet.walletRequirePass($fileContent);
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
        $scope.wallet = null;
        try {
            if ($scope.showPDecrypt && $scope.requirePPass) {
                $scope.wallet = Wallet.fromMyEtherWalletKey($scope.manualprivkey, $scope.privPassword);
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
                console.log("$scope.fileContent: ", $scope.fileContent);
                $scope.wallet = Wallet.fromV3($scope.fileContent, $scope.filePassword, true);
                walletService.password = $scope.filePassword;
            } else if ($scope.showMDecrypt) {
                $scope.mnemonicModel = new Modal(document.getElementById('mnemonicModel'));
                $scope.mnemonicModel.open();
                $scope.onHDDPathChange($scope.mnemonicPassword);
            } else if ($scope.showParityDecrypt) {
                $scope.wallet = Wallet.fromParityPhrase($scope.parityPhrase);
            }
            walletService.wallet = $scope.wallet;
        } catch (e) {
            $scope.notifier.danger(globalFuncs.errorMsgs[6] + e);
        }
        if ($scope.wallet != null) $scope.notifier.info(globalFuncs.successMsgs[1]);
        $scope.wallet.type = "default";
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
                //setTokens: tempWallet.setTokens
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
