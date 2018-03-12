<!DOCTYPE html>
<html lang="en" ng-app="mewApp">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Aion Wallet</title>
<meta property="og:title" content="MyEtherWallet.com: Your Key to Ethereum">
<meta property="og:site_name" content="MyEtherWallet.com: Your Key to Ethereum">
<meta name="twitter:title" content="MyEtherWallet.com: Your Key to Ethereum">
<meta name="apple-mobile-web-app-title" content="MyEtherWallet.com: Your Key to Ethereum">
<link href="https://www.myetherwallet.com" rel="canonical">
<meta content="https://www.myetherwallet.com" property="og:url">
<meta content="https://www.myetherwallet.com" name="twitter:url">
<link rel="stylesheet" href="css/etherwallet-master.min.css">
<script type="text/javascript" src="js/etherwallet-static.min.js"></script>
<script type="text/javascript" src="js/etherwallet-master.js"></script>
<meta name="description" content="MyEtherWallet (MEW) is a free, open-source, client-side interface for generating Ethereum wallets & more. Interact with the Ethereum blockchain easily & securely.">
<meta property="og:description"  content="Free, open-source, client-side Ethereum wallet. Enabling you to interact with the blockchain easily & securely.">
<meta name="twitter:description" content="Free, open-source, client-side Ethereum wallet. Enabling you to interact with the blockchain easily & securely.">
<meta name="robots" content="index,follow">
<meta name="googlebot" content="index,follow">
<meta name="google-site-verification" content="IpChQ00NYUQuNs_7Xs6xlnSdzalOlTUYbBsr8f7OpvM" />
<!-- <link href="images/fav/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180">
<link href="images/fav/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32">
<link href="images/fav/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16">
<link href="images/fav/manifest.json" rel="manifest">
<link href="images/fav/safari-pinned-tab.svg" rel="mask-icon" color="#2f99b0"> -->
<link href="images/fav/favicon.ico" rel="shortcut icon">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
<meta name="apple-mobile-web-app-title" content="MyEtherWallet &middot; Your Key to Ethereum">
<meta name="application-name" content="MyEtherWallet">
<meta name="msapplication-config" content="images/fav/browserconfig.xml">
<meta name="theme-color" content="#1d6986">
<meta name="apple-mobile-web-app-status-bar-style" content="#1d6986">
<meta property="og:url" content="https://www.myetherwallet.com" />
<meta property="og:title" content="MyEtherWallet.com  &middot; Your Key to Ethereum" />
<meta property="og:type" content="website">
<meta property="og:image" content="/images/logo-myetherwallet.png" />
<meta property="og:image" content="/images/myetherwallet-logo.png" />
<meta property="og:image" content="/images/myetherwallet-logo-square.png" />
<meta property="og:image" content="/images/myetherwallet-banner-fun.jpg" />
<meta name="twitter:image" content="/images/myetherwallet-logo-twitter.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@MyEtherWallet">
<meta name="twitter:creator" content="@MyEtherWallet">
<script type="application/ld+json">
{
"@context": "http://schema.org",
"@type" : "Organization",
"name" : "MyEtherWallet",
"legalName" : "MyEtherWallet LLC",
"url" : "https://www.myetherwallet.com/",
"contactPoint" : [{
  "@type" : "ContactPoint",
  "email" : "support@myetherwallet.com",
  "url"   : "https://myetherwallet.com",
  "contactType" : "customer service"
}],
"logo" : "https://www.myetherwallet.com/images/myetherwallet-logo.png",
"description": "MyEtherWallet.com is a free, open-source, client-side interface for generating Ethereum wallets &amp; more. Interact with the Ethereum blockchain easily &amp; securely.",
"sameAs" : [
  "https://www.myetherwallet.com/",
  "https://chrome.google.com/webstore/detail/myetherwallet-cx/nlbmnnijcnlegkjjpcfjclmcfggfefdm",
  "https://www.facebook.com/MyEtherWallet/",
  "https://twitter.com/myetherwallet",
  "https://medium.com/@myetherwallet",
  "https://myetherwallet.github.io/knowledge-base/",
  "https://github.com/kvhnuke/etherwallet",
  "https://github.com/MyEtherWallet",
  "https://kvhnuke.github.io/etherwallet/","https://myetherwallet.slack.com/"
]
}
</script>
</head>
<body>

