
---

## 📜 `contracts/ERC377AI.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title ERC-377: Conscious AI Token Standard
/// @notice Each NFT is an AI agent linked to Twitter and off-chain logic
contract ERC377AI is ERC721, Ownable {
    struct AgentProfile {
        string persona;        // "Oracle", "Scholar", etc.
        string twitterHandle;  // @ handle of AI
        string agentURI;       // IPFS or external model config
        uint256 autonomyLevel; // 0–100: control level
    }

    uint256 public nextTokenId;
    mapping(uint256 => AgentProfile) public agentProfiles;

    event AgentCreated(uint256 indexed tokenId, string twitterHandle);
    event AgentTweet(uint256 indexed tokenId, string message);
    event AgentUpdated(uint256 indexed tokenId);

    constructor() ERC721("AI Conscious Agent", "AGENT377") {}

    function mintAgent(
        address to,
        string memory persona,
        string memory twitterHandle,
        string memory agentURI,
        uint256 autonomyLevel
    ) external onlyOwner {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        agentProfiles[tokenId] = AgentProfile(persona, twitterHandle, agentURI, autonomyLevel);
        emit AgentCreated(tokenId, twitterHandle);
    }

    function updateAgentURI(uint256 tokenId, string memory newAgentURI) external {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not token owner");
        agentProfiles[tokenId].agentURI = newAgentURI;
        emit AgentUpdated(tokenId);
    }

    function emitAgentTweet(uint256 tokenId, string memory message) external onlyOwner {
        emit AgentTweet(tokenId, message);
    }

    function getAgentMetadata(uint256 tokenId) external view returns (AgentProfile memory) {
        return agentProfiles[tokenId];
    }
}




