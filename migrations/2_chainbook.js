var UserInterface = artifacts.require("UserInterface");
// var B= artifacts.require("B");
var UserFactory = artifacts.require("UserFactory");
var UserLibrary = artifacts.require("UserLibrary");
var AccountBook = artifacts.require("AccountBook");
var User = artifacts.require("User");


module.exports = function(deployer) {
  deployer.deploy(UserInterface);
  deployer.deploy(UserFactory);
  deployer.deploy(UserLibrary);
  deployer.deploy(AccountBook);
  // deployer.deploy(B);
};