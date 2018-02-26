const Web3 = require('../index')
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))

const unlock = require('./unlock')
const compile = require('./compile')

const fromAddr = process.argv[2]
if(!fromAddr){
	console.log('[err] missing your address as first argv')
	process.exit(1)
}
const toAddr = process.argv[3]
if(!toAddr){
	console.log('[err] missing your friend address as second argv')
	process.exit(1)
}
let value = process.argv[4]
if(!value){
	console.log('[err] missing how much you wanna transfer as third argv')
	process.exit(1)
}
value = value.toString()

/////////////////////////////////////generating keys////////////////////////////////////////
var nacl = require('./nacl.min.js');
var key = nacl.sign.keyPair();
console.log('');
console.log('');
console.log('ED25519 Generate Private Key: 0x' + Buffer(key.secretKey, 'hex').toString('hex'));
console.log('');
console.log('ED25519 Generate Public Key: 0x' + Buffer(key.publicKey, 'hex').toString('hex'));
console.log('');


/////////////////////////////////////View Balance/////////////////////////////////////////
console.log()
console.log('***************************************************************************')
console.log('  from ' + fromAddr)
console.log('  to   ' + toAddr)
console.log('  send $' + value)
console.log('***************************************************************************')
console.log()

const pw = 'PLAT4life'
//console.log('[my-addr] ' + fromAddr)
let fromBalance = web3.eth.getBalance(fromAddr)
let toBalance = web3.eth.getBalance(toAddr)
console.log('[my-balance-before-transfer] ' + fromBalance.toString(10))
console.log('[to-balance-before-transfer] ' + toBalance.toString(10))

////////////////////////////////////sending transaction/////////////////////////////////////////
Promise.all([
    unlock(web3, fromAddr, pw)
]).then((res)=>{
	console.log('[account unlock done]')
	web3.eth.sendTransaction({
		from: fromAddr,
		to: toAddr,
		value: value,
		nonce: 0,
		gas: 30000,
		gasPrice: 10,
		data: ''
	}, (err, res)=>{
		if(err)
			console.log('[err] ' + err)
		console.log('[verifying balances ...]')
		console.log()
		setTimeout(()=>{
			fromBalance = web3.eth.getBalance(fromAddr)
			toBalance = web3.eth.getBalance(toAddr)
			console.log('[my-balance-after-transfer] ' + fromBalance.toString(10))
			console.log('[to-balance-after-transfer] ' + toBalance.toString(10))
		}, 15000)
	})
}, (err)=>{
	console.log('[err] ' + err)
})
