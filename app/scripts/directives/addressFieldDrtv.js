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
 
'use strict';
var addressFieldDrtv = function($compile) {
    return {
        restrict: "E",
        link: function(scope, element, attrs) {
            var varName = attrs.varName;
            var varArr = varName.split('.');
            var placeholder = attrs.placeholder == undefined ? '0x8f30ce8eb81c57388bc25820b0f8d0612451c9f90091224028b9c562fc9c7036' : attrs.placeholder ;
            var labelTranslated = attrs.labeltranslated == undefined ? 'SEND_addr' : attrs.labeltranslated;
            var setValue = function(value) {
                var temp = scope;
                for (var i in varArr) {
                    if (i == varArr.length - 1) temp[varArr[i]] = value;
                    else {
                        temp = temp[varArr[i]];
                    }
                }
            }
            scope.addressDrtv = {
                showDerivedAddress: false,
                ensAddressField: globalFuncs.urlGet('to') == null ? "" : globalFuncs.urlGet('to'),
                derivedAddress: '',
                readOnly: false
            }

            console.log("varName is "+varName);

            element.html('<div class=\"col-xs-11\">\n \
                    <label translate=\"' + labelTranslated + '\"></label>\n \
                    <input class=\"form-control\" type=\"text\" placeholder=\"' + placeholder + '\" ng-model=\"addressDrtv.ensAddressField\" ng-disabled=\"addressDrtv.readOnly\" ng-class=\"Validator.isValidAddress(' + varName + ') ? \'is-valid\' : \'is-invalid\'\"/>\n \
                    <p class="ens-response" ng-show="addressDrtv.showDerivedAddress"> ↳ <span class="mono ng-binding"> {{addressDrtv.derivedAddress}} </span> </p>\n \
                </div>\n \
                <div class=\"col-xs-1 address-identicon-container\">\n \
                   <div class=\"addressIdenticon\" title=\"Address Indenticon\" blockie-address=\"{{' + varName + '}}\" watch-var=\"' + varName + '\"></div>\n \
                </div>');


            scope.$watch('addressDrtv.ensAddressField', function() { 
                console.log("varName is "+varName+" addressDrtv is "+scope.addressDrtv.ensAddressField);
                if (Validator.isValidAddress(scope.addressDrtv.ensAddressField)) {
                    setValue(scope.addressDrtv.ensAddressField);
                    if (scope.addressDrtv.ensAddressField.substring(0,2)!='0x') scope.addressDrtv.ensAddressField = '0x'+scope.addressDrtv.ensAddressField;
                } else {
                    setValue('');
                    scope.addressDrtv.showDerivedAddress = false;
                }
            });
            $compile(element.contents())(scope);
        }
    };
};
module.exports = addressFieldDrtv;
