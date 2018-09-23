pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import './UserLibrary.sol';
import './AccountBook.sol';

// 文峰是智障
contract UserFactory {
    struct User {
        string openid;
        string userName;
        AccountBook.Book[] books;
    }
    
    using UserLibrary for User

    mapping (string => User) users;

    function createUser(string _openid, string _userName) public {
        users[_openid].openid = _openid;
        users[_openid].userName = _userName;
    }
}