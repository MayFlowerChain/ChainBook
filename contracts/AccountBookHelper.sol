pragma solidity ^0.4.20;

import "./AccountBookFactory.sol";


contract AccountBookHelper is AccountBookFactory {

    function getBillsByOwner() 
        external 
        view 
        returns(uint[])
    {
        uint[] memory result = new uint[](ownerBillCount[msg.sender]);
        uint counter = 0;
        for (uint i = 0; i < bills.length; i++) {
            if (billToOwner[i] == msg.sender) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getAccountBookSummaryByStartTimeAndEndTime(uint32 _startTime, uint32 _endTime) 
        public 
        view 
        returns(uint256 inCome, uint256 expend)
    {
        for (uint i = 0; i < bills.length; i++) {
            if (billToOwner[i] == msg.sender && compareTimestamp(bills[i].createTime, _startTime, _endTime)) {
                Bill storage bill = bills[i];
                if (bill.primaryCategory == PrimaryCategory.InCome) {
                    inCome += bill.amount;
                }else if (bill.primaryCategory == PrimaryCategory.Expend) {
                    expend += bill.amount;
                }
            }
        }
    }

    function compareTimestamp(uint32 _compareTime, uint32 _startTime, uint32 _endTime) 
        internal 
        pure 
        returns(bool) 
    {
        return (_compareTime > _startTime && _compareTime < _endTime);
    }

    
    


}