pragma solidity ^0.4.0;

contract Types {

    function testBool(bool x) constant returns  (bool) {
        return x;
    }

    function testUnit32(uint32 x) constant returns (uint32) {
        return x;
    }

    function testUnit64(uint64 x) constant returns (uint64) {
        return x;
    }

    function testUnit96(uint96 x) constant returns (uint96) {
        return x;
    }

    function testUnit128(uint128 x) constant returns (uint128) {
        return x;
    }

    function testAddress(address x) constant returns (address) {
        return x;
    }
    
    function testFixedBytes1(bytes5 x) constant returns (bytes5) {
        return x;
    }

    function testFixedBytes2(bytes20 x) constant returns (bytes20) {
        return x;
    }
    
    function testString(string x) constant returns (string) {
        return x;
    }

    function testBytes(bytes x) constant returns (bytes) {
        return x;
    }

    function testStaticArray1(uint16[3] x) constant returns (uint16[3]) {
        return x;
    }

    function testStaticArray2(bytes20[3] x) constant returns (bytes20[3]) {
        return x;
    }

    function testDynamicArray1(uint16[] x) constant returns (uint16[]) {
        return x;
    }

    function testDynamicArray2(bytes20[] x) constant returns (bytes20[]) {
        return x;
    }

}