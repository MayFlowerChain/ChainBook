var UserInterface = artifacts.require("UserInterface");
// var B= artifacts.require("B");

module.exports = function(deployer) {
  deployer.deploy(UserInterface);
  // deployer.deploy(B);
};