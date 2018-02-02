var Tokensale = artifacts.require("./TokenSale.sol");

module.exports = function(deployer, network, accounts) {
	deployer.deploy(Tokensale).then(async () => {
		const instance = await Tokensale.deployed();
		const token = await instance.token.call();
		console.log('Token Address', token);
	});
};