var TokenSale = artifacts.require("TokenSale");

contract('TokenSale', function() {

	it("should assert true", function() {
		var tc = TokenSale.deployed();
		assert.isTrue(true);
		console.log('token created',tc)

	});
	/*it("admin should be assigned",async function(){

		var tc = await TokenSale.deployed();
		var admin = (await tc.getAdmin());
		console.log("admin",admin);
	});*/ 	 		

	it("setting list",async function(){

		var tc = await TokenSale.deployed();
		//console.log("r u there?");
		var b = await tc.setList('0xf17f52151ebef6c7334fad080c5704d77216b732',1,{from :'0x627306090abab3a6e1400e9345bc60c78a8bef57'});
		assert.notEqual(b,true,"failed to add in list");
		
	});

	it("token transfer",async function(){

		var tc = await TokenSale.deployed();
		//console.log("r u there?");
		//var b = await tc.setList('0xf17f52151ebef6c7334fad080c5704d77216b732',1,{from :'0x627306090abab3a6e1400e9345bc60c78a8bef57'});
		var c = tc.tokenTransfer('0xf17f52151ebef6c7334fad080c5704d77216b732',{from :'0x627306090abab3a6e1400e9345bc60c78a8bef57'});//tc.tokenTransfer('0xf17f52151ebef6c7334fad080c5704d77216b732');
		console.log("here!!!!!!!!",c);
		assert(c != true,"failed");
		
	});


});
