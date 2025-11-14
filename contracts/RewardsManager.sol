// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title Rewards Manager
 * @dev Manages token rewards for user actions and achievements
 *
 * Features:
 * - Multiple reward tiers (Bronze, Silver, Gold, Platinum)
 * - Track rewards by action type
 * - Admin controls for reward amounts
 * - Claim history and leaderboard tracking
 * - Emergency pause functionality
 */
contract RewardsManager is Ownable, ReentrancyGuard {
    // Reward token (your Clanker coin)
    IERC20 public rewardToken;

    // Reward tiers
    enum RewardTier {
        BRONZE,    // Small rewards (posts, comments)
        SILVER,    // Medium rewards (quality content, engagement)
        GOLD,      // Large rewards (viral content, achievements)
        PLATINUM   // Epic rewards (major milestones)
    }

    // Reward action types
    enum ActionType {
        POST_CREATED,
        COMMENT_ADDED,
        CONTENT_LIKED,
        CONTENT_SHARED,
        REFERRAL,
        DAILY_LOGIN,
        WEEKLY_ACTIVE,
        ACHIEVEMENT,
        CUSTOM
    }

    // Reward configuration for each tier
    mapping(RewardTier => uint256) public tierAmounts;

    // Track total rewards earned by user
    mapping(address => uint256) public totalEarned;

    // Track rewards by action type
    mapping(address => mapping(ActionType => uint256)) public actionRewards;

    // Track claim history
    struct Claim {
        address user;
        uint256 amount;
        RewardTier tier;
        ActionType actionType;
        string reason;
        uint256 timestamp;
    }

    Claim[] public claimHistory;
    mapping(address => uint256[]) public userClaims;

    // Admin controls
    bool public paused;
    mapping(address => bool) public rewardManagers;

    // Events
    event RewardClaimed(
        address indexed user,
        uint256 amount,
        RewardTier tier,
        ActionType actionType,
        string reason,
        uint256 claimId
    );
    event TierAmountUpdated(RewardTier tier, uint256 newAmount);
    event RewardManagerAdded(address indexed manager);
    event RewardManagerRemoved(address indexed manager);
    event Paused(bool isPaused);

    constructor(address _rewardToken) Ownable(msg.sender) {
        rewardToken = IERC20(_rewardToken);

        // Set default tier amounts (can be changed by owner)
        tierAmounts[RewardTier.BRONZE] = 10 * 10**18;     // 10 tokens
        tierAmounts[RewardTier.SILVER] = 50 * 10**18;     // 50 tokens
        tierAmounts[RewardTier.GOLD] = 200 * 10**18;      // 200 tokens
        tierAmounts[RewardTier.PLATINUM] = 1000 * 10**18; // 1000 tokens

        // Owner is automatically a reward manager
        rewardManagers[msg.sender] = true;
    }

    modifier onlyRewardManager() {
        require(rewardManagers[msg.sender] || msg.sender == owner(), "Not a reward manager");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Rewards are paused");
        _;
    }

    /**
     * @dev Distribute reward to a user
     */
    function distributeReward(
        address user,
        RewardTier tier,
        ActionType actionType,
        string memory reason
    ) external onlyRewardManager whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user address");

        uint256 amount = tierAmounts[tier];
        require(amount > 0, "Invalid reward amount");

        // Check contract has enough tokens
        require(
            rewardToken.balanceOf(address(this)) >= amount,
            "Insufficient reward tokens"
        );

        // Update tracking
        totalEarned[user] += amount;
        actionRewards[user][actionType] += amount;

        // Record claim
        uint256 claimId = claimHistory.length;
        claimHistory.push(Claim({
            user: user,
            amount: amount,
            tier: tier,
            actionType: actionType,
            reason: reason,
            timestamp: block.timestamp
        }));
        userClaims[user].push(claimId);

        // Transfer reward
        require(rewardToken.transfer(user, amount), "Transfer failed");

        emit RewardClaimed(user, amount, tier, actionType, reason, claimId);
    }

    /**
     * @dev Distribute custom reward amount
     */
    function distributeCustomReward(
        address user,
        uint256 amount,
        ActionType actionType,
        string memory reason
    ) external onlyRewardManager whenNotPaused nonReentrant {
        require(user != address(0), "Invalid user address");
        require(amount > 0, "Amount must be > 0");

        require(
            rewardToken.balanceOf(address(this)) >= amount,
            "Insufficient reward tokens"
        );

        totalEarned[user] += amount;
        actionRewards[user][actionType] += amount;

        uint256 claimId = claimHistory.length;
        claimHistory.push(Claim({
            user: user,
            amount: amount,
            tier: RewardTier.BRONZE, // Default tier for custom amounts
            actionType: actionType,
            reason: reason,
            timestamp: block.timestamp
        }));
        userClaims[user].push(claimId);

        require(rewardToken.transfer(user, amount), "Transfer failed");

        emit RewardClaimed(user, amount, RewardTier.BRONZE, actionType, reason, claimId);
    }

    /**
     * @dev Batch distribute rewards to multiple users
     */
    function batchDistributeRewards(
        address[] calldata users,
        RewardTier tier,
        ActionType actionType,
        string memory reason
    ) external onlyRewardManager whenNotPaused {
        uint256 amount = tierAmounts[tier];
        uint256 totalAmount = amount * users.length;

        require(
            rewardToken.balanceOf(address(this)) >= totalAmount,
            "Insufficient reward tokens"
        );

        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            require(user != address(0), "Invalid user address");

            totalEarned[user] += amount;
            actionRewards[user][actionType] += amount;

            uint256 claimId = claimHistory.length;
            claimHistory.push(Claim({
                user: user,
                amount: amount,
                tier: tier,
                actionType: actionType,
                reason: reason,
                timestamp: block.timestamp
            }));
            userClaims[user].push(claimId);

            require(rewardToken.transfer(user, amount), "Transfer failed");

            emit RewardClaimed(user, amount, tier, actionType, reason, claimId);
        }
    }

    /**
     * @dev Get user's claim history
     */
    function getUserClaims(address user) external view returns (uint256[] memory) {
        return userClaims[user];
    }

    /**
     * @dev Get claim details
     */
    function getClaim(uint256 claimId) external view returns (
        address user,
        uint256 amount,
        RewardTier tier,
        ActionType actionType,
        string memory reason,
        uint256 timestamp
    ) {
        require(claimId < claimHistory.length, "Invalid claim ID");
        Claim memory claim = claimHistory[claimId];
        return (
            claim.user,
            claim.amount,
            claim.tier,
            claim.actionType,
            claim.reason,
            claim.timestamp
        );
    }

    /**
     * @dev Get total number of claims
     */
    function getTotalClaims() external view returns (uint256) {
        return claimHistory.length;
    }

    /**
     * @dev Get user's rewards by action type
     */
    function getUserActionRewards(address user, ActionType actionType) external view returns (uint256) {
        return actionRewards[user][actionType];
    }

    // Admin functions

    /**
     * @dev Update reward amount for a tier
     */
    function updateTierAmount(RewardTier tier, uint256 newAmount) external onlyOwner {
        require(newAmount > 0, "Amount must be > 0");
        tierAmounts[tier] = newAmount;
        emit TierAmountUpdated(tier, newAmount);
    }

    /**
     * @dev Add a reward manager
     */
    function addRewardManager(address manager) external onlyOwner {
        require(manager != address(0), "Invalid address");
        rewardManagers[manager] = true;
        emit RewardManagerAdded(manager);
    }

    /**
     * @dev Remove a reward manager
     */
    function removeRewardManager(address manager) external onlyOwner {
        rewardManagers[manager] = false;
        emit RewardManagerRemoved(manager);
    }

    /**
     * @dev Pause/unpause reward distribution
     */
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit Paused(_paused);
    }

    /**
     * @dev Fund the rewards pool
     */
    function fundRewardsPool(uint256 amount) external {
        require(
            rewardToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
    }

    /**
     * @dev Get current rewards pool balance
     */
    function getRewardsPoolBalance() external view returns (uint256) {
        return rewardToken.balanceOf(address(this));
    }

    /**
     * @dev Emergency withdraw (owner only)
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(rewardToken.transfer(owner(), amount), "Transfer failed");
    }
}
