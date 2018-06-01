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
