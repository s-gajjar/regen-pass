// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract POAP is ERC721URIStorage {
    uint256 public _tokenIdCounter;

    constructor() ERC721("POAP", "POAP") {}

    function mint(string memory uri) public {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }
}