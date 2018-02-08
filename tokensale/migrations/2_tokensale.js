var TokenSale = artifacts.require('./TokenSale');

module.exports = function(deployer, network, accounts) {
	deployer.deploy(TokenSale).then(async () => {
		const instance = await TokenSale.deployed();
		const token = await instance.demotoken.call();
		console.log('Token Address', token);
	});
};



