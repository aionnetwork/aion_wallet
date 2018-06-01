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
var fileReaderDrtv = function($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
			var fn = $parse(attrs.onReadFile);
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
				
				reader.onload = function(onLoadEvent) {
		          var buffer = onLoadEvent.target.result;
		          var uint8 = new Uint8Array(buffer); // Assuming the binary format should be read in unsigned 8-byte chunks
		          // If you're on ES6 or polyfilling
		          // var result = Array.from(uint8);
		          // Otherwise, good old loop
		          var result = [];
		          for (var i = 0; i < uint8.length; i++) {
		            result.push(uint8[i]);
		          }

		          console.log("reader.onload: ", reader.onload);
		          scope.$apply(function() {
		            fn(scope, {
		              $fileContent: result
		            });
		          });
		        };

		        reader.readAsArrayBuffer((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
		      //});

				// -------------------------------------------------------------------------
				/*
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {
							$fileContent: onLoadEvent.target.result
						});
					});
				};
				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				*/
				// -------------------------------------------------------------------------
			});
		}
	};
};
module.exports = fileReaderDrtv;