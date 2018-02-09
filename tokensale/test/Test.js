var TokenSale = artifacts.require("TokenSale");

contract('TokenSale', function(accounts) {

	it("should assert true", async function() {
		var tc = await TokenSale.deployed();
		assert.isTrue(true);
		console.log('token created',tc)

	});
	
	it("allow to set list only by admin",async function(){

		var tc = await TokenSale.deployed();
		//console.log("r u there?");
		var b = await tc.setList('0xf17f52151ebef6c7334fad080c5704d77216b732',1);
		assert.notEqual(b,true,"failed to add in list");
		
	});

	it("Reject non-admin from setting list",async function(){

		var b =await TokenSale.deployed().then(function(i){return i.setList(accounts[2],1,{from :accounts[1]})});
		assert.notEqual(b,true,"failed to add list by non-admin");
	});

	it("token transfer by admin",async function(){

		var tc = await TokenSale.deployed();
		//console.log("r u there?");
		//var b = await tc.setList('0xf17f52151ebef6c7334fad080c5704d77216b732',1,{from :'0x627306090abab3a6e1400e9345bc60c78a8bef57'});
		var c = await tc.tokenTransfer('0xf17f52151ebef6c7334fad080c5704d77216b732',{from :'0x627306090abab3a6e1400e9345bc60c78a8bef57'});//tc.tokenTransfer('0xf17f52151ebef6c7334fad080c5704d77216b732');
		console.log("here!!!!!!!!",c);
		assert(c != true,"failed");

	});

	it()


});
