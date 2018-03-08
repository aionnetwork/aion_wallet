<main class="tab-pane block--container active"
      ng-if="globalService.currentTab==globalService.tabs.generateWallet.id"
      ng-controller='walletGenCtrl'
      role="main"
      ng-cloak>

  <article class="block__wrap gen__1" ng-show="!wallet && !showGetAddress">

    <section class="block__main gen__1--inner">
      <br />
      <div class="left">
        <div class="stage">Create an Aion Wallet</div>
        <div class="stage active">
          <h5>1</h5>
          <p>Create Password</p>
          <ul class="info">
              <li>
                <a href="./helpPages/HowToCreateWallet.html"
                target="_blank"
                rel="noopener noreferrer"
                translate="GEN_Help_5">
                How to Create a Wallet
              </a>
              </li>
              <li>
                <a href="./helpPages/GettingStarted.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  translate="GEN_Help_6">
                  Getting Started
                </a>
              </li>
              <!-- &nbsp;&nbsp;&middot;&nbsp;&nbsp; -->
              <!-- <br/> -->
          </ul>
        </div>
        <div class="stage">
          <h5>2</h5>
          <p>Keystore Backup</p>
        </div>
        <div class="stage">
          <h5>3</h5>
          <p>Private Key</p>
        </div>
      </div>
      <div class="right flex">
        <div class="info">
          <h1>
            Create a Password
          </h1>
          <p translate="x_PasswordDesc"></p>
        </div>
        <div>
          <h4 translate="GEN_Label_1" style="margin: 0">
            Enter password
          </h4>
          <div class="input-group">
            <input name="password"
            class="form-control"
            type="{{showPass && 'password' || 'text'}}"
            placeholder="{{'GEN_Placeholder_1' | translate }}"
            ng-model="password"
            ng-class="isStrongPass() ? 'is-valid' : 'is-invalid'"
            aria-label="{{'GEN_Label_1' | translate}}"/>
            <span tabindex="0"
            aria-label="make password visible"
            role="button"
            class="input-group-addon eye"
            ng-click="showPass=!showPass">
          </span>
        </div>
      </div>
      <a tabindex="0"
        role="button"
        class="btn btn-primary"
        ng-click="genNewWallet()"
        translate="NAV_GenerateWallet"
        style="margin: 0 auto">
        Generate Wallet
      </a>
      </div>
      <br>
    </section>

  </article>


  <article role="main" class="block__wrap gen__2" ng-show="wallet && !showPaperWallet" > <!-- -->

    <section class="block__main gen__2--inner">
      <br />
      <div class="left">
        <div class="stage">Create an Aion Wallet</div>
        <div class="stage">
          <h5>1</h5>
          <p>Create Password</p>
        </div>
        <div class="stage active">
          <h5>2</h5>
          <p>Keystore Backup</p>
          <ul class="info">
            <li>
              <a href="./helpPages/HowToBackUpYourKeystore.html" target="_blank" rel="noopener noreferrer" translate="GEN_Help_13">
                How to Back Up Your Keystore File
              </a>
            </li>
            <li>
              <a href="./helpPages/DifferenceBetweenWallets.html" target="_blank" translate="GEN_Help_14">
                What are these Different Formats?
              </a>
            </li>
          </ul>
        </div>
        <div class="stage">
          <h5>3</h5>
          <p>Private Key</p>
        </div>
      </div>
      <div class="right flex">
        <div class="info">
          <h1>
            Backup your Keystore File!
          </h1>

        </div>

        <div class="half">
          <div>
            <p class="GEN_Warning_1">
              **Do not lose it!** It cannot be recovered if you lose it.
            </p>
            <p class="GEN_Warning_2">
              **Do not share it!** Your funds will be stolen if you use this file on a malicious/phishing site.
            </p>
            <p class="GEN_Warning_3">
              **Make a backup!** Secure it like the millions of dollars it may one day be worth.
            </p>
          </div>
        </div>


        <div class="buttons">
          <a tabindex="0" role="button"
             class="btn btn-primary"
             href="{{blobEnc}}"
             download="{{encFileName}}"
             aria-label="{{'x_Download'|translate}} {{'x_Keystore'|translate}}"
             aria-describedby="x_KeystoreDesc"
             ng-click="downloaded()"
             target="_blank" rel="noopener noreferrer">
            <!-- <span translate="x_Download"> -->
            <!-- <span>
              Click to Download
            </span>
            <br/> -->
            <span translate="x_Keystore2">
              Download: Keystore File (UTC / JSON)
            </span>
          </a>

          <a tabindex="0"
          role="button"
          class="btn btn-danger"
          ng-click="continueToPaper()">
          <span>
            I understand. Continue.
          </span>
        </a>
        </div>

      </div>

    </section>
    <!-- <section class="block__help">
      <div class="help_sections">
        <h2 translate="GEN_Help_8">
          Not Downloading a File?
        </h2>
        <ul>
          <li translate="GEN_Help_9">
            Try using Google Chrome
          </li>
          <li translate="GEN_Help_10">
            Right click &amp; save file as. Filename:
          </li>
          <input value="{{encFileName}}" class="form-control input-sm" />
        </ul>
      </div>

      <div class="help_sections">
        <h2 translate="GEN_Help_11">
          Don't open this file on your computer
        </h2>
        <ul>
          <li translate="GEN_Help_12">
            Use it to unlock your wallet via MyEtherWallet (or Mist, Geth, Parity &amp; other wallet clients.)
          </li>
        </ul>
      </div>


    </section> -->

  </article>


  <article role="main" class="block__wrap gen__3" ng-show="showPaperWallet">

    <section class="block__main gen__3--inner">
      <br />
      <div class="left">
        <div class="stage">Create an Aion Wallet</div>
        <div class="stage">
          <h5>1</h5>
          <p>Create Password</p>
        </div>
        <div class="stage">
          <h5>2</h5>
          <p>Keystore Backup</p>
        </div>
        <div class="stage active">
          <h5>3</h5>
          <p>Private Key</p>
          <ul class="info">
            <li>
              <a href="./helpPages/HowToBackUpYourKeystore.html" target="_blank" rel="noopener noreferrer" translate="HELP_2a_Title">
                How to Save & Backup Your Wallet.
            </a>
            </li>
            <li>
              <a href="./helpPages/ProtectingYourWallet.html" target="_blank" rel="noopener noreferrer" translate="GEN_Help_15">
                Preventing loss &amp; theft of your funds.
              </a>
            </li>
            <li>
              <a href="./helpPages/DifferenceBetweenWallets.html" target="_blank" rel="noopener noreferrer" translate="GEN_Help_16">
                What are these Different Formats?
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="right flex">
        <div class="info">
          <h1> Save your Private Key & Paper Wallet!</h1>
          <div>
            <p>
              **Do not lose it!** It cannot be recovered if you lose it.
            </p>
            <p>
              **Do not share it!** Your funds will be stolen if you use this file on a malicious/phishing site.
            </p>
            <p>
              **Make a backup!** Secure it like the millions of dollars it may one day be worth.
            </p>
          </div>
        </div>
        <textarea aria-label="{{'x_PrivKey'|translate}}"
               aria-describedby="{{'x_PrivKeyDesc'|translate}}"
               class="form-control"
               readonly="readonly"
               rows="3"
               style="text-align: left; margin: 50px 0;">{{wallet.getPrivateKeyString()}}
        </textarea>

        <br />
        <div class="buttons">
          <a tabindex="0"
          aria-label="{{'x_Print'|translate}}"
          aria-describedby="x_PrintDesc"
          role="button"
          class="btn btn-primary"
          ng-click="printQRCode()"
          translate="x_Print">
            PRINT
          </a>

          <a class="btn btn-default" ng-click="getAddress()">
            <span translate="GEN_Label_3"> Save your Address </span> →
          </a>
        </div>
      </div>
    </section>
  </article>

  <article class="text-left" ng-show="showGetAddress">
    <div class="clearfix collapse-container">

      <div ng-click="wd = !wd">
        <a class="collapse-button"><span ng-show="wd">+</span><span ng-show="!wd">-</span></a>
        <h1 traslate="GEN_Unlock">Unlock your wallet to see your address</h1>
        <p translate="x_AddessDesc" ></p>
      </div>

      <div ng-show="!wd">
          @@if (site === 'mew' ) {  <wallet-decrypt-drtv></wallet-decrypt-drtv>         }
          @@if (site === 'cx' )  {  <cx-wallet-decrypt-drtv></cx-wallet-decrypt-drtv>   }
      </div>
    </div>

    <div class="row" ng-show="wallet!=null" ng-controller='viewWalletCtrl'>
      @@if (site === 'cx' ) {  @@include( './viewWalletInfo-content.tpl', { "site": "cx" } )    }
      @@if (site === 'mew') {  @@include( './viewWalletInfo-content.tpl', { "site": "mew" } )   }
    </div>

  </article>

</main>
