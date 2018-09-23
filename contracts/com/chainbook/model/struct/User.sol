 pragma solidity ^0.4.20;
 
 import "./AccountBook.sol";
 
 contract User{
    struct User {
        string openid;
        string userName;
        AccountBook.Book[] books;
    }
 }
