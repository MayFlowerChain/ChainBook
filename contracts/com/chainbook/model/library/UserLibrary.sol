pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

import '../struct/AccountBook.sol';
import '../../factory/UserFactory.sol';

library UserLibrary {
    function addBook(UserFactory.User storage _u, string _bookName) internal {
        _u.books.push(AccountBook.Book(_bookName));
    }
}
