// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC20.sol";
import "./ITeller.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title Niche Liquidity Manager
 * @dev Manages liquidity provision backed by USYC treasury
 *
 * Features:
 * - Provides deep, stable liquidity for NicheToken
 * - Uses USYC yield to subsidize liquidity provision
 * - Incentivizes liquidity providers with yield share
 * - Creates confidence through treasury-backed liquidity
 */
contract NicheLiquidityManager is Ownable, ReentrancyGuard {
    IERC20 public constant USDC = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    IERC20 public constant USYC = IERC20(0x136471a34f6ef19fE571EFFC1CA711fdb8E49f2b);
    ITeller public constant TELLER = ITeller(0x5C73E1cfdD85b7f1d608F7F7736fC8C653513B7A);

    IERC20 public nicheToken;

    // Liquidity provider tracking
    struct LiquidityPosition {
        uint256 nicheAmount;
        uint256 usdcAmount;
        uint256 timestamp;
        uint256 yieldDebt; // For yield distribution
    }

    mapping(address => LiquidityPosition) public positions;
    uint256 public totalNicheLiquidity;
    uint256 public totalUSDCLiquidity;

    // Yield distribution
    uint256 public accYieldPerShare;
    uint256 public lastYieldUpdate;
    uint256 public yieldShareForLPs = 5000; // 50% of yield goes to LPs (basis points)

    // Liquidity incentives
    uint256 public minLockPeriod = 7 days;
    uint256 public earlyWithdrawalFee = 200; // 2% fee

    // Events
    event LiquidityAdded(address indexed provider, uint256 nicheAmount, uint256 usdcAmount);
    event LiquidityRemoved(address indexed provider, uint256 nicheAmount, uint256 usdcAmount);
    event YieldHarvested(address indexed provider, uint256 amount);
    event YieldUpdated(uint256 yieldAmount, uint256 accYieldPerShare);

    constructor(address _nicheToken) Ownable(msg.sender) {
        nicheToken = IERC20(_nicheToken);
    }

    /**
     * @dev Add liquidity to the pool
     * Requires balanced amounts of NicheToken and USDC
     */
    function addLiquidity(uint256 nicheAmount, uint256 usdcAmount) external nonReentrant {
        require(nicheAmount > 0 && usdcAmount > 0, "Amounts must be > 0");

        _updateYield();

        // Transfer tokens from user
        require(nicheToken.transferFrom(msg.sender, address(this), nicheAmount), "Niche transfer failed");
        require(USDC.transferFrom(msg.sender, address(this), usdcAmount), "USDC transfer failed");

        // Convert some USDC to USYC for yield generation
        uint256 usycAmount = usdcAmount / 2; // Keep 50% as USDC, convert 50% to USYC
        if (usycAmount > 0) {
            USDC.approve(address(TELLER), usycAmount);
            TELLER.buy(usycAmount);
        }

        // Update position
        LiquidityPosition storage position = positions[msg.sender];

        // Harvest existing yield first
        if (position.nicheAmount > 0) {
            _harvestYield(msg.sender);
        }

        position.nicheAmount += nicheAmount;
        position.usdcAmount += usdcAmount;
        position.timestamp = block.timestamp;
        position.yieldDebt = (position.nicheAmount * accYieldPerShare) / 1e18;

        totalNicheLiquidity += nicheAmount;
        totalUSDCLiquidity += usdcAmount;

        emit LiquidityAdded(msg.sender, nicheAmount, usdcAmount);
    }

    /**
     * @dev Remove liquidity from the pool
     */
    function removeLiquidity(uint256 nicheAmount, uint256 usdcAmount) external nonReentrant {
        LiquidityPosition storage position = positions[msg.sender];
        require(position.nicheAmount >= nicheAmount, "Insufficient Niche");
        require(position.usdcAmount >= usdcAmount, "Insufficient USDC");

        _updateYield();

        // Harvest yield first
        _harvestYield(msg.sender);

        // Check lock period and apply fee if early withdrawal
        uint256 nichePayout = nicheAmount;
        uint256 usdcPayout = usdcAmount;

        if (block.timestamp < position.timestamp + minLockPeriod) {
            uint256 nicheFee = (nicheAmount * earlyWithdrawalFee) / 10000;
            uint256 usdcFee = (usdcAmount * earlyWithdrawalFee) / 10000;

            nichePayout -= nicheFee;
            usdcPayout -= usdcFee;
        }

        // Update position
        position.nicheAmount -= nicheAmount;
        position.usdcAmount -= usdcAmount;
        position.yieldDebt = (position.nicheAmount * accYieldPerShare) / 1e18;

        totalNicheLiquidity -= nicheAmount;
        totalUSDCLiquidity -= usdcAmount;

        // Transfer tokens back to user
        require(nicheToken.transfer(msg.sender, nichePayout), "Niche transfer failed");

        // Ensure we have enough USDC (sell USYC if needed)
        uint256 usdcBalance = USDC.balanceOf(address(this));
        if (usdcBalance < usdcPayout) {
            uint256 usycToSell = usdcPayout - usdcBalance;
            USYC.approve(address(TELLER), usycToSell);
            TELLER.sell(usycToSell);
        }

        require(USDC.transfer(msg.sender, usdcPayout), "USDC transfer failed");

        emit LiquidityRemoved(msg.sender, nicheAmount, usdcAmount);
    }

    /**
     * @dev Harvest yield rewards
     */
    function harvestYield() external nonReentrant {
        _updateYield();
        _harvestYield(msg.sender);
    }

    /**
     * @dev Get pending yield for a user
     */
    function pendingYield(address user) external view returns (uint256) {
        LiquidityPosition memory position = positions[user];
        if (position.nicheAmount == 0) return 0;

        uint256 accYield = accYieldPerShare;
        uint256 usycBalance = USYC.balanceOf(address(this));

        // Calculate new yield since last update
        if (usycBalance > 0 && totalNicheLiquidity > 0) {
            // Simplified calculation for view function
            accYield = accYieldPerShare;
        }

        return ((position.nicheAmount * accYield) / 1e18) - position.yieldDebt;
    }

    /**
     * @dev Get liquidity position info
     */
    function getPosition(address user) external view returns (
        uint256 nicheAmount,
        uint256 usdcAmount,
        uint256 lockedUntil,
        uint256 pendingYieldAmount
    ) {
        LiquidityPosition memory position = positions[user];
        nicheAmount = position.nicheAmount;
        usdcAmount = position.usdcAmount;
        lockedUntil = position.timestamp + minLockPeriod;

        // Calculate pending yield
        if (position.nicheAmount > 0) {
            pendingYieldAmount = ((position.nicheAmount * accYieldPerShare) / 1e18) - position.yieldDebt;
        }
    }

    /**
     * @dev Internal yield harvest
     */
    function _harvestYield(address user) internal {
        LiquidityPosition storage position = positions[user];
        if (position.nicheAmount == 0) return;

        uint256 pending = ((position.nicheAmount * accYieldPerShare) / 1e18) - position.yieldDebt;

        if (pending > 0) {
            // Convert USYC yield to USDC for payout
            USYC.approve(address(TELLER), pending);
            uint256 usdcPayout = TELLER.sell(pending);

            require(USDC.transfer(user, usdcPayout), "Yield payout failed");
            emit YieldHarvested(user, usdcPayout);
        }

        position.yieldDebt = (position.nicheAmount * accYieldPerShare) / 1e18;
    }

    /**
     * @dev Update yield accumulation
     */
    function _updateYield() internal {
        if (totalNicheLiquidity == 0) return;

        uint256 usycBalance = USYC.balanceOf(address(this));
        if (usycBalance > 0) {
            // Calculate yield share for LPs
            uint256 yieldForLPs = (usycBalance * yieldShareForLPs) / 10000;

            if (yieldForLPs > 0) {
                accYieldPerShare += (yieldForLPs * 1e18) / totalNicheLiquidity;
                emit YieldUpdated(yieldForLPs, accYieldPerShare);
            }
        }

        lastYieldUpdate = block.timestamp;
    }

    /**
     * @dev Get total value locked
     */
    function getTVL() external view returns (uint256 nicheValue, uint256 usdcValue, uint256 usycValue) {
        nicheValue = totalNicheLiquidity;
        usdcValue = USDC.balanceOf(address(this));
        usycValue = USYC.balanceOf(address(this));
    }

    // Admin functions

    /**
     * @dev Update yield share for LPs (owner only)
     */
    function updateYieldShare(uint256 newShare) external onlyOwner {
        require(newShare <= 10000, "Invalid share");
        yieldShareForLPs = newShare;
    }

    /**
     * @dev Update lock period (owner only)
     */
    function updateLockPeriod(uint256 newPeriod) external onlyOwner {
        minLockPeriod = newPeriod;
    }

    /**
     * @dev Update early withdrawal fee (owner only)
     */
    function updateWithdrawalFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high");
        earlyWithdrawalFee = newFee;
    }

    /**
     * @dev Emergency withdraw (owner only)
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        require(IERC20(token).transfer(owner(), amount), "Transfer failed");
    }
}
