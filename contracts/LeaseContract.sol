// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract LeaseContract {
    struct Lease {
        address leaser;
        string cid;
        uint duration;
        uint payment;
        uint startTime;
    }
    
    mapping(address => Lease) public leases;
    mapping(address => bool) public leaseExists;
    mapping(string => address) public cidToLeaser;
    mapping(string => bool) public cidExists;
    string[] public cids;
    
    event DebugLeasingStarted(address leaser, string cid, uint duration, uint payment);
    event LeaseCreated(address indexed leaser, string cid, uint duration, uint payment, uint startTime);
    event AccessTransferred(address indexed leasee, string cid);
    event RefundProcessed(address indexed leaser, uint amount);
    event LeaseUploaded(address indexed leaser, string cid, uint duration, uint payment);
    event PaymentProcessed(address indexed leaser, address indexed leasee, uint amount);
    
    modifier leaseExistsOnly(address _address) {
        require(leaseExists[_address], "Lease does not exist");
        _;
    }
    
    function leasing(string memory _cid, uint _duration, uint _payment) external {
    require(!cidExists[_cid], "CID already exists");

    // Emit debug events
    emit DebugLeasingStarted(msg.sender, _cid, _duration, _payment);
    
    Lease memory newLease = Lease(msg.sender, _cid, _duration, _payment, block.timestamp);
    leases[msg.sender] = newLease;
    leaseExists[msg.sender] = true;
    cidToLeaser[_cid] = msg.sender;
    cidExists[_cid] = true;
    cids.push(_cid);
    emit LeaseCreated(msg.sender, _cid, _duration, _payment, block.timestamp);
    accessTransfer(msg.sender);
}

    
    function accessTransfer(address _leasee) internal leaseExistsOnly(msg.sender) {
        Lease memory lease = leases[msg.sender];
        require(block.timestamp < lease.startTime + lease.duration, "Lease duration expired");
        emit AccessTransferred(_leasee, lease.cid);
    }
    
    function refund() external leaseExistsOnly(msg.sender) {
        Lease memory lease = leases[msg.sender];
        require(block.timestamp >= lease.startTime + lease.duration, "Lease duration not expired");
        payable(msg.sender).transfer(lease.payment);
        emit RefundProcessed(msg.sender, lease.payment);
        delete leases[msg.sender];
        leaseExists[msg.sender] = false;
    }
    
    function uploadLease(string memory _cid, uint _duration, uint _payment) external {
        require(!cidExists[_cid], "CID already exists");
        cidExists[_cid] = true;
        cidToLeaser[_cid] = msg.sender;
        cids.push(_cid);
        emit LeaseUploaded(msg.sender, _cid, _duration, _payment);
    }
    
    function getAllUploads() external view returns (string[] memory allCids, address[] memory allLeasers) {
        uint count = cids.length;
        allCids = new string[](count);
        allLeasers = new address[](count);
        for (uint i = 0; i < count; i++) {
            allCids[i] = cids[i];
            allLeasers[i] = cidToLeaser[cids[i]];
        }
        return (allCids, allLeasers);
    }
    
    function payment(address _leaser, address _leasee, uint _amount) external {
        require(msg.sender == _leasee, "Only leasee can make payment");
        require(leases[_leaser].leaser == _leaser, "Leaser not found");
        require(leases[_leaser].leaser == msg.sender, "Sender not authorized");
        payable(_leaser).transfer(_amount);
        emit PaymentProcessed(_leaser, _leasee, _amount);
    }
}
