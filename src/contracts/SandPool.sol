// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./ERC721.sol";
import "./ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SandPool is ERC721Enumerable, Ownable {
    using Strings for uint256;
    mapping(string => uint8) existingURIs;
    mapping(uint256 => address) public holderOf;

    address public marketOwner;
    uint256 public marketFee;
    uint256 public supply = 0;
    uint256 public totalTx = 0;

    event Sale(
        uint256 tokenId,
        address indexed owner,
        uint256 cost,
        string metadataURI,
        uint256 timestamp
    );

    struct TransactionStruct {
        uint256 tokenId;
        address owner;
        uint256 cost;
        string title;
        string description;
        string metadataURI;
        uint256 timestamp;
    }

    TransactionStruct[] transactions;
    TransactionStruct[] minted;
    TransactionStruct[] NFTsRecord;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _marketFee
    ) ERC721(_name, _symbol) {
        marketFee = _marketFee;
        marketOwner = msg.sender;
    }

    function payToMint(
        string memory title,
        uint256 salesPrice,
        string memory description,
        string memory metadataURI
    ) external {
        require(existingURIs[metadataURI] == 0, "This NFT is already minted!");
        require(msg.sender != owner(), "Sales are not allowed!");

        supply++;

        minted.push(
            TransactionStruct(
                supply,
                msg.sender,
                salesPrice,
                title,
                description,
                metadataURI,
                block.timestamp
            )
        );

        NFTsRecord.push(
            TransactionStruct(
                supply,
                msg.sender,
                salesPrice,
                title,
                description,
                metadataURI,
                block.timestamp
            )
        );

        emit Sale(supply, msg.sender, salesPrice, metadataURI, block.timestamp);

        _safeMint(msg.sender, supply);
        existingURIs[metadataURI] = 1;
        holderOf[supply] = msg.sender;
    }

    function payToBuy(uint256 tokenId) external payable {
        require(
            minted[tokenId - 1].owner != address(0),
            "The token is burned!"
        );
        require(
            msg.value >= minted[tokenId - 1].cost,
            "Ether too low for purchase!"
        );
        require(
            msg.sender != minted[tokenId - 1].owner,
            "Operation is not allowed!"
        );

        uint256 royality = (msg.value * marketFee) / 100;
        payTo(marketOwner, royality);
        payTo(minted[tokenId - 1].owner, (msg.value - royality));

        totalTx++;

        transactions.push(
            TransactionStruct(
                tokenId,
                msg.sender,
                msg.value,
                minted[tokenId - 1].title,
                minted[tokenId - 1].description,
                minted[tokenId - 1].metadataURI,
                block.timestamp
            )
        );

        NFTsRecord[tokenId - 1].owner = msg.sender;
        NFTsRecord[tokenId - 1].timestamp = block.timestamp;

        emit Sale(
            tokenId,
            msg.sender,
            msg.value,
            minted[tokenId - 1].metadataURI,
            block.timestamp
        );

        minted[tokenId - 1].owner = msg.sender;
    }

    function changePrice(
        uint256 tokenId,
        uint256 newPrice
    ) external returns (bool) {
        require(newPrice > 0 ether, "Ether too low!");
        require(
            msg.sender == minted[tokenId - 1].owner,
            "Operation is not allowed!"
        );

        minted[tokenId - 1].cost = newPrice;
        NFTsRecord[tokenId - 1].cost = newPrice;
        return true;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function changeMarketFee(uint256 _marketFee) external onlyOwner {
        marketFee = _marketFee;
    }

    function burnNFT(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
        delete minted[tokenId - 1];
        holderOf[tokenId] = address(0);
        require(
            minted[tokenId - 1].owner == address(0),
            "The tokenId doesn't exist"
        );
    }

    function reListBurnedNFT(uint256 tokenId) external onlyOwner {
        for (uint i = 0; i < NFTsRecord.length; i++) {
            if (NFTsRecord[i].tokenId == tokenId) {
                minted[tokenId - 1].tokenId = NFTsRecord[i].tokenId;
                minted[tokenId - 1].owner = NFTsRecord[i].owner;
                minted[tokenId - 1].cost = NFTsRecord[i].cost;
                minted[tokenId - 1].title = NFTsRecord[i].title;
                minted[tokenId - 1].description = NFTsRecord[i].description;
                minted[tokenId - 1].metadataURI = NFTsRecord[i].metadataURI;
                minted[tokenId - 1].timestamp = NFTsRecord[i].timestamp;
                holderOf[tokenId] = NFTsRecord[i].owner;
                _safeMint(NFTsRecord[i].owner, NFTsRecord[i].tokenId);
                return;
            }
        }
        revert("The tokenId doesn't exist");
    }

    function getMarketFee() public view returns (uint256) {
        return marketFee;
    }

    function getAllNFTs() external view returns (TransactionStruct[] memory) {
        return minted;
    }

    function getNFT(
        uint256 tokenId
    ) external view returns (TransactionStruct memory) {
        return minted[tokenId - 1];
    }

    function getAllTransactions()
        external
        view
        returns (TransactionStruct[] memory)
    {
        return transactions;
    }
}