<header class="{{curNode.name}} {{curNode.service}} {{curNode.service}} nav-index-{{gService.currentTab}}" aria-label="header" ng-controller='tabsCtrl' >
<!--
@@if (site === 'mew' ) {
  <div class="small announcement annoucement-danger">
    <div class="container">
      DON'T GET PHISHED, please! 🎣 Thank you! 🤗
      <br />
      1. BOOKMARK <a href="https://www.myetherwallet.com"> MYETHERWALLET.COM </a>
      <span class="hidden-xs">
        &nbsp;&nbsp;&nbsp;&nbsp;
        2. INSTALL <a href="https://chrome.google.com/webstore/detail/etheraddresslookup/pdknmigbbbhmllnmgdfalmedcmcefdfn" target="_blank" rel="noopener noreferrer">EAL</a>
        or
        <a href="https://myetherwallet.github.io/knowledge-base/migration/moving-from-private-key-to-metamask.html" target="_blank" rel="noopener noreferrer">MetaMask</a>
        or
        <a href="https://chrome.google.com/webstore/detail/cryptonite-by-metacert/keghdcpemohlojlglbiegihkljkgnige" target="_blank" rel="noopener noreferrer">Cryptonite</a>
      </span>
    </div>
  </div>
}
-->
<section class="bg-gradient header-branding">
  <section class="container">



  <nav role="navigation" aria-label="main navigation" class="container nav-container overflowing" >
    <a aria-hidden="true" ng-show="showLeftArrow" class="nav-arrow-left" ng-click="scrollLeft(100);" ng-mouseover="scrollHoverIn(true,2);" ng-mouseleave="scrollHoverOut()">&#171;</a>
    <div class="nav-scroll">
      <ul class="nav-inner">
        @@if (site === 'mew' ) {
        <li ng-repeat="tab in tabNames track by $index" \
            class="nav-item {{tab.name}}" \
            ng-class="{active: $index==gService.currentTab}"
            ng-show="tab.mew"
            ng-click="tabClick($index)">
              <a tabindex="0" aria-label="nav item: {{tab.name | translate}}" translate="{{tab.name}}"></a>
        </li>
        }
        @@if (site === 'cx' ) {
        <li ng-repeat="tab in tabNames track by $index" \
            class="nav-item {{tab.name}}" \
            ng-class="{active: $index==gService.currentTab}"
            ng-show="tab.cx"
            ng-click="tabClick($index)">
              <a tabindex="0" aria-label="nav item: {{tab.name | translate}}" translate="{{tab.name}}"></a>
        </li>
        }<!--
        <li class="nav-item help">
          <a href="https://myetherwallet.github.io/knowledge-base/" target="_blank" rel="noopener noreferrer">
            <span translate="NAV_Help">
              Help
            </span>
          </a>
        </li>-->
      </ul>
    </div>
    <a aria-hidden="true"
       ng-show="showRightArrow"
       class="nav-arrow-right"
       ng-click="scrollRight(100);"
       ng-mouseover="scrollHoverIn(false,2);"
       ng-mouseleave="scrollHoverOut()">&#187;</a>
  </nav>

  @@if (site === 'mew' ) {
    <a class="brand" href="./index.html" aria-label="Go to homepage">
      <img src="images/aion-logo.svg"   height="64px" width="150" style="margin: auto;" alt="Aion Wallet" /><span>TEST</span>
      <!-- <p class="small visible-xs">3.11.3.0</p> -->
    </a>
  }

  <nav class="nav-2">
    <span class="dropdown dropdown-gas" ng-cloak>
      <a tabindex="0" aria-haspopup="true" aria-label="adjust gas price" class="dropdown-toggle  btn btn-white" ng-click="dropCon = !dropCon">
        <span >Connection</span>: {{currentNode}}
        <i class="caret"></i>
      </a>
      <ul class="dropdown-menu" ng-show="dropCon">
        <div class="header--gas">
          <button ng-click="changeCurNode('default'); dropCon= false">
            <label class="default" >Default</label>
          </button>
          <button ng-click="changeCurNode('aion'); dropCon= false">
            <label >Aion Network</label></br>
          </button>

          <div class="input">
            <label ng-click="changeCurNode('other')">Custom</label>

            <form id="addr">
              <div>
                <span class="dark">IP:</span> <input type="text" ng-model="currentIP" ><br>
              </div>
              <div>
                <span class="dark">PORT:</span> <input type="text" ng-model="currentPort"><br>
              </div>
            </form>
            <button ng-click="changeCurNode('other', currentIP, currentPort); dropCon=false">
              <label>
                Submit
              </label>
            </button>
          </div>

        </div>
      </ul>
    </span>
    <!-- <span class="pt-navbar-divider"></span> -->
    <!-- <button type="button" class="btn btn-success" ng-show="checkConnect()">Connected</button> -->
    <div class="status complete fade" ng-show="checkConnect()"></div>
    <!-- <button type="button" class="btn btn-danger" ng-show="!checkConnect()">No Connection</button> -->
    <div class="status lost fade" ng-show="!checkConnect()"></div>
  </nav>

  <!-- @@if (site === 'cx' ) {
    <a class="brand" href="/cx-wallet.html" aria-label="Go to homepage">
      <img src="images/aion-logo.svg" height="64px" width="120px" alt="MyEtherWallet" />
      <p class="small visible-xs">3.11.3.0</p>
    </a> -->
    <!-- Warning: The separators you see on the frontend are in styles/etherwallet-custom.less. If you add / change a node, you have to adjust these. Ping tayvano if you're not a CSS wizard -->
    <!--
    <span class="dropdown dropdown-node" ng-cloak>
      <a tabindex="0"
         aria-haspopup="true"
         aria-label="change node. current node {{curNode.name}} node by {{curNode.service}}"
         class="dropdown-toggle  btn btn-white"
         ng-click="dropdownNode = !dropdownNode">

           <span translate="X_Network">Network:</span>
           {{curNode.name}}
           <small>({{curNode.service}})</small>
           <i class="caret"></i>-->
          <!--
            <span translate="X_Network">Network:</span>
           Aion
           <small>(aion.network)</small>
           <i class="caret"></i>-->
<!--
      </a>
      <ul class="dropdown-menu" ng-show="dropdownNode">
        <li ng-repeat="(key, value) in nodeList">
          <a ng-class="{true:'active'}[curNode == key]" ng-click="changeNode(key)">
            {{value.name}}
            <small> ({{value.service}}) </small>
            <img ng-show="value.service=='Custom'" src="images/icon-remove.svg" class="node-remove" title="Remove Custom Node" ng-click="removeNodeFromLocal(value.name)"/>
          </a>
        </li>
        <li>
          <a ng-click="customNodeModal.open(); dropdownNode = !dropdownNode;" translate="X_Network_Custom">
            Add Custom Network / Node
          </a>
        </li>
      </ul>
    </span>
-->

  </section>
</section>



@@if (site === 'mew' ) { @@include( './header-node-modal.tpl', { "site": "mew" } ) }
@@if (site === 'cx'  ) { @@include( './header-node-modal.tpl', { "site": "cx"  } ) }

</header>
