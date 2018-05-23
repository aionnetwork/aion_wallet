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
 
<!-- print -->
<div class="tab-pane" id="panePrint" style="display: none;">
  <div class="print-container">
    <span id="printwalletjson" style="display: none;"></span>
    <img src="images/print-sidebar.png" height="" width="auto" class="print-title" />
    <div class="print-qr-code-1">
      <div id="paperwalletaddqr"></div>
      <!--<img src="images/qrcode_test.png" width="90%;" height="auto" class="pull-left" />-->
      <p class="print-text" style="padding-top: 25px;">YOUR ADDRESS</p>
    </div>
    <div class="print-notes">
      <img src="images/notes-bg.png" width="90%;" height="auto" class="pull-left" />
      <p class="print-text">AMOUNT / NOTES</p>
    </div>
    <div class="print-qr-code-2">
      <div id="paperwalletprivqr"></div>
      <p class="print-text" style="padding-top: 30px;">YOUR PRIVATE KEY</p>
    </div>
    <div class="print-address-container">
      <p>
        <strong>Your Address:</strong>
        <br />
        <span id="paperwalletadd"></span>
      </p>
      <p>
        <strong>Your Private Key:</strong>
        <br />
        <span id="paperwalletpriv"></span>
      </p>
    </div>
  </div>
</div>
<!-- /print -->
