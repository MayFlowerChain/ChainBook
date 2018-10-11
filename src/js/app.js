App = {
    web3Provider: null,
    contracts: {},
    account: null,
    openid: '1234',

    init: function () {

        return App.initWeb3();
    },

    initWeb3: function () {
        /*
         * Replace me...
         */
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // Set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function () {
        $.getJSON('AccountBookHelper.json', function (data) {
            var AccountBook = data;

            // TruffleContract 是合约的二进制接口的一个封装
            App.contracts.AccountBook = TruffleContract(AccountBook);
            // 为TruffleContract设置Provider
            App.contracts.AccountBook.setProvider(App.web3Provider);
            // 根据openid获取address
            App.contracts.AccountBook.deployed().then(function (instance) {
                return instance.openidToOwner(App.openid)
            }).then(function (address) {
                if (address == 0) {
                    console.log('未注册，现在注册')
                    App.account = App.register(App.openid)
                } else {
                    console.log('已经注册')
                    App.account = address
                }
                // 初始化资源
                console.log(App.account)
                App.getAccountBookSummaryByStartTimeAndEndTime();
                App.getBillsByOwner();
            })
        })
    },

    register: function (openid) {
        // 创建新账户
        newAccount = web3.personal.newAccount(openid)
        // 解锁
        web3.personal.unlockAccount(newAccount, openid, 100000000)
        // 转账
        web3.eth.sendTransaction({from: web3.eth.accounts[0], to: newAccount, value: web3.toWei(1)})
        App.contracts.AccountBook.deployed().then(function (instance) {
            instance.createUser(openid, {from: newAccount})
        })

        return newAccount
    },


    getBillsByOwner: function () {

        // web3.eth.getAccounts(function(err, accounts) {
        //     var account = accounts[0]
        //     console.log(account);
        // })


        App.contracts.AccountBook.deployed().then(function (instance) {

            return instance.getBillsByOwner({from: App.account});
        }).then(function (ids) {
            // console.log(JSON.parse(JSON.stringify(ids)))
            html = "";
            for (id of ids) {
                (function (id) {
                    id = JSON.parse(JSON.stringify(id));
                    console.log(id);

                    App.contracts.AccountBook.deployed().then(function (instance) {
                        return instance.bills(id)
                    }).then(function (result) {
                        bill = JSON.parse(JSON.stringify((result)))
                        // console.log(bill)
                        html += "<tr class=\"success\">\n" +
                            "            <td>\n" +
                            timestampToTime(bill[2]) +
                            "            </td>\n" +
                            "            <td>\n" +
                            primaryCategory(bill[0]) +
                            "            </td>\n" +
                            "            <td>\n" +
                            SecondaryCategory(bill[1]) +
                            "            </td>\n" +
                            "            <td>\n" +
                            bill[3] +
                            "            </td>\n" +
                            "          </tr>"
                        // console.log(html)
                    }).catch(function (err) {
                        console.log(err.message);
                    })
                })(id)
            }
            setTimeout(function () {
                // console.log("html"+html)
                $('#tbody').html(html)
            }, 100)


        }).catch(function (err) {
            console.log(err.message);
        })

    },

    getAccountBookSummaryByStartTimeAndEndTime: function () {
        income = 0
        expend = 0
        App.contracts.AccountBook.deployed().then(function (instance) {

            return instance.getAccountBookSummaryByStartTimeAndEndTime(1539090455, 1549190455, {from: App.account});
        }).then(function (ids) {
            income = JSON.parse(JSON.stringify(ids))[0];
            expend = JSON.parse(JSON.stringify(ids))[1];
        }).catch(function (err) {
            console.log(err.message);
        })

        setTimeout(function () {
            $('#income').html(income)
            $('#expend').html(expend)
        }, 100)
    },


    handleAdopt: function (event) {
        event.preventDefault();

        var petId = parseInt($(event.target).data('id'));

        web3.eth.getAccounts(function (err, accounts) {
            var account = accounts[0]
            App.contracts.Adoption.deployed().then(function (instance) {
                adopterInstance = instance;
                return adopterInstance.adopt(petId, {from: account}).call();
            }).then(function (result) {
                return App.markAdopted();
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    }

};


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
    window.location.href = './createBill.html?address='+App.account
}


$(function () {
    $(window).load(function () {
        App.init();
    });
});
