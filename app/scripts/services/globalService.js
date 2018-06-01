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
 
'use strict'
var globalService = function($http, $httpParamSerializerJQLike) {

  var tabs = {
  generateWallet: {
    id: 0,
    name: "NAV_GenerateWallet_alt",
    url: "generate-wallet",
    mew: true,
    cx: false
  },
  myWallet: {
    id: 1,
    name: "NAV_MyWallets",
    url: "my-wallet",
    mew: false,
    cx: true
  },
  addWallet: {
    id: 2,
    name: "NAV_AddWallet",
    url: "add-wallet",
    mew: false,
    cx: true
  },
  sendTransaction: {
    id: 3,
    name: "NAV_SendAION",
    url: "send-transaction",
    mew: true,
    cx: true
  },
  signMsg: {
    id: 11,
    name: "NAV_SignMsg",
    url: "sign-message",
    mew: false,
    cx: false
  },
  bulkGenerate: {
    id: 12,
    name: "NAV_BulkGenerate",
    url: "bulk-generate",
    mew: false,
    cx: false
  }
}

if (!uiFuncs.kernelRunning) {
    tabs = {
    generateWallet: {
      id: 0,
      name: "NAV_GenerateWallet_alt",
      url: "generate-wallet",
      mew: true,
      cx: false
    },
    myWallet: {
      id: 1,
      name: "NAV_MyWallets",
      url: "my-wallet",
      mew: false,
      cx: true
    },
    addWallet: {
      id: 2,
      name: "NAV_AddWallet",
      url: "add-wallet",
      mew: false,
      cx: true
    },
    signMsg: {
      id: 11,
      name: "NAV_SignMsg",
      url: "sign-message",
      mew: false,
      cx: false
    },
    bulkGenerate: {
      id: 12,
      name: "NAV_BulkGenerate",
      url: "bulk-generate",
      mew: false,
      cx: false
    }
  }
}

  var currentTab = 0
  if(typeof chrome != 'undefined')
    currentTab = chrome.windows === undefined ? 0 : 3
  return {
    tabs: tabs,
    currentTab: currentTab
  }

  var tokensLoaded = false

}

module.exports = globalService


