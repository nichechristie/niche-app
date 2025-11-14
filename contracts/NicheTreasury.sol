// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC20.sol";
import "./ITeller.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title Niche Treasury
 * @dev Treasury contract that backs NicheToken with USYC and distributes yield
 *
 * Features:
 * 1. Treasury Backing - NicheToken holders can redeem for USDC at backing price
 * 2. Yield Distribution - USYC appreciation is tracked and distributed to holders
 * 3. USYC Integration - Automatically converts USDC deposits to yield-bearing USYC
 * 4. Liquidity Support - Provides stable backing for liquidity pools
 */
contract NicheTreasury is Ownable, ReentrancyGuard {
    // Token addresses (Ethereum mainnet)
    IERC20 public constant USDC = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    IERC20 public constant USYC = IERC20(0x136471a34f6ef19fE571EFFC1CA711fdb8E49f2b);
    ITeller public constant TELLER = ITeller(0x5C73E1cfdD85b7f1d608F7F7736fC8C653513B7A);

    // The NicheToken this treasury backs
    IERC20 public nicheToken;

    // Yield tracking
    uint256 public lastUSYCBalance;
    uint256 public totalYieldAccrued;
    uint256 public yieldPerTokenStored;
    mapping(address => uint256) public userYieldPerTokenPaid;
    mapping(address => uint256) public yieldRewards;

    // Treasury settings
    uint256 public backingRatio = 1e18; // 1:1 backing ratio (18 decimals)
    uint256 public redemptionFee = 50; // 0.5% fee (50 basis points)
    bool public redemptionEnabled = true;

    // Events
    event Deposited(address indexed user, uint256 usdcAmount, uint256 usycReceived);
    event Redeemed(address indexed user, uint256 nicheAmount, uint256 usdcReceived);
    event YieldDistributed(uint256 yieldAmount);
    event YieldClaimed(address indexed user, uint256 amount);
    event BackingRatioUpdated(uint256 newRatio);
    event RedemptionFeeUpdated(uint256 newFee);
    event RedemptionToggled(bool enabled);

    constructor(address _nicheToken) Ownable(msg.sender) {
        nicheToken = IERC20(_nicheToken);
    }

    /**
     * @dev Update yield tracking before any token balance change
     */
    modifier updateYield(address account) {
        _updateYield();
        if (account != address(0)) {
            yieldRewards[account] = earned(account);
            userYieldPerTokenPaid[account] = yieldPerTokenStored;
        }
        _;
    }

    /**
     * @dev Deposit USDC to treasury and convert to USYC
     * This increases the backing for NicheToken
     */
    function deposit(uint256 usdcAmount) external nonReentrant updateYield(msg.sender) {
        require(usdcAmount > 0, "Amount must be > 0");

        // Transfer USDC from user
        require(USDC.transferFrom(msg.sender, address(this), usdcAmount), "USDC transfer failed");

        // Approve and buy USYC through Teller
        USDC.approve(address(TELLER), usdcAmount);
        uint256 usycReceived = TELLER.buy(usdcAmount);

        emit Deposited(msg.sender, usdcAmount, usycReceived);
    }

    /**
     * @dev Redeem NicheToken for USDC at backing price
     * Burns NicheToken and returns proportional USDC from treasury
     */
    function redeem(uint256 nicheAmount) external nonReentrant updateYield(msg.sender) {
        require(redemptionEnabled, "Redemption disabled");
        require(nicheAmount > 0, "Amount must be > 0");

        // Calculate USDC value based on backing ratio
        uint256 usdcValue = (nicheAmount * backingRatio) / 1e18;

        // Apply redemption fee
        uint256 fee = (usdcValue * redemptionFee) / 10000;
        uint256 usdcPayout = usdcValue - fee;

        // Burn NicheToken
        require(nicheToken.transferFrom(msg.sender, address(0xdead), nicheAmount), "Burn failed");

        // Sell USYC for USDC if needed
        uint256 usdcBalance = USDC.balanceOf(address(this));
        if (usdcBalance < usdcPayout) {
            uint256 usycToSell = usdcPayout - usdcBalance;
            USYC.approve(address(TELLER), usycToSell);
            TELLER.sell(usycToSell);
        }

        // Transfer USDC to user
        require(USDC.transfer(msg.sender, usdcPayout), "USDC transfer failed");

        emit Redeemed(msg.sender, nicheAmount, usdcPayout);
    }

    /**
     * @dev Claim accumulated yield rewards
     */
    function claimYield() external nonReentrant updateYield(msg.sender) {
        uint256 reward = yieldRewards[msg.sender];
        require(reward > 0, "No yield to claim");

        yieldRewards[msg.sender] = 0;

        // Convert USYC to USDC for payout
        USYC.approve(address(TELLER), reward);
        uint256 usdcPayout = TELLER.sell(reward);

        require(USDC.transfer(msg.sender, usdcPayout), "Payout failed");

        emit YieldClaimed(msg.sender, usdcPayout);
    }

    /**
     * @dev Calculate earned yield for an account
     */
    function earned(address account) public view returns (uint256) {
        uint256 balance = nicheToken.balanceOf(account);
        return ((balance * (yieldPerTokenStored - userYieldPerTokenPaid[account])) / 1e18) + yieldRewards[account];
    }

    /**
     * @dev Internal function to update yield distribution
     */
    function _updateYield() internal {
        uint256 currentUSYC = USYC.balanceOf(address(this));

        if (currentUSYC > lastUSYCBalance) {
            uint256 newYield = currentUSYC - lastUSYCBalance;
            totalYieldAccrued += newYield;

            uint256 totalSupply = nicheToken.totalSupply();
            if (totalSupply > 0) {
                yieldPerTokenStored += (newYield * 1e18) / totalSupply;
            }

            emit YieldDistributed(newYield);
        }

        lastUSYCBalance = currentUSYC;
    }

    /**
     * @dev Get treasury backing value in USDC
     */
    function getTreasuryValue() external view returns (uint256) {
        return USDC.balanceOf(address(this)) + USYC.balanceOf(address(this));
    }

    /**
     * @dev Get backing per NicheToken
     */
    function getBackingPerToken() external view returns (uint256) {
        uint256 totalSupply = nicheToken.totalSupply();
        if (totalSupply == 0) return 0;

        uint256 treasuryValue = USDC.balanceOf(address(this)) + USYC.balanceOf(address(this));
        return (treasuryValue * 1e18) / totalSupply;
    }

    // Admin functions

    /**
     * @dev Update backing ratio (owner only)
     */
    function updateBackingRatio(uint256 newRatio) external onlyOwner {
        require(newRatio > 0, "Ratio must be > 0");
        backingRatio = newRatio;
        emit BackingRatioUpdated(newRatio);
    }

    /**
     * @dev Update redemption fee (owner only)
     */
    function updateRedemptionFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee cannot exceed 10%");
        redemptionFee = newFee;
        emit RedemptionFeeUpdated(newFee);
    }

    /**
     * @dev Toggle redemption enabled/disabled (owner only)
     */
    function toggleRedemption(bool enabled) external onlyOwner {
        redemptionEnabled = enabled;
        emit RedemptionToggled(enabled);
    }

    /**
     * @dev Emergency withdraw (owner only)
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        require(IERC20(token).transfer(owner(), amount), "Transfer failed");
    }
}
