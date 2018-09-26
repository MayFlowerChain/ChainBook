 pragma solidity ^0.4.20;
 
 import "./AccountBook.sol";

 contract User {
    struct SUser {
        string openid;
        string userName;
        AccountBook.Book[] books;
    }
 }
