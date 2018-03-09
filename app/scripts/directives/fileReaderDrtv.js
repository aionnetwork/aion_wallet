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