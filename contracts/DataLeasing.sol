// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataLeasing {
    address public owner;
    
    struct Dataset {
        string description;
        uint256 price;
        address uploader;
        bool available; // Added to track dataset availability
    }

    struct Lease {
        uint256 duration;
        uint256 startTime;
    }

    uint256 public datasetCount;
    mapping(uint256 => Dataset) public datasets;
    mapping(address => uint256[]) public userDatasets;
    mapping(uint256 => mapping(address => Lease)) public leasedData;

    event DataUploaded(address indexed uploader, uint256 indexed dataId, string description, uint256 price);
    event DataLeased(address indexed uploader, address indexed user, uint256 indexed dataId, uint256 duration);
    event OwnershipTransferred(address indexed uploader, uint256 indexed dataId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function uploadData(string memory description, uint256 price) external {
        require(bytes(description).length > 0, "Description cannot be empty");
        require(price > 0, "Price should be greater than zero");

        uint256 dataId = datasetCount;
        datasets[dataId] = Dataset(description, price, msg.sender, true); // Mark dataset as available
        userDatasets[msg.sender].push(dataId);
        datasetCount++;

        emit DataUploaded(msg.sender, dataId, description, price);
    }

    function leaseData(uint256 dataId, uint256 duration) external payable {
        require(duration > 0, "Duration should be greater than zero");
        require(datasets[dataId].available, "Dataset not available for leasing");
        require(msg.value >= datasets[dataId].price, "Insufficient payment");

        leasedData[dataId][msg.sender] = Lease(duration, block.timestamp);

        // Transfer payment to uploader
        payable(datasets[dataId].uploader).transfer(msg.value);

        emit DataLeased(datasets[dataId].uploader, msg.sender, dataId, duration);

        // Mark dataset as unavailable during lease
        datasets[dataId].available = false;
    }

    function withdraw() external {
        uint256 amount = address(this).balance;
        require(amount > 0, "No balance to withdraw");

        payable(msg.sender).transfer(amount);
    }

    function withdrawOwner() external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "No balance to withdraw");

        payable(owner).transfer(amount);
    }

    function getDataOwner(uint256 dataId) public view returns (address) {
        return datasets[dataId].uploader;
    }

    function getUserDatasets() external view returns (uint256[] memory) {
        return userDatasets[msg.sender];
    }

    function accessData(uint256 dataId) external {
        address dataOwner = getDataOwner(dataId);
        require(dataOwner != address(0), "Data does not exist");

        Lease memory lease = leasedData[dataId][msg.sender];
        require(block.timestamp >= lease.startTime + lease.duration, "Ownership not expired yet");

        emit OwnershipTransferred(dataOwner, dataId);
        delete datasets[dataId]; // Delete the dataset after access
    }
}
