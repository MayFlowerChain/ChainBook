App = {
    web3Provider: null,
    contracts: {},
    account: null,
    openid: '123',

    init: function () {

        App.initWeb3();
    },

    initWeb3: function () {
        /*
         * Replace me...
         */
        if (typeof web3 !== 'undefined') {
            console.log("metamask")
            App.web3Provider = web3.currentProvider;
        } else {
            console.log("other")
            // Set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
        }

        web3 = new Web3(App.web3Provider);
        App.initContract();
    },

    initContract: function () {
        $.getJSON('AccountBookHelper.json', function (data) {
            var AccountBook = data;

            // TruffleContract 是合约的二进制接口的一个封装
            App.contracts.AccountBook = TruffleContract(AccountBook);
            // 为TruffleContract设置Provider
            App.contracts.AccountBook.setProvider(App.web3Provider);

            account = GetQueryString("address")
            if (account!=null&&account.length>0) {
                console.log(account)
                App.account = account
            }
        })
    },

    register: function (openid) {
        return App.contracts.AccountBook.deployed().then(function (instance) {
            // 创建新账户
            newAccount = web3.personal.newAccount(openid)
            // 解锁
            web3.personal.unlockAccount(newAccount, openid, 100000000)
            // 转账
            web3.eth.sendTransaction({from: web3.eth.accounts[0], to: newAccount, value: web3.toWei(1)})
            return newAccount
        })
    },

    createBill: function (amount, primaryCategory, secondaryCategory) {
        App.contracts.AccountBook.deployed().then(function (instance) {
            var gasPrice = web3.eth.gasPrice;
            console.log(gasPrice.toString(10))
            return instance.createBill(amount, primaryCategory, secondaryCategory, {
                from: App.account,
                gas: 3000000
            })
        }).then(function () {
            alert("添加成功")
            window.location.href = "./index.html"
        }).catch(function (message) {
            console.log(message)
        })
    }


};

function inCome() {
    amount = $("#income_amount").val()
    income_category = $("input[name='income_category']:checked").val()
    console.log(income_category)
    console.log(amount)
    App.createBill(amount, 0, income_category)
}

function expends() {
    amount = $("#expend_amount").val()
    expend_category = $("input[name='expend_category']:checked").val()
    console.log(expend_category)
    console.log(amount)
    App.createBill(amount, 1, expend_category)
}


/**
 * 获取URL参数
 * @param 参数名
 * @returns 参数值
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function SecondaryCategory(i) {
    if (i == 0) {
        return "吃喝"
    } else if (i == 1) {
        return "交通"
    } else if (i == 2) {
        return "日用"
    } else if (i == 3) {
        return "其他"
    }
}

function createBill() {
    window.location.href = './createBill.html'
}


$(function () {
    $(window).load(function () {
        App.init();
    });
});
