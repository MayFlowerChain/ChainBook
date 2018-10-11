pragma solidity ^0.4.20;


contract AccountBookFactory {
    
    enum PrimaryCategory {
        InCome,
        Expend
    }
    
    enum SecondaryCategory {
        Eat,
        Traffic,
        General,
        Other
    }
    
    struct Bill {
        PrimaryCategory primaryCategory;
        SecondaryCategory secondaryCategory;
        uint32 createTime;
        uint256 amount;
    }
    
    Bill[] public bills;
    
    mapping (bytes32 => address) public openidToOwner;
    mapping (uint => address) public billToOwner;
    mapping (address => uint) ownerBillCount;


    function createUser(bytes32 _openid) public
    {
       openidToOwner[_openid] = msg.sender;
    }
    
    function createBill(
        uint _amount,
        uint _primaryCategory,
        uint _secondaryCategory) 
        public 
    {
        uint32 createTime = uint32(now);
        uint id = bills.push(
            Bill(
                PrimaryCategory(_primaryCategory),
                SecondaryCategory(_secondaryCategory),
                createTime,
                _amount)
            ) - 1;
        billToOwner[id] = msg.sender;
        ownerBillCount[msg.sender]++;
    }
}