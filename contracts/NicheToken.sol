// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Niche Token
 * @dev ERC20 Token with updatable metadata for creator coins
 */
contract NicheToken is ERC20, Ownable {
    // Token metadata
    string private _tokenURI;
    string private _description;
    string private _imageURL;
    string private _websiteURL;
    string private _twitterURL;
    string private _telegramURL;
    string private _discordURL;

    // Creator info
    address public creator;
    uint256 public postId;

    // Trading settings
    uint256 public creatorFeePercent = 200; // 2% (200 basis points)

    // Events
    event MetadataUpdated(string tokenURI, string description);
    event SocialLinksUpdated(string website, string twitter, string telegram, string discord);
    event ImageUpdated(string imageURL);
    event CreatorFeeUpdated(uint256 newFee);

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address _creator,
        uint256 _postId,
        string memory description
    ) ERC20(name, symbol) Ownable(msg.sender) {
        creator = _creator;
        postId = _postId;
        _description = description;

        // Mint initial supply to creator
        _mint(_creator, initialSupply * 10 ** decimals());
    }

    /**
     * @dev Update token metadata URI (IPFS or similar)
     */
    function updateTokenURI(string memory newTokenURI) external onlyOwner {
        _tokenURI = newTokenURI;
        emit MetadataUpdated(newTokenURI, _description);
    }

    /**
     * @dev Update token description
     */
    function updateDescription(string memory newDescription) external onlyOwner {
        _description = newDescription;
        emit MetadataUpdated(_tokenURI, newDescription);
    }

    /**
     * @dev Update token image
     */
    function updateImage(string memory newImageURL) external onlyOwner {
        _imageURL = newImageURL;
        emit ImageUpdated(newImageURL);
    }

    /**
     * @dev Update social media links
     */
    function updateSocialLinks(
        string memory website,
        string memory twitter,
        string memory telegram,
        string memory discord
    ) external onlyOwner {
        _websiteURL = website;
        _twitterURL = twitter;
        _telegramURL = telegram;
        _discordURL = discord;
        emit SocialLinksUpdated(website, twitter, telegram, discord);
    }

    /**
     * @dev Update creator fee percentage
     */
    function updateCreatorFee(uint256 newFeePercent) external onlyOwner {
        require(newFeePercent <= 1000, "Fee cannot exceed 10%");
        creatorFeePercent = newFeePercent;
        emit CreatorFeeUpdated(newFeePercent);
    }

    /**
     * @dev Get all token metadata
     */
    function getMetadata() external view returns (
        string memory tokenURI,
        string memory description,
        string memory imageURL,
        string memory websiteURL,
        string memory twitterURL,
        string memory telegramURL,
        string memory discordURL,
        address tokenCreator,
        uint256 tokenPostId,
        uint256 fee
    ) {
        return (
            _tokenURI,
            _description,
            _imageURL,
            _websiteURL,
            _twitterURL,
            _telegramURL,
            _discordURL,
            creator,
            postId,
            creatorFeePercent
        );
    }

    /**
     * @dev Mint new tokens (only owner)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Burn tokens
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
