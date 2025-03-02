// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {POAP} from "../POAP.sol";
import {TestExt} from "lib/forge-zksync-std/src/TestExt.sol";

contract MintScript is Script, TestExt {
    POAP public poap;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Encode paymaster input
        bytes memory paymaster_encoded_input = abi.encodeWithSelector(
            bytes4(keccak256("general(bytes)")),
            bytes("0x")
        );
        vmExt.zkUsePaymaster(vm.envAddress("PAYMASTER_ADDRESS"), paymaster_encoded_input);

        address poapAddress = 0x52d8cB79B5f5C7Eab2141278C29A1c264C9dD405;
        poap = POAP(poapAddress);

        // Replace with the URI you want to mint
        string memory uri = "ipfs://test-token-uri";
        poap.mint(uri);

        vm.stopBroadcast();
    }
}