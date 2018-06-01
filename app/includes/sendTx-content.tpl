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
 
<!-- Sidebar -->
<section class="col-sm-4">
  <wallet-balance-drtv></wallet-balance-drtv>
</section>
<!-- / Sidebar -->

<!-- Content -->
<div class="col-sm-8" >



  <!-- If unlocked with PK -->
  <article class="block" ng-hide="wallet.type=='addressOnly'" style="">


    <!-- To Address -->
    <div class="row form-group">
      <address-field placeholder="0xd2f5aa1eefc77d91d5bcb563e039d2c07be1a9ed0dd0851c189c50b5172635c1" var-name="tx.to"></address-field>
    </div>


    <!-- Amount to Send -->
    <section class="row form-group">

      <div class="col-sm-11">
        <label translate="SEND_amount">
          Amount to Send:
        </label>
      </div>

      <div class="col-sm-11">

        <div class="input-group">

          <input type="text"
                 class="form-control"
                 placeholder="{{ 'SEND_amount_short' | translate }}"
                 ng-model="tx.value"
                 ng-disabled="tx.readOnly || checkTxReadOnly"
                 ng-class="Validator.isPositiveNumber(tx.value) ? 'is-valid' : 'is-invalid'"/>

          <div class="input-group-btn">

            <button style="min-width: 170px;color:#fff;background-color:#4221cc "
               class="btn btn-default ">
                <strong>
                  AION
                </strong>
            </button>

          </div>

        </div>

      </div>

    </section>




    <!-- NRG Limit -->
    <section class="row form-group">
      <div class="col-sm-11 clearfix">
        <label translate="TRANS_gas">
          NRG Limit:
        </label>
        <input type="text"
               class="form-control"
               placeholder="21000"
               ng-model="tx.gasLimit"
               ng-change="gasLimitChanged=true"
               ng-disabled="tx.readOnly || checkTxReadOnly"
               ng-class="Validator.isPositiveNumber(tx.gasLimit) ? 'is-valid' : 'is-invalid'" />

      </div>
    </section>

    <!-- Advanced Option Panel -->
    <a ng-click="showAdvance=!showAdvance"
       ng-show='globalService.currentTab==globalService.tabs.sendTransaction.id'>
      <p class="strong" translate="TRANS_advanced">
        + Advanced: Add Data
      </p>
    </a>



    <div ng-show="showAdvance || checkTxPage">

      <!-- Data -->
      <section class="row form-group">
        <div class="col-sm-11 clearfix" >

          <label translate="TRANS_data"> Data: </label>

          <input type="text"
                 class="form-control"
                 placeholder="0x6d79657468657277616c6c65742e636f6d20697320746865206265737421"
                 ng-model="tx.data"

                 ng-class="Validator.isValidHex(tx.data) ? 'is-valid' : 'is-invalid'"/>

        </div>
      </section>

    </div>

    <div class="row form-group">
      <div class="col-xs-12 clearfix">
        <a class="btn btn-info btn-block"
           ng-click="generateTx()"
           translate="SEND_generate">
              Generate Transaction
        </a>
      </div>
    </div>

    <div class="row form-group" ng-show="rootScopeShowRawTx">

      <div class="col-sm-6">
        <label translate="SEND_raw">
          Raw Transaction
        </label>
        <textarea class="form-control" rows="4" readonly>{{rawTx}}</textarea>
      </div>

      <div class="col-sm-6">
        <label translate="SEND_signed">
          Signed Transaction
        </label>
        <textarea class="form-control" rows="4" readonly>{{signedTx.toString('hex')}}</textarea>
      </div>

    </div>

    <div class="clearfix form-group" ng-show="rootScopeShowRawTx">
      <a class="btn btn-primary btn-block col-sm-11 "
         data-toggle="modal"
         data-target="#sendTransaction"
         translate="SEND_trans"
         ng-click="parseSignedTx( rawTx)">
             Send Transaction
      </a>
    </div>


  </article>

</div>
<!-- / Content -->
