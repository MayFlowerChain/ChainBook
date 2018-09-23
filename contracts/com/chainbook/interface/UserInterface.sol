pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import '../factory/UserFactory.sol';
import "../model/struct/User.sol";

contract UserInterface is UserFactory {
    function addBook(string openid, string bookName) public {
        users[openid].addBook(bookName);
    }

    function getUserBooksByOpenIdAndBookIndex(string openid, uint index) public view returns(string) {
        return users[openid].books[index].bookName;
    }

    function getUserBookNumsByOpenId(string openid) public view returns(uint256) {
        return users[openid].books.length;
    }

    function getUserBooksByOpenId(string openid) public returns(string[10]) {
        User storage user = users[openid];
        string[10] arrays;
        for(uint i = 0;i < user.books.length; i++) {
            arrays[i] = user.books[i].bookName;
        }
        return arrays;
    }
}