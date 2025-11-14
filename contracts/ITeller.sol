// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @dev Interface for USYC Teller contract
 * Teller Address: 0x5C73E1cfdD85b7f1d608F7F7736fC8C653513B7A
 */
interface ITeller {
    /**
     * @dev Buy USYC with USDC
     * @param _amount Amount of USDC to spend
     * @return Amount of USYC received
     */
    function buy(uint256 _amount) external returns (uint256);

    /**
     * @dev Sell USYC for USDC
     * @param _amount Amount of USYC to sell
     * @return Amount of USDC received
     */
    function sell(uint256 _amount) external returns (uint256);
}
