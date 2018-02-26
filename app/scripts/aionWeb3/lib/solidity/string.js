var f = require('./formatters');
var SolidityType = require('./type');

var SolidityTypeString = function () {
    this._inputFormatter = f.formatInputString;
    this._outputFormatter = f.formatOutputString;
};

SolidityTypeString.prototype = new SolidityType({});
SolidityTypeString.prototype.constructor = SolidityTypeString;

SolidityTypeString.prototype.isType = function (name) {
    let flag = !!name.match(/^string(\[([0-9]*)\])*$/);
    console.log('[string-type-check] ' + flag);
    return flag;
};

SolidityTypeString.prototype.isDynamicType = function () {
    return true;
};

module.exports = SolidityTypeString;
