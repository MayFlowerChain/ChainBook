App = {
    web3Provider: null,
    contracts: {},
    account: null,

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
            web3.eth.getAccounts(function (err, accounts) {
                App.account = accounts[7]
            });
        })
    },

    createBill: function (amount, primaryCategory, secondaryCategory) {
        App.contracts.AccountBook.deployed().then(function (instance) {
            var gasPrice = web3.eth.gasPrice;
            console.log(gasPrice.toString(10))
            return instance.createBill(amount, primaryCategory, secondaryCategory, {
                from: App.account,
                gas:3000000
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


//参数n为休眠时间，单位为毫秒:
function sleep(n) {
    var start = new Date().getTime();
    //  console.log('休眠前：' + start);
    while (true) {
        if (new Date().getTime() - start > n) {
            break;
        }
    }
    // console.log('休眠后：' + new Date().getTime());
}

function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    return Y + M + D;
}

function primaryCategory(i) {
    if (i == 0) {
        return "收入"
    } else if (i == 1) {
        return "支出"
    }
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
