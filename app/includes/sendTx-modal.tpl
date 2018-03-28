<!--/*******************************************************************************
 * Copyright (c) 2017-2018 Aion foundation.
 *
 *     This file is part of the aion network project.
 *
 *     The aion network project is free software: you can redistribute it
 *     and/or modify it under the terms of the GNU General Public License
 *     as published by the Free Software Foundation, either version 3 of
 *     the License, or any later version.
 *
 *     The aion network project is distributed in the hope that it will
 *     be useful, but WITHOUT ANY WARRANTY; without even the implied
 *     warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *     See the GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with the aion network project source files.
 *     If not, see <https://www.gnu.org/licenses/>.
 *
 *     The aion network project leverages useful source code from other
 *     open source projects. We greatly appreciate the effort that was
 *     invested in these projects and we thank the individual contributors
 *     for their work. For provenance information and contributors
 *     please see <https://github.com/aionnetwork/aion/wiki/Contributors>.
 *
 * Contributors to the aion source files:
 *     Aion foundation.
 *     MyEtherWallet LLC  
 *******************************************************************************/-->
 
<article class="modal fade" id="sendTransaction" tabindex="-1">
  <section class="modal-dialog">
    <section class="modal-content">

      <div class="modal-body">

        <button type="button" class="close" data-dismiss="modal" aria-label="Close Dialog">&times;</button>

        <h2 class="modal-title text-center">
          <span translate="SENDModal_Content_1">You are about to send</span>...
        </h2>

        <table class="table text-center">
          <tbody>
            <tr>
              <td>
                <div class="addressIdenticon med"
                     title="Address Indenticon"
                     blockie-address="0x{{wallet.getPublicKeyString()}}"
                     watch-var="wallet.getAddressString()">
                </div>

              <td class="mono">
                ->
                <br />
                <h4 class="text-primary">
                  {{tx.value}} Aion
                </h4>
              </td>
              <td>
                <div class="addressIdenticon med" title="Address Indenticon" blockie-address="{{tx.to}}" watch-var="tx.to"></div>
              </td>
            </tr>
          </tbody>
        </table>

        <br />

        <table class="table small table-condensed table-hover">
          <tbody>
            <tr>
              <td class="small text-right">To Address:</td>
              <td class="small text-left mono">{{parsedSignedTx.to}}
              </td>
            </tr>
            <tr>
              <td class="small text-right">From Address:</td>
              <td class="small text-left mono">{{parsedSignedTx.from}}</td>
            </tr>
            <tr>
              <td class="small text-right">Amount to Send:</td>
              <td class="small text-left mono">{{parsedSignedTx.value}} AION</td>
            </tr>
            <tr>
              <td class="small text-right">Account Balance:</td>
              <td class="small text-left mono">{{parsedSignedTx.balance}}</td>
            </tr>
            <tr>
              <td class="small text-right">NRG Limit:</td>
              <td class="small text-left mono">{{parsedSignedTx.gasLimit}}</td>
            </tr>
            <tr>
              <td class="small text-right">NRG Price:</td>
              <td class="small text-left mono">1 PLAT</small>
              </td>
            </tr>
            <tr>
              <td class="small text-right">Nonce:</td>
              <td class="small text-left mono">{{parsedSignedTx.nonce}}</td>
            </tr>
            <tr>
              <td class="small text-right">Data:</td>
              <td class="small text-left mono">{{parsedSignedTx.data}}</td>
            </tr>
            <tr>
              <td class="small text-right">Type:</td>
              <td class="small text-left mono">{{parsedSignedTx.type}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-footer">
        <h4 class="text-center">
          <span translate="SENDModal_Content_1">You are about to send</span>
          <strong  class="mono">{{tx.value}} Aion</strong>
          <span translate="SENDModal_Content_2">to address</span>
          <strong class="mono">{{tx.to}}.</strong>
          <strong class="mono">{{tokenTx.to}}</strong>
        </h4>
        <p translate="SENDModal_Content_3">
          Are you sure you want to do this?
        </p>
        <br />
        <button class="btn btn-default" data-dismiss="modal" translate="SENDModal_No">
          No, get me out of here!
        </button>
        <button class="btn btn-primary" ng-click="sendTx()" translate="SENDModal_Yes">
          Yes, I am sure! Make transaction.
        </button>
      </div>

      <p class="small text-center" style="padding: 0px 5px;">
        <a href="./helpPages/TransactionsNotShowingUp.html" target="_blank" ref="noopener noreferrer">
          The network is a bit overloaded. If you're having issues with TXs, please read me.
        </a>
      </p>



    </section>
  </section>
</article>
