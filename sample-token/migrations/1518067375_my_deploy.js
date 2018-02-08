var MyTokenCrowdsale = artifacts.require('./MyTokenCrowdsale');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(MyTokenCrowdsale).then(async () => {
    const instance = await MyTokenCrowdsale.deployed();
    const token = await instance.token.call();
    console.log('Token Address', token);
  });
};
