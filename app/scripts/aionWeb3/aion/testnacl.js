

/////////////////////////////////////generating keys////////////////////////////////////////
var nacl = require('./nacl.min.js');


var _0 = new Uint8Array(16);

var key = nacl.sign.keyPair();
console.log('');
console.log('');
console.log('ED25519 Generate Private Key: 0x' + Buffer(key.secretKey, 'hex').toString('hex'));
console.log('');
console.log('ED25519 Generate Public Key: 0x' + Buffer(key.publicKey, 'hex').toString('hex'));
console.log('');
_0 = key.secretKey;
console.log(_0.length);
console.log("generated 0x"+ nacl.box.keyPair.fromSecretKey(new Uint8Array(key.secretKey)));

