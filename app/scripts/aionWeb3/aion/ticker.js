const fs = require('fs')
const Web3 = require('../index')
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))

const BigNumber = require('bignumber.js')
BigNumber.config({ ERRORS: false })
const sol = fs.readFileSync(__dirname + '/ticker.sol', {encoding: 'utf8'})

const unlock = require('./unlock')
const compile = require('./compile')
const addr = process.argv[2]
const pw = 'PLAT4life'

Promise.all([
    unlock(web3, addr, pw),
    compile(web3, sol)
]).then((res)=>{
    let acc = res[0],
        name = res[1].name,
        abi = res[1].abi,
        code = res[1].code
    web3.eth.defaultAccount = acc
    const options = {from:acc, data:code, gas: 4700000, gasPrice:1}
    web3.eth.contract(abi).new(options, (err, contract)=>{
        if(err)
            console.log('[err] ' + err) 
        if(contract && contract.address){
            console.log('[contract addr] ' + contract.address)
            let deployed = web3.eth.contract(abi).at(contract.address);

            // unlock account every 3 mins
            setInterval(()=>{
            	console.log('[unlock]')
            	unlock(web3, addr, pw)
            }, 1000 * 60 * 3)

            // ticking & show ticks every 3 secs
            setInterval(()=>{
            	console.log('[ticking]')
            	deployed.ticking({
            		from: acc,
            		gas: 3000000,
            		gasPrice: 1
            	},(err, res)=>{

            	})
            	let tick = deployed.getTick()
            	if(tick)
            		console.log('[tick] ' + web3._extend.utils.toBigNumber(tick))
            }, 5000)
        }
    })
})