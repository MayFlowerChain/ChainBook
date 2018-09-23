pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "../model/library/UserLibrary.sol";
import "../model/struct/AccountBook.sol";
import "../model/struct/User.sol";

// 文峰是智障!!
contract UserFactory {

    using UserLibrary for User;

    mapping (string => User) users;

    function createUser(string _openid, string _userName) public {
        users[_openid].openid = _openid;
        users[_openid].userName = _userName;
    }
}