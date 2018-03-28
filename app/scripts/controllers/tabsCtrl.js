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

var tabsCtrl = function($scope, globalService, $translate, $sce, $http) {
    $scope.gService = globalService;
    $scope.tabNames = $scope.gService.tabs;
    $scope.curLang = 'English';
    $scope.customNodeModal = document.getElementById('customNodeModal') ? new Modal(document.getElementById('customNodeModal')) : null;
    $scope.Validator = Validator;

    $scope.gasPriceMsg = false;
    $scope.browserProtocol = window.location.protocol;
    var hval = window.location.hash;
    $scope.notifier = uiFuncs.notifier;
    $scope.notifier.sce = $sce;
    $scope.notifier.scope = $scope;

    const AionWeb3 = require('../aionWeb3/lib/web3.js');
   
	var connect = function(){

	    var data = {
	    	"jsonrpc":"2.0",
	    	"method":"eth_blockNumber",
	    	"params":[],
	    	"id":83};

		$http.post(window.web3addr, data).then(
			function (response){
				console.log("data "+response);
				window.connectStatus = true;
                $scope.connectStatus= true;
            },
			function (response){
				console.log("error "+response);
				window.connectStatus = false;
                $scope.connectStatus= false;
			});
	}
	connect();
	setInterval(connect, 4000);




    $scope.currentNode= window.currentNode;
    $scope.currentIP="127.0.0.1";
    $scope.currentPort= "8545";

    $scope.changeCurNode= function (node, ip, port){
        var protocol ="http://";

        if (node == "default"){
            $scope.currentIP="127.0.0.1";
            $scope.currentPort="8545";
            $scope.currentNode = "Default";
            protocol ="http://";
        } else if (node == "aion"){
            $scope.currentIP="web3.aion.network";
            $scope.currentPort="443";
            $scope.currentNode = "Aion Test Net";
            protocol ="https://";
        } else if (node == "other"){
            if (ip) $scope.currentIP=ip;
            if (port)$scope.currentPort=port;
            $scope.currentNode = ip+":"+port;
            protocol ="http://";
        }else {

        }
        window.web3addr=protocol+$scope.currentIP+":"+$scope.currentPort;
    }

    $scope.setArrowVisibility = function() {
        setTimeout(function() {
            if (document.querySelectorAll('.nav-inner')[0] && document.querySelectorAll('.nav-scroll')[0]) {
                $scope.showLeftArrow = false;
                $scope.showRightArrow = !(document.querySelectorAll('.nav-inner')[0].clientWidth <= document.querySelectorAll('.nav-scroll')[0].clientWidth);
                $scope.$apply();
            }
        }, 200);
    }
    $scope.setArrowVisibility();

    $scope.tabClick = function(id) {
        globalService.tokensLoaded = false
        $scope.activeTab = globalService.currentTab = id;
        for (var key in $scope.tabNames) {
            if ($scope.tabNames[key].id == id) location.hash = $scope.tabNames[key].url;
        }
    }


    angular.element(document.querySelectorAll('.nav-scroll')[0]).bind('scroll', $scope.setOnScrollArrows);
    globalFuncs.changeHash = $scope.setHash;

	
};
module.exports = tabsCtrl;
