var UserInterface = artifacts.require("UserInterface");


module.exports = function(deployer) {
  deployer.deploy(UserInterface);
};