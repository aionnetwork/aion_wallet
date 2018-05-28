<!--/*******************************************************************************
 * Copyright (c) 2017-2018 Aion Foundation.
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
 *     You should have received a copy of the GNU General Public Li;/cense
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
 *     Aion Foundation.
 *     MyEtherWallet LLC
 *******************************************************************************/-->

<!DOCTYPE html>
<html lang="en" ng-app="mewApp">

<head>
<!--Load only the styles for the spinner to show while the app is loading-->
<style type="text/css">
  @charset "UTF-8";

  .pt-text-muted {
    color: #4221cc;
  }

  @-webkit-keyframes pt-spinner-animation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg); }
    to {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg); } }
  @keyframes pt-spinner-animation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg); }
    to {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg); } }

  .pt-spinner:not(.pt-svg-spinner) {
    width: 50px; }
    .pt-spinner:not(.pt-svg-spinner) .pt-spinner-svg-container {
      -webkit-animation-duration: 400ms;
              animation-duration: 400ms; }

  .pt-spinner path {
    stroke-width: 5; }

  .pt-spinner path {
    fill-opacity: 0; }

  .pt-spinner .pt-spinner-head {
    transition: stroke-dashoffset 200ms cubic-bezier(0.4, 1, 0.75, 0.9);
    stroke: rgba(92, 112, 128, 0.8);
    stroke-linecap: round; }

  .pt-spinner .pt-spinner-track {
    stroke: rgba(92, 112, 128, 0.2); }

  .pt-spinner:not(.pt-svg-spinner) {
    display: inline-block;
  }
  .pt-spinner:not(.pt-svg-spinner) .pt-spinner-svg-container {
    position: relative;
    width: 100%;
    height: 0;
    padding: 0;
    padding-bottom: 100%;
    -webkit-animation: pt-spinner-animation 400ms linear infinite;
            animation: pt-spinner-animation 400ms linear infinite;
  }
  .pt-spinner:not(.pt-svg-spinner) svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .pt-spinner.pt-intent-primary .pt-spinner-head {
    stroke: #4221cc; }
</style>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Aion Wallet</title>
<meta property="og:title" content="Aion Wallet">
<meta property="og:site_name" content="Aion Wallet">
<meta name="twitter:title" content="Aion Wallet">
<meta name="apple-mobile-web-app-title" content="Aion Wallet">
<link href="https://wallet.aion.network" rel="canonical">
<meta content="https://wallet.aion.network" property="og:url">
<meta content="https://wallet.aion.network" name="twitter:url">
<link rel="stylesheet" href="css/aionwallet-master.min.css">
<meta name="description" content="Aion Wallet lets users send AION to each other easily and securily">
<meta property="og:description"  content="Aion Wallet lets users send AION to each other easily and securily">
<meta name="twitter:description" content="Aion Wallet lets users send AION to each other easily and securily">
<meta name="robots" content="index,follow">
<meta name="googlebot" content="index,follow">
<meta name="google-site-verification" content="IpChQ00NYUQuNs_7Xs6xlnSdzalOlTUYbBsr8f7OpvM" />
<link href="images/fav/favicon.ico" rel="shortcut icon">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
<meta name="apple-mobile-web-app-title" content="Aion Wallet">
<meta name="application-name" content="Aion Wallet">
<meta name="msapplication-config" content="images/fav/browserconfig.xml">
<meta name="theme-color" content="#1d6986">
<meta name="apple-mobile-web-app-status-bar-style" content="#1d6986">
<meta property="og:url" content="https://aion.wallet.network" />
<meta property="og:title" content="Aion Wallet" />
<meta property="og:type" content="website">

</script>
</head>
<body>

  <div id="mySpinner" style="display: block;background: white;height: 100%;width: 100%;margin: 0;padding: 0;border: 0;">
    <div style="padding-top: 140px; text-align: center;">
      <div class="pt-spinner pt-intent-primary" style="display: inline-block;">
        <div class="pt-spinner-svg-container">
          <svg viewBox="0 0 100 100">
            <path class="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
            <path class="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
          </svg>
        </div>
      </div>
      <span class="pt-text-muted" style="display: block; margin-top: 20px; font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 300;">Loading Aion Wallet</span>

    </div>
  </div>

<div id="appMain" style="display : none">

<header class="{{curNode.name}} {{curNode.service}} {{curNode.service}} nav-index-{{gService.currentTab}}" aria-label="header" ng-controller='tabsCtrl' >
<section class="bg-gradient header-branding">
  <section class="container">



  <nav role="navigation" aria-label="main navigation" class="container nav-container overflowing" >
    <a aria-hidden="true" ng-show="showLeftArrow" class="nav-arrow-left" ng-click="scrollLeft(100);" ng-mouseover="scrollHoverIn(true,2);" ng-mouseleave="scrollHoverOut()">&#171;</a>
    <div class="nav-scroll">
      <ul class="nav-inner">
        <li ng-repeat="tab in tabNames track by $index" \
            class="nav-item {{tab.name}}" \
            ng-class="{active: $index==gService.currentTab}"
            ng-show="tab.mew"
            ng-click="tabClick($index)">
              <a tabindex="0" aria-label="nav item: {{tab.name | translate}}" translate="{{tab.name}}"></a>
        </li>
      </ul>
    </div>
    <a aria-hidden="true"
       ng-show="showRightArrow"
       class="nav-arrow-right"
       ng-click="scrollRight(100);"
       ng-mouseover="scrollHoverIn(false,2);"
       ng-mouseleave="scrollHoverOut()">&#187;</a>
  </nav>

    <a class="brand" href="./index.html" aria-label="Go to homepage">
      <img src="images/aion-logo.svg"   height="64px" width="150" style="margin: auto;" alt="Aion Wallet" /><span>TEST</span>
    </a>

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
          <button class="aion-button" ng-click="changeCurNode('aion'); dropCon= false">
            <label >Conquest Test Net</label></br>
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
            <button class="aion-button" ng-click="changeCurNode('other', currentIP, currentPort); dropCon=false">
              <label class="">
                Submit
              </label>
            </button>
          </div>

        </div>
      </ul>
    </span>

    <!--div class="status complete fade" ng-show="connectStatus"></div>
    <div class="status lost fade" ng-show="!connectStatus"></div-->

      <div class="status complete fade" ng-show="connectStatus">
      <span class="popover above">Connected</span>
    </div>
    <div class="status lost fade" ng-show="!connectStatus">
      <span class="popover above">Not Connected</span>
    </div>

  </nav>


  </section>
</section>

</header>
