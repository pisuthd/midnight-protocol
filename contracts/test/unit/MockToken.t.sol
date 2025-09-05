// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../../src/mocks/MockToken.sol";

contract MockTokenTest is Test {

    MockToken public usdc; 
    MockToken public wETH;
    
    address public deployer;
    address public user1;
    address public user2;
    
    function setUp() public {
        deployer = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        
        // Deploy mock tokens
        usdc = new MockToken("USD Coin", "USDC", 6, 1000000e6);
        wETH = new MockToken("Wrapped Ether", "WETH", 18, 1000000e18);
    }
    
    function testTokenDeployment() view public {
        // Test USDC
        assertEq(usdc.name(), "USD Coin");
        assertEq(usdc.symbol(), "USDC");
        assertEq(usdc.decimals(), 6);
        assertEq(usdc.totalSupply(), 1000000e6);
        assertEq(usdc.balanceOf(deployer), 1000000e6);
        
        // Test WETH
        assertEq(wETH.name(), "Wrapped Ether");
        assertEq(wETH.symbol(), "WETH");
        assertEq(wETH.decimals(), 18);
        assertEq(wETH.totalSupply(), 1000000e18);
        assertEq(wETH.balanceOf(deployer), 1000000e18);
    }
    
    function testMinting() public {
        uint256 mintAmountUSDC = 1000e6; // 1000 USDC
        uint256 mintAmountWETH = 10e18;  // 10 WETH
        
        // Mint to user1
        usdc.mint(user1, mintAmountUSDC);
        wETH.mint(user1, mintAmountWETH);
        
        assertEq(usdc.balanceOf(user1), mintAmountUSDC);
        assertEq(wETH.balanceOf(user1), mintAmountWETH);
        
        // Check total supply increased
        assertEq(usdc.totalSupply(), 1000000e6 + mintAmountUSDC);
        assertEq(wETH.totalSupply(), 1000000e18 + mintAmountWETH);
    }
    
    function testTransfers() public {
        uint256 transferAmountUSDC = 100e6; // 100 USDC
        uint256 transferAmountWETH = 1e18;  // 1 WETH
        
        // Transfer USDC from deployer to user1
        usdc.transfer(user1, transferAmountUSDC);
        assertEq(usdc.balanceOf(user1), transferAmountUSDC);
        assertEq(usdc.balanceOf(deployer), 1000000e6 - transferAmountUSDC);
        
        // Approve and transferFrom USDC
        vm.prank(user1);
        usdc.approve(user2, transferAmountUSDC);
        
        vm.prank(user2);
        usdc.transferFrom(user1, user2, transferAmountUSDC);
        
        assertEq(usdc.balanceOf(user2), transferAmountUSDC);
        assertEq(usdc.balanceOf(user1), 0);
        
        // Transfer WETH from deployer to user1
        wETH.transfer(user1, transferAmountWETH);
        assertEq(wETH.balanceOf(user1), transferAmountWETH);
        assertEq(wETH.balanceOf(deployer), 1000000e18 - transferAmountWETH);
    }
}
