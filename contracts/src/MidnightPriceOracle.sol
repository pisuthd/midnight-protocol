// SPDX-License-Identifier: BSD-3-Clause
pragma solidity ^0.8.10;

import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "./interfaces/PriceOracle.sol";
import "./tokens/CErc20.sol";

/**
 * @title MidnightPriceOracle
 * @notice A simplified Compound V2-compatible price oracle 
 *         - Allows admins to manually set prices for testing and simulation purposes.
 *         - Prices are normalized to account for underlying token decimals:
 *           - For 18-decimal tokens: price = USD_price * 1e18
 *           - For 6-decimal tokens:  price = USD_price * 1e30 (1e18 * 1e12 decimal adjustment)
 *           - For 8-decimal tokens:  price = USD_price * 1e28 (1e18 * 1e10 decimal adjustment)
 */
contract MidnightPriceOracle is Ownable, PriceOracle {

    // Mock prices for tokens
    mapping(address => uint256) public mockPrices;

    // Tracks which tokens are in mock mode (default true)
    mapping(address => bool) public mockMode;

    // Optional invert mode for specific tokens
    mapping(address => bool) public invertMode;

    // Whitelisted addresses allowed to set prices
    mapping(address => bool) public whitelist;

    event PricePosted(address asset, uint previousPriceMantissa, uint newPriceMantissa);
    event MockModeToggled(address token, bool enabled);

    modifier isWhitelisted() {
        require(whitelist[msg.sender], "Not whitelisted");
        _;
    }

    constructor() Ownable(msg.sender) {
        // Enable mock mode for owner by default
        whitelist[msg.sender] = true;
    }

    /**
     * @dev Internal helper to get the underlying token address for a cToken
     */
    function _getUnderlyingAddress(CToken cToken) private view returns (address) {
        if (compareStrings(cToken.symbol(), "cSOMI")) {
            return 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE; // native token placeholder
        }
        return address(CErc20(address(cToken)).underlying());
    }

    /**
     * @notice Returns the price of the underlying asset (mock only)
     */
    function getUnderlyingPrice(CToken cToken) public view override returns (uint) {
        address underlying = _getUnderlyingAddress(cToken);
        uint256 basePrice = mockPrices[underlying];

        require(mockMode[underlying], "Token not in mock mode");
        require(basePrice > 0, "Price not set");

        // Apply inversion if enabled
        if (invertMode[underlying]) {
            return 1e36 / basePrice; // keep 18-decimal scale
        }

        // Apply decimal adjustment for Compound V2 compatibility
        uint256 decimalAdjustment = _getDecimalAdjustment(_getUnderlyingDecimals(underlying));

        if (decimalAdjustment > 1e18) {
            return basePrice * (decimalAdjustment / 1e18);
        } else {
            return basePrice * decimalAdjustment / 1e18;
        }
    }

    /**
     * @dev Set a mock price for a token
     */
    function setDirectPrice(address asset, uint price) external isWhitelisted {
        if (!mockMode[asset]) {
            mockMode[asset] = true;
        }

        emit PricePosted(asset, mockPrices[asset], price);
        mockPrices[asset] = price;
    }

    /**
     * @dev Get underlying token decimals
     */
    function _getUnderlyingDecimals(address underlying) private view returns (uint8) {
        if (underlying == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
            return 18; // native token
        }
        return EIP20Interface(underlying).decimals();
    }

    /**
     * @dev Compute decimal adjustment for Compound V2
     */
    function _getDecimalAdjustment(uint8 tokenDecimals) private pure returns (uint256) {
        if (tokenDecimals >= 18) {
            return 1e18;
        }
        uint8 decimalDifference = 18 - tokenDecimals;
        return 1e18 * (10 ** decimalDifference);
    }

    /**
     * @notice Enable or disable mock mode for a token
     */
    function toggleMockMode(address token, bool enabled) external onlyOwner {
        mockMode[token] = enabled;
        emit MockModeToggled(token, enabled);
    }

    /**
     * @notice Enable or disable invert mode for a token
     */
    function setInvertMode(address token, bool enabled) external onlyOwner {
        invertMode[token] = enabled;
    }

    /**
     * @notice Add address to whitelist
     */
    function addToWhitelist(address user) external onlyOwner {
        require(user != address(0), "Cannot whitelist zero address");
        whitelist[user] = true;
    }

    /**
     * @notice Remove address from whitelist
     */
    function removeFromWhitelist(address user) external onlyOwner {
        whitelist[user] = false;
    }

    /**
     * @dev String comparison helper
     */
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
