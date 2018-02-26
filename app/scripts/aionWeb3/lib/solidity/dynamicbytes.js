var f = require('./formatters');
var SolidityType = require('./type');

var SolidityTypeDynamicBytes = function () {
    this._inputFormatter = f.formatInputDynamicBytes;
    this._outputFormatter = f.formatOutputDynamicBytes;
};

SolidityTypeDynamicBytes.prototype = new SolidityType({});
SolidityTypeDynamicBytes.prototype.constructor = SolidityTypeDynamicBytes;

SolidityTypeDynamicBytes.prototype.isType = function (name) {
    let flag =  !!name.match(/^bytes(\[([0-9]*)\])*$/);
    console.log('[dynamic-bytes-type-check] ' + flag);
    return flag;
};

SolidityTypeDynamicBytes.prototype.isDynamicType = function () {
    return true;
};

module.exports = SolidityTypeDynamicBytes;
