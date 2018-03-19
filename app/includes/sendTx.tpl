<main class="tab-pane active"
      ng-if="globalService.currentTab==globalService.tabs.sendTransaction.id"
      ng-controller='sendTxCtrl'
      ng-cloak >

  <!-- Header : todo turn into warning notification-->
  <div class="alert alert-info" ng-show="hasQueryString">
    <p translate="WARN_Send_Link">
      You arrived via a link that has the address, amount, gas or data fields filled in for you. You can change any information before sending. Unlock your wallet to get started.
    </p>
  </div>


  <!-- Unlock Wallet -->
  <article class="collapse-container" >
    <div class="collapse-heading" ng-click="wd = !wd" sty>

      <h1 style="margin-bottom: 0">
        <img src="images/icons/small-logo.png" style="width: 50px;"/>
        Use Wallet
      </h1>
    </div>
    <div ng-show="!wd">
  <wallet-decrypt-drtv></wallet-decrypt-drtv>
    </div>
  </article>


  <!-- Send Tx Content -->
  <article class="row" ng-show="wallet!=null">
  
     @@include( './sendTx-content.tpl') 
     @@include( './sendTx-modal.tpl') 

  </article>


</main>
