var Tokensale = artifacts.require("./TokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(Tokensale);
};
