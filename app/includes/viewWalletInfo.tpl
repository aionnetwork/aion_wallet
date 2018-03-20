<main class="tab-pane active" ng-if="globalService.currentTab==globalService.tabs.viewWalletInfo.id" ng-controller='viewWalletCtrl' ng-cloak>

  <article class="collapse-container">

    <div ng-click="wd = !wd">
      <a class="collapse-button">
      </a>
      <h1 translate="NAV_ViewWallet">
        View Wallet Details
      </h1>
    </div>

    <div ng-show="!wd">
      <wallet-decrypt-drtv></wallet-decrypt-drtv>
    </div>

  </article>

  <article class="row" ng-show="wallet!=null">

  @@include( './viewWalletInfo-content.tpl' ) 

  </article>

</main>
