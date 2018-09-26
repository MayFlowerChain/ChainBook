pragma solidity ^0.4.20;
pragma experimental ABIEncoderV2;

contract AccountBook {
    //openid => Book
    mapping (string => Book[]) public userAccountBook;

    struct Book {
        string name;
        Payment paymentCode;
        uint date;
        uint amount;
    }

    enum Payment {
        alipay,
        wechatpay,
        cash,
        none
    }
}