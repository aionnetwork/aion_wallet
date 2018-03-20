'use strict';
var txStatusCtrl = function($scope) {
    $scope.Validator = Validator;
    $scope.checkTxPage = false;
    $scope.checkTxReadOnly = true;
    $scope.txStatus = {
        found: 0,
        notFound: 1,
        mined: 2
    }
    var MIN_GAS = 41;
    $scope.txInfo = {
        status: null, // notFound foundInPending foundOnChain
        hash: globalFuncs.urlGet('txHash') == null ? "" : globalFuncs.urlGet('txHash'),
        from: '',
        to: '',
        value: '',
        valueStr: '',
        gasLimit: '',
        gasPrice: '',
        data: '',
        nonce: ''
    }

    var applyScope = function() {
        if (!$scope.$$phase) $scope.$apply();
    }
    $scope.checkTxStatus = function() {
        var txInfo = $scope.txInfo;
        try {
            if (!Validator.isValidTxHash(txInfo.hash)) throw globalFuncs.errorMsgs[36];
            ajaxReq.getTransaction(txInfo.hash, function(data) {
                if (data.error) $scope.notifier.danger(data.msg);
                else {
                    txToObject(data.data);
                }
            });
        } catch (e) {
            $scope.notifier.danger(e);
        }
    }

    globalFuncs.urlGet('txHash') == null ? '' : $scope.checkTxStatus();

};
module.exports = txStatusCtrl;
