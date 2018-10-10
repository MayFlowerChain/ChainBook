var AccountBookHelper = artifacts.require("AccountBookHelper");
// var B= artifacts.require("B");

module.exports = function(deployer) {
  deployer.deploy(AccountBookHelper);
};
