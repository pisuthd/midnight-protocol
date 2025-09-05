// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import "../src/mocks/MockToken.sol";

/**
 * @title DeployMockTokens
 * @notice Deploy mock tokens for SOMNIA testnet (chain ID 50312)
 * @dev Usage: 
 *   forge script script/DeployMockTokens.s.sol --rpc-url $SOMNIA_TESTNET_RPC_URL --broadcast --verify
 */
contract DeployMockTokens is Script {
    
    function run() external {
        string memory privateKeyString = vm.envString("PRIVATE_KEY");
        uint256 deployerPrivateKey;
        
        // Handle private key with or without 0x prefix
        if (bytes(privateKeyString)[0] == '0' && bytes(privateKeyString)[1] == 'x') {
            deployerPrivateKey = vm.parseUint(privateKeyString);
        } else {
            deployerPrivateKey = vm.parseUint(string(abi.encodePacked("0x", privateKeyString)));
        }
        
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("===========================================");
        console.log("Deploying Mock Tokens to SOMNIA Testnet");
        console.log("===========================================");
        console.log("Chain ID:", block.chainid);
        require(block.chainid == 50312, "Must deploy to SOMNIA testnet (chain ID 50312)");
        
        console.log("Deployer address:", deployer);
        console.log("Block number:", block.number); 
        
        // Check deployer balance
        uint256 balance = deployer.balance;
        console.log("Deployer balance:", balance / 1e18, "STT");
        require(balance > 0.1 ether, "Insufficient balance for deployment (need at least 0.1 STT)");
        
        // Start broadcasting transactions to KAIA testnet
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy mock stablecoins and other tokens
        MockToken usdc = new MockToken("USDC.e Token", "USDC.e", 6, 1000000e6); // 1M USDC.e
        MockToken nia = new MockToken("NiaToken", "NIA", 18, 1000000e18); // 1M NIA
        MockToken somniaP = new MockToken("Somnia Printer", "SomniaP", 18, 1000000e18); // 1M SomniaP
        MockToken wSomi = new MockToken("Wrapped SOMI", "WSOMI", 18, 1000000e18); // 1M WSOMI
        
        // Stop broadcasting
        vm.stopBroadcast();
        
        console.log("===========================================");
        console.log("Mock Tokens deployed successfully!");
        console.log("===========================================");
        console.log("USDC.e:", address(usdc)); 
        console.log("NIA:", address(nia));
        console.log("SomniaP:", address(somniaP));
        console.log("WSOMI:", address(wSomi));
    }
     
}
