var Tokensale = artifacts.require("./TokenSale.sol");
var Chaintoken = artifacts.require("./ChainToken.sol");

/*module.exports = async function(deployer, network, accounts) {

	deployer.deploy(Tokensale).then(async () => {
		const instance = await Tokensale.deployed();
		console.log(instance);
		const token = await instance.token.call();
		console.log(token);
		console.log('Token Address', token);
	});


};
*/
module.exports = async function(deployer) {
	deployer.deploy(Chaintoken).then(async () => {
		const instance = await Chaintoken.deployed();
		console.log(instance.address);
		return deployer.deploy(Tokensale,instance.address);
	})
};