<!--/*******************************************************************************
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
 *******************************************************************************/-->
<main class="tab-pane block--container active" ng-if="globalService.currentTab==globalService.tabs.txStatus.id"  role="main" ng-cloak>

 <!-- Send Tx Content -->
 <section class="row" ng-show="wallet!=null" ng-controller='sendTxCtrl'>
    <div ng-show="wallet.getChecksumAddressString() == txInfo.from">
       @@include( './sendTx-content.tpl') 

      @@include( './sendTx-modal.tpl') 

    </div>
    <div class="col-xs-12 block block--danger" ng-show="wallet.getChecksumAddressString()!=txInfo.from">
      <h5 translate="ENS_WrongAddress_2">
        Please unlock the wallet with address
      </h5>
      {{ txInfo.from }}
    </div>
  </section>
