<!-- Sidebar -->
<section class="col-sm-4">
  <wallet-balance-drtv></wallet-balance-drtv>
</section>
<!-- / Sidebar -->

<!-- Content -->
<div class="col-sm-8" >


  <!-- If unlocked with address only -->
  <article class="block" ng-show="wallet.type=='addressOnly'" style="background: #12364c;
      color: #fff;
      border: 2px solid #2bc0ec;">
    <div class="row form-group">
      <h4 translate="SEND_ViewOnly">
        You cannot send with only your address. You must use one of the other options to unlock your wallet in order to send.
      </h4>
      <h5 translate="X_HelpfulLinks">
        Helpful Links &amp; FAQs
      </h5>
      <ul>
        <li class="u__protip">
          <a href="https://myetherwallet.github.io/knowledge-base/getting-started/accessing-your-new-eth-wallet.html"
             target="_blank"
             rel="noopener noreferrer"
             translate="X_HelpfulLinks_1">
                How to Access your Wallet
          </a>
        </li>
        <li class="u__protip">
          <a href="https://myetherwallet.github.io/knowledge-base/private-keys-passwords/lost-eth-private-key.html"
             target="_blank"
             rel="noopener noreferrer"
             translate="X_HelpfulLinks_2">
                I lost my private key
          </a>
        </li>
        <li class="u__protip">
          <a href="https://myetherwallet.github.io/knowledge-base/private-keys-passwords/accessing-different-address-same-private-key-ether.html"
             target="_blank"
             rel="noopener noreferrer"
             translate="X_HelpfulLinks_3">
                My private key opens a different address
          </a>
        </li>
        <li class="u__protip">
          <a href="https://myetherwallet.github.io/knowledge-base/migration/"
             target="_blank"
             rel="noopener noreferrer"
             translate="X_HelpfulLinks_4">
                Migrating to/from MyEtherWallet
          </a>
        </li>
      </ul>
    </div>
  </article>



  <!-- If unlocked with PK -->
  <article class="block" ng-hide="wallet.type=='addressOnly'" style="background: #12364c;
      color: #fff;
      border: 2px solid #2bc0ec;">


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

            <button style="min-width: 170px"
               class="btn btn-default">
                <strong>
                  AION
                </strong>
            </button>

          </div>

        </div>

      </div>

    </section>




    <!-- Gas Limit -->
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
                 ng-disabled="tx.readOnly || checkTxReadOnly"
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
      <a class="btn btn-primary btn-block col-sm-11"
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
