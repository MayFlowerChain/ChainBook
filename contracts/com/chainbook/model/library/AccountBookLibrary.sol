pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "../struct/AccountBook.sol";
import "../struct/User.sol";

library AccountBookLibrary {
    function addBook(string _openid, string _bookName, AccountBook.Payment payment, uint date, uint amount) internal {
        AccountBook.Book book = AccountBook.Book({name: _bookName, payment: _payment, 
            date: _date, amount: _amount});        
        AccountBook.userAccountBook[_openid] = book;
    }
}