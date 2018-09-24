pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "./AccountBook.sol";

contract AccountBookFacotry {
    //openid => Book
    mapping (uint => AccountBook.Book[]) userAccountBook;
    
    function createAccountBook(uint _openid, string _bookName, AccountBook.Payment _payment, uint _date, uint _amount) {
        AccountBook.Book[] books = userAccountBook[_openid];
        uint n = books.length++;
        books[n].name = _bookName;
        books[n].payment = _payment;
        books[n].date = _date;
        books[n].amount = _amount;
    }
    
    function getAccountBookByOpenId(uint _openid) returns (string){
        return userAccountBook[_openid][0].name;
    }
    
    function getBooksSize(uint _openid) returns (uint) {
        AccountBook.Book[] books = userAccountBook[_openid];
        uint n = books.length;
        return n;
    }
}