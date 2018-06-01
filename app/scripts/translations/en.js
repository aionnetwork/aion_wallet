/*******************************************************************************
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
 *******************************************************************************/
 
// English
'use strict';
var en = function() {}
en.code = 'en';
en.data = {

GEN_Warning_1                   :  'Please download your keystore file below. It stores the encrypted version of your private key',
GEN_Warning_2                   :  'You will be asked to enter your password in order to unlock your account with the public key',
GEN_Warning_3                   :  'Please keep this safe!',

SEND_Helper_Contract            :  'In most cases you should leave this as 0.',
SEND_ViewOnly                   :  'You cannot send with only your address. You must use one of the other options to unlock your wallet in order to send.',
SEND_LoadTokens                 :  'Load Tokens',
SEND_CustomAddrMsg              :  'A message regarding',

X_Advanced                      :  'Advanced Users Only.',
X_HelpfulLinks                  :  'Helpful Links & FAQs',
X_HelpfulLinks_1                :  'How to Access your Wallet',
X_HelpfulLinks_2                :  'I lost my private key',
X_HelpfulLinks_3                :  'My private key opens a different address',
X_Network                       :  'Network', // aka "node" or "chain" - used in the dropdown in header
X_Network_Custom                :  'Add Custom Network / Node',

ENS_WrongAddress_2              :  'Please unlock the wallet with address ',


/* Old */
ADD_Label_1                     :  'What would you like to do?',
ADD_Label_2                     :  'Create a Nickname',
ADD_Label_3                     :  'Your wallet is encrypted. Good! Please enter the password.',
ADD_Label_4                     :  'Add an Account to Watch',
ADD_Label_5                     :  'Enter the Address',
ADD_Label_6                     :  'Unlock your Wallet',
ADD_Label_6_short               :  'Unlock',
ADD_Label_7                     :  'Add Account',
ADD_Label_8                     :  'Password (optional):',
ADD_Radio_1                     :  'Generate New Wallet',
ADD_Radio_2                     :  'Select Your Wallet File (Keystore / JSON)',
ADD_Radio_2_alt                 :  'Select Your Wallet File',
ADD_Radio_2_short               :  'SELECT WALLET FILE...',
ADD_Radio_3                     :  'Paste Your Private Key',
ADD_Radio_4                     :  'Add an Account to Watch',

decrypt_Access                  :  'How would you like to access your wallet?',
decrypt_Select                  :  'Select a Wallet',
decrypt_Title                   :  'Select the format of your private key',

ERROR_0                         :  '(error_01) Please enter a valid amount.',
ERROR_1                         :  '(error_02) Your password must be at least 9 characters. Please ensure it is a strong password.',
ERROR_2                         :  '(error_03) Sorry! We don\'t recognize this type of wallet file.',
ERROR_3                         :  '(error_04) This is not a valid wallet file.',
ERROR_4                         :  '(error_05) This unit doesn\'t exists, please use the one of the following units',
ERROR_5                         :  '(error_06) Please enter a valid address.',
ERROR_6                         :  '(error_07) Please enter a valid password.',
ERROR_7                         :  '(error_08) Please enter valid decimals     (Must be an integer. Try 0-18.)',
ERROR_8                         :  '(error_09) Please enter a valid NRG limit  (Must be an integer. Try 21000-4000000.)',
ERROR_9                         :  '(error_10) Please enter a valid data value (Must be hex.)',
ERROR_10                        :  '(error_11) Please enter a valid NRG price. (Must be an integer. Try 20 PLAT / 20000000000 WEI.)',
ERROR_11                        :  '(error_12) Please enter a valid nonce (Must be an integer.)',
ERROR_12                        :  '(error_13) Invalid signed transaction.',
ERROR_13                        :  '(error_14) A wallet with this nickname already exists.',
ERROR_14                        :  '(error_15) Wallet not found.',
ERROR_15                        :  '(error_16) Whoops. It doesn\'t look like a proposal with this ID exists yet or there is an error reading this proposal.',
ERROR_16                        :  '(error_17) A wallet with this address already exists in storage. Please check your wallets page.',
ERROR_19                        :  '(error_20) Please enter a valid symbol',
ERROR_22                        :  '(error_23) Please enter a valid node name',
ERROR_23                        :  '(error_24) Please enter a valid URL. If you are on https, your URL must be https',
ERROR_24                        :  '(error_25) Please enter a valid port.',
ERROR_25                        :  '(error_26) Please enter a valid chain ID.',
ERROR_26                        :  '(error_27) Please enter a valid ABI.',
ERROR_27                        :  '(error_28) Minimum amount: 0.01. Max amount:',
ERROR_28                        :  '(error_29) You need this `Keystore File + Password` or the `Private Key` (next page) to access this wallet in the future. ',
ERROR_29                        :  '(error_30) Please enter a valid user and password.',
ERROR_30                        :  '(error_31) Please enter a valid name (7+ characters, limited punctuation)',
ERROR_31                        :  '(error_32) Please enter a valid secret phrase.',
ERROR_32                        :  '(error_33) Could not connect to the node. Refresh your page, try a different node (top-right corner), check your firewall settings. If custom node, check your configs.',
ERROR_33                        :  '(error_34) The wallet you have unlocked does not match the owner\'s address.',
ERROR_34                        :  '(error_35) The name you are attempting to reveal does not match the name you have entered.',
ERROR_36                        :  '(error_37) Please enter a valid TX hash',
ERROR_37                        :  '(error_38) Please enter valid hex string. Hex only contains: 0x, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, a, b, c, d, e, f',
ERROR_38                        :  '(error_39) Offer must have either price or reserve set to more than 0',
ERROR_39                        :  '(error_40) Bid must be more than the specified minimum',
ERROR_40                        :  '(error_41) Your password and re-typed password do not match!',

GEN_desc                        :  'If you want to generate multiple wallets, you can do so here',
GEN_Help_1                      :  'Use your',
GEN_Help_10                     :  'Right click & save file as. Filename:',
GEN_Help_11                     :  'Don\'t open this file on your computer',
GEN_Help_12                     :  'Use it to unlock your wallet via Aion Wallet',
GEN_Help_13                     :  'How to Back Up Your Keystore File',
GEN_Help_14                     :  'What are these Different Formats?',
GEN_Help_15                     :  'Preventing loss &amp; theft of your funds.',
GEN_Help_16                     :  'What are these Different Formats?',
GEN_Help_17                     :  'Why Should I?',
GEN_Help_18                     :  'To have a secondary backup.',
GEN_Help_19                     :  'In case you ever forget your password.',
GEN_Help_2                      :  'to access your account.',
GEN_Help_20                     :  'Cold Storage',
GEN_Help_3                      :  'Your device * is * your wallet.',
GEN_Help_4                      :  'Guides & FAQ',
GEN_Help_5                      :  'How to Create a Wallet',
GEN_Help_6                      :  'Getting Started',
GEN_Help_7                      :  'Keep it safe · Make a backup · Don\'t share it with anyone · Don\'t lose it · It cannot be recovered if you lose it.',
GEN_Help_8                      :  'Not Downloading a File?',
GEN_Help_9                      :  'Try using Google Chrome',
GEN_Label_1                     :  'Enter a password',
GEN_Label_2                     :  'Save your `Keystore` File.',
GEN_Label_3                     :  'Continue to Wallet',
GEN_Label_4                     :  'Print paper wallet or a QR code.',
GEN_Label_5                     :  'Save Your `Private Key`.',
GEN_Placeholder_1               :  'Save this in a safe place!',
GEN_Placeholder_2               :  'Retype your password!',
GEN_SuccessMsg                  :  'Success! Your wallet has been generated.',
GEN_Unlock                      :  'Unlock your wallet to see your address',
GET_ConfButton                  :  'I understand. Continue.',

HELP_2a_Title                   :  'How do I save/backup my wallet?',

MSG_date                        :  'Date',
MSG_info1                       :  'Include the current date so the signature cannot be reused on a different date.',
MSG_info2                       :  'Include your nickname and where you use the nickname so someone else cannot use it.',
MSG_info3                       :  'Include a specific reason for the message so it cannot be reused for a different purpose.',
MSG_message                     :  'Message',
MSG_signature                   :  'Signature',
MSG_verify                      :  'Verify Message',

NAV_AddWallet                   :  'Add Wallet',
NAV_BulkGenerate                :  'Bulk Generate',
NAV_CheckTxStatus               :  'Check TX Status',
NAV_Contact                     :  'Contact',
NAV_Contracts                   :  'Contracts',
NAV_DeployContract              :  'Deploy Contract',
NAV_DomainSale                  :  'DomainSale',
NAV_ENS                         :  'ENS',
NAV_GenerateWallet              :  'Create New Wallet',
NAV_GenerateWallet_alt          :  'New Wallet',
NAV_Help                        :  'Help',
NAV_InteractContract            :  'Interact with Contract',
NAV_Multisig                    :  'Multisig',
NAV_MyWallets                   :  'My Wallets',
NAV_Offline                     :  'Send Offline',
NAV_SendAION                   :  'Use Wallet',
NAV_SendTokens                  :  'Use Wallet',
NAV_SignMsg                     :  'Sign Message',
NAV_Swap                        :  'Swap',
NAV_TxStatus                    :  'TX Status',
NAV_ViewWallet                  :  'View Wallet Info',
NAV_YourWallets                 :  'Your Wallets',

NONCE_Desc                      :  'The nonce is the number of transactions sent from a given address. It ensures transactions are sent in order & not more than once.',

SEND_addr                       :  'To Address',
SEND_amount                     :  'Amount to Send',
SEND_amount_short               :  'Amount',
SEND_custom                     :  'Add Custom Token',
SEND_generate                   :  'Generate Transaction',
SEND_raw                        :  'Raw Transaction',
SEND_signed                     :  'Signed Transaction',
SEND_trans                      :  'Send Transaction',
SEND_TransferTotal              :  'Send Entire Balance',
SENDModal_Content_1             :  'You are about to send',
SENDModal_Content_2             :  'to address',
SENDModal_Content_3             :  'Are you sure you want to do this?',
SENDModal_No                    :  'No, get me out of here!',
SENDModal_Title                 :  'Warning!',
SENDModal_Yes                   :  'Yes, I am sure! Make transaction.',

sidebar_AccountAddr             :  'Account Address',
sidebar_AccountBal              :  'Account Balance',
sidebar_AccountInfo             :  'Account Information',
sidebar_TransHistory            :  'Transaction History',

SUCCESS_1                       :  'Valid address',
SUCCESS_2                       :  'Wallet successfully decrypted',
SUCCESS_3                       :  'Your TX has been broadcast to the network. This does not mean it has been mined & sent. During times of extreme volume, it may take 3+ hours to send. 1) Check your TX below, log on to dashboard.aion.network to check your transaction 2) Save your TX Hash in case you need it later:  ',
SUCCESS_4                       :  'Your wallet was successfully added',
SUCCESS_5                       :  'File Selected',
SUCCESS_6                       :  'You are successfully connected',
SUCCESS_7                       :  'Message Signature Verified',

TRANS_advanced                  :  '+Advanced: Add Data',
TRANS_data                      :  'Data',
TRANS_desc                      :  'If you want to send Tokens, please use the "Send Token" page instead.',
TRANS_gas                       :  'NRG Limit',

x_Access                        :  'Access',
x_AddessDesc                    :  'Your Address can also be known as your `Account #` or your `Public Key`. It is what you share with people so they can send you AION. Find the colorful address icon. Make sure it matches your paper wallet & whenever you enter your address somewhere.',
x_Address                       :  'Your Address',
x_Cancel                        :  'Cancel',
x_CancelReplaceTx               :  'Cancel or Replace Transaction',
x_CancelTx                      :  'Cancel Transaction',
x_Download                      :  'Download',
x_Json                          :  'JSON File (unencrypted)',
x_Keystore                      :  'Keystore File (Recommended · Encrypted)',
x_Keystore2                     :  'Keystore File ',
x_KeystoreDesc                  :  'This Keystore file matches the format used by Mist so you can easily import it in the future. It is the recommended file to download and back up.',
x_Password                      :  'Password',
x_PasswordDesc                  :  'Enter a  password that will be used to encrypt your private key into a keystore file, and please keep it safe!',
x_Print                         :  'Print Paper Wallet',
x_PrintDesc                     :  'ProTip: If you cannot print this right now, click "Print" and save it as a PDF until you are able to get it printed. Remove it from your computer afterwards!',
x_PrintShort                    :  'Print',
x_PrivKey                       :  'Private Key (unencrypted)',
x_PrivKey2                      :  'Private Key',
x_PrivKeyDesc                   :  'This is the unencrypted text version of your private key, meaning no password is necessary. If someone were to find your unencrypted private key, they could access your wallet without a password. For this reason, encrypted versions are typically recommended.',
x_ReadMore                      :  'Read More',
x_ReplaceTx                     :  'Replace Transaction',
x_Save                          :  'Save',
x_TransHash                     :  'Transaction Hash',
x_TXFee                         :  'TX Fee',
x_TxHash                        :  'TX Hash',
x_TXT                           :  'TXT file (unencrypted)',
x_Wallet                        :  'Wallet',

};

module.exports = en;
