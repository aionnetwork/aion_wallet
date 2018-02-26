const fs = require('fs')
const util = require('util')
const colors = require('colors')

const Web3 = require('../index')
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
const BigNumber = require('bignumber.js')
BigNumber.config({ ERRORS: false })
const sol = fs.readFileSync(__dirname + '/types.sol', {encoding: 'utf8'})

const unlock = require('./unlock')
const compile = require('./compile')
const addr = process.argv[2]
const pw = 'PLAT4life'
console.log('Current Addr: ' + addr)

Promise.all([
    unlock(web3, addr, pw),
    compile(web3, sol)
]).then((res)=>{
    let acc = res[0],
        name = res[1].name,
        abi = res[1].abi,
        code = res[1].code
    const options = {from:acc, data:code, gas: 1000000, gasPrice:100}
    web3.eth.contract(abi).new(options, (err, contract)=>{
        if(err)
            console.log('[err] ' + err) 
        if(contract && contract.address){
            console.log('[contract addr] ' + contract.address)

            contract.testBool(
                true, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-bool-true] err ' + err).red)
                    if(ret == true)
                        console.log(('[test-bool-true] success').green)
                    else {
                        console.log(('[test-bool-true] failed ret ' + ret).red)
                    }
            })

            contract.testBool(
                false, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-bool-false] err ' + err).red)
                    if(ret === false)
                        console.log(('[test-bool-false] success').green)
                    else 
                        console.log(('[test-bool-false] failed').red)
            })

            const uint_32_max  = new BigNumber(4294967295)
            contract.testUnit32(
                4294967295, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-uint_32_max] err ' + err).red)
                    if(uint_32_max.equals(ret))
                        console.log(('[test-uint_32_max] success').green)
                    else 
                        console.log(('[test-uint_32_max] failed ' + ret).red)
            })

            const uint_64_max  = new BigNumber('18446744073709551615')
            contract.testUnit64(
                '18446744073709551615', 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-uint_64_max] err ' + err).red)
                    if(uint_64_max.equals(ret))
                        console.log(('[test-uint_64_max] success').green)
                    else 
                        console.log(('[test-uint_64_max] failed ' + ret).red)
            })

            const uint_96_max  = new BigNumber('79228162514264337593540590335')
            contract.testUnit96(
                '79228162514264337593540590335', 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-uint_96_max] err ' + err).red)
                    if(uint_96_max.equals(ret))
                        console.log(('[test-uint_96_max] success').green)
                    else 
                        console.log(('[test-uint_96_max] failed ' + ret).red)
            })

            const uint_128_max  = new BigNumber('340282366920938463463374607431768211455')
            contract.testUnit128(
                '340282366920938463463374607431768211455', 
                { from:acc, data:code, gas: 300000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-uint_128_max] err ' + err).red)
                    if(uint_128_max.equals(ret))
                        console.log(('[test-uint_128_max] success').green)
                    else 
                        console.log(('[test-uint_128_max] failed ' + ret).red)
            })

            const uint_0  = new BigNumber(0)
            contract.testUnit128(
                0, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    console.log('[ret] ' + ret)
                    if(err)
                        console.log(('[test-uint_0] err ' + err).red)
                    if(uint_0.equals(ret))
                        console.log(('[test-uint_0] success').green)
                    else 
                        console.log(('[test-uint_0] failed ' + ret).red)
            })

            const address  = '0x1234567890abcdef1234567890abcdef12345678'
            contract.testAddress(
                address, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    console.log('[ret] ' + ret)
                    if(err)
                        console.log(('[test-address] err ' + err).red)
                    if(address === ret)
                        console.log(('[test-address] success').green)
                    else 
                        console.log(('[test-address] failed ' + ret).red)
            })

            const bytes5  = '0xffffffffff'
            contract.testFixedBytes1(
                bytes5, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-bytes5] err ' + err).red)
                    if(bytes5 === ret)
                        console.log(('[test-bytes5] success').green)
                    else 
                        console.log(('[test-bytes5] failed ' + ret).red)
            })

            const bytes20  = "0xffffffffffffffffffffffffffffffffffffffff"
            contract.testFixedBytes2(
                bytes20, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-bytes20] err ' + err).red)
                    if(bytes20 === ret)
                        console.log(('[test-bytes20] success').green)
                    else 
                        console.log(('[test-bytes20] failed ' + ret).red)
            })

            const strAscii  = 'hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world'           
            contract.testString(
                strAscii, 
                { from:acc, data:code, gas: 100000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-string-strAscii] err ' + err).red)
                    if(strAscii === ret)
                        console.log(('[test-string-strAscii] success').green)
                    else 
                        console.log(('[test-string-strAscii] failed "' + ret + '"').red)
            })

            const strUtf8 = '你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界'
            contract.testString(
                strUtf8, 
                { from:acc, data:code, gas: 100000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-string-strUtf8] err ' + err).red)
                    if(strUtf8 === ret)
                        console.log(('[test-string-strUtf8] success').green)
                    else 
                        console.log(('[test-string-strUtf8] failed "' + ret + '"').red)
            })

            const strEmpty  = ''
            contract.testString(
                strEmpty, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-string-strEmpty] err ' + err).red)
                    if(strEmpty === ret)
                        console.log(('[test-string-strEmpty] success').green)
                    else 
                        console.log(('[test-string-strEmpty] failed "' + ret + '"').red)
            })

            const bytes  = '0x0123456789abcdef' 
            contract.testBytes(
                bytes, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-bytes] err ' + err).red)
                    if(bytes === ret)
                        console.log(('[test-bytes] success').green)
                    else 
                        console.log(('[test-bytes] failed "' + ret + '"').red)
            })

            const dynamicArray1  = 0xfff 
            contract.testDynamicArray1(
                dynamicArray1, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-bytes] err ' + err).red)
                    if(dynamicArray1 === ret)
                        console.log(('[test-bytes] success').green)
                    else 
                        console.log(('[test-bytes] failed "' + ret + '"').red)
            })


            const dynamicArray2  = ["0xf", "0xff", "0xfff"] 
            contract.testDynamicArray2(
                dynamicArray2, 
                { from:acc, data:code, gas: 30000, gasPrice:100 }, 
                (err, ret)=>{ 
                    if(err)
                        console.log(('[test-bytes] err ' + err).red)
                    if(ArrdynamicArray2 === ret)
                        console.log(('[test-bytes] success').green)
                    else 
                        console.log(('[test-bytes] failed "' + ret + '"').red)
            })
        }
    })
}, (err)=>{
    console.log('[err] ' + err)
})
