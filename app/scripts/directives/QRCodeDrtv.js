/*******************************************************************************
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
 *     MyEtherWallet LLC  
 *******************************************************************************/

'use strict';
var QRCodeDrtv = function() {
	return function(scope, element, attrs) {
		var watchVar = attrs.watchVar;
		scope.$watch(watchVar, function() {
			var value = attrs.qrCode;
			element.empty();
			var delay = 0;
			if (element[0].clientWidth == 0) delay = 200;
			setTimeout(function() {
				new QRCode(element[0], {
					text: value,
					width: element[0].clientWidth,
					height: element[0].clientWidth,
					colorDark: "#000000",
					colorLight: "#ffffff",
					correctLevel: QRCode.CorrectLevel.M
				});
			}, delay);
		});
	};
};
module.exports = QRCodeDrtv;