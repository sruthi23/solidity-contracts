var TokenSale = artifacts.require("TokenSale");
var ChainToken = artifacts.require("ChainToken");

contract('TokenSale', function(accounts) {

	it("should assert true", async function() {
		var token;
		return await TokenSale.deployed().then(function(instance){
			token = instance;
			return token.balance(token.address);
		}).then(function(result){
			assert.equal(result.toNumber(), 1e+24, 'total supply is wrong');
			
		})
	});
	
	it("allow to set list only by admin",async function(){

		var tc = await TokenSale.deployed();
		await tc.setList(accounts[1],20);
		var token; return await TokenSale.deployed().then(function(instance){
			token = instance;
			return token.getList();
		}).then(function(result){
			assert.equal(result,accounts[1],"List is not updated");
		})
		
	});
	
	it("Reject non-admin from setting list",async function() {

		var tc =await TokenSale.deployed();
		try {
			var c = false;
			await tc.setList(accounts[2],10,{from :accounts[1]});
		}
		catch(e){

			c = true;
		}finally{

			assert.equal(c,true,"Non-admin failed to add the list");
		}
	});

	it("token transfer by admin",async function(){

		var tc = await TokenSale.deployed();
		var c = await tc.tokenTransfer(accounts[1]);
		var token; 
		return await TokenSale.deployed().then(function(instance){
			token = instance;
			return token.balance(accounts[1]);
		}).then(function(result){
			assert.equal(result,20,"Transfer failed");
		})
	});

	it("token transfer by non-admin", async function(){
		var tc = await TokenSale.deployed();
		try{
			var c =false;
			await tc.tokenTransfer('0xf17f52151ebef6c7334fad080c5704d77216b732',{from :accounts[1]});
		}
		catch(e){

			c = true;
		}finally{

			assert.equal(c,true,"token transfer by non-admin");
		}
	});

	it("approving admin to transfer token", async function(){
		var tc = await TokenSale.deployed();
		var token = await tc.demotoken.call();
		await ChainToken.at(token).then(function(i){return i.approve(accounts[0],2,{from :accounts[1]})});
		var token; 
		return TokenSale.deployed().then(function(instance)	{
			token = instance;
			return token.allowance.call(accounts[1],accounts[0]);
		})

	})

	it("should transfer token to accounts[2]", async function(){
		var tc = await TokenSale.deployed();
		await tc.tokenTransferFrom(accounts[1],accounts[2],2,{from :accounts[0]});
		var token; 
		return await TokenSale.deployed().then(function(instance){
			token = instance;
			return token.balance.call(accounts[2]);
		}).then(function(result){
			
			assert.equal(result,2,"accounts[1] not approved accounts[0] to spend tokens");
		})
	})

});