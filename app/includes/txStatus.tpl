<main class="tab-pane block--container active" ng-if="globalService.currentTab==globalService.tabs.txStatus.id" ng-controller='txStatusCtrl' role="main" ng-cloak>

  <!-- Section 3:  Unlock -->
  <section class="txstatus__3" ng-show="txInfo.status == txStatus.found">

    <br><br>

    <h1 class="text-center" translate="x_CancelReplaceTx">
      Cancel or Replace Transaction
    </h1>

    <section class="clearfix collapse-container">
      <div class="text-center" ng-click="wd = !wd">
        <a class="collapse-button"><span ng-show="wd">+</span><span ng-show="!wd">-</span></a>
        <h4 class="text-danger text-center">
          Unlock your wallet to replace your transaction. (But, please be careful)
        </h4>
      </div>
      <div ng-show="!wd">
         <wallet-decrypt-drtv></wallet-decrypt-drtv>         
      </div>
    </section>
  </section>
  <!-- / Section 3:  Unlock -->

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
