var TokenSale = artifacts.require("TokenSale");
var ChainToken = artifacts.require("ChainToken");

contract('TokenSale', function(accounts) {

	it("should assert true", async function() {
		var tc = await TokenSale.deployed();
		assert.isTrue(true);
		console.log('token created',tc)

	});

	it("should return balance of given address", async function(){
		var tc = await TokenSale.deployed();
		var result = await tc.balance(accounts[0]);
		assert(result != 10000,"eror");
	} )
	
	it("allow to set list only by admin",async function(){

		var tc = await TokenSale.deployed();
		var b = await tc.setList('0xf17f52151ebef6c7334fad080c5704d77216b732',20);
		assert.notEqual(b,true,"failed to add in list");
		
	});

	it("Reject non-admin from setting list",async function(){

		var tc =await TokenSale.deployed();
		var c = await tc.then(function(i){return i.setList(accounts[2],10,{from :accounts[1]})});
		assert(c!=true,"failed to add list by non-admin");
	});

	it("token transfer by admin",async function(){

		var tc = await TokenSale.deployed();
		var c = await tc.tokenTransfer('0xf17f52151ebef6c7334fad080c5704d77216b732',{from :'0x627306090abab3a6e1400e9345bc60c78a8bef57'});
		var token = await tc.demotoken.call();
		console.log("c is",c);
		console.log("token address",token);
		assert(c != true,"failed");

	});

	it("token transfer by non-admin", async function(){
		var tc = await TokenSale.deployed();
		var c = await tc.tokenTransfer('0xf17f52151ebef6c7334fad080c5704d77216b732',{from :accounts[1]});
		//console.log("c is",c);
		assert(c != true,"failed");
	})

	it("approving admin to transfer token", async function(){
		var tc = await TokenSale.deployed();
		var token = await tc.demotoken.call();
		var result = await ChainToken.at(token).then(function(i){i.approve(accounts[0],2,{from :accounts[1]})});
		assert(result != true, "not approved");
	})

	it("token transfer from", async function(){
		var tc = await TokenSale.deployed();
		var token = await tc.demotoken.call();
		var result = await ChainToken.at(token).then(function(i){i.approve(accounts[0],2,{from :accounts[1]})});
		var result = await tc.tokenTransferFrom(accounts[1],accounts[2],2,{from :accounts[0]})
		console.log("result!!!",result);	
	})



});
