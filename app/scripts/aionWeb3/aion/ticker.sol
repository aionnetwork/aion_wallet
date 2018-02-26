pragma solidity ^0.4.0;
contract Ticker {
    uint128 tick;
    function Ticker() public { tick = 0; }
    function ticking() public { tick = tick + 1; }
    function getTick() public returns (uint128) { return tick; }
}