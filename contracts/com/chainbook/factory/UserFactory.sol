pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import "../model/library/UserLibrary.sol";
import "../model/struct/AccountBook.sol";
import "../model/struct/User.sol";

// 文峰是智障!!
contract UserFactory {

    using UserLibrary for User.SUser;

    mapping (string => User.SUser) users;

    function createUser(string _openid, string _userName) public {
        users[_openid].openid = _openid;
        users[_openid].userName = _userName;
    }

    function getUserById(string _openid) public view returns (string) {
        return users[_openid].userName;
    }
}