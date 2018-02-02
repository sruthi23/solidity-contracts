pragma solidity ^0.4.18;

import './ChainToken.sol';


contract TokenSale {

	ChainToken public demotoken;
	mapping(address => uint256) addresslist;
	address[] addresskey;
	uint256 public token;
	address public admin;

	event EventAdmin(address ad);

	function TokenSale() public {

		demotoken = createToken();
		admin = msg.sender;
	}  

	function createToken() internal returns(ChainToken) {

		return new ChainToken();
	}

	modifier onlyAdmin {
		
		require(msg.sender == admin);
		_;
	}

	function setList(address _adr, uint256 _token) onlyAdmin public {
		
		addresslist[_adr] = _token;
		addresskey.push(_adr);
		
	}

	function tokenTransfer (address _adr) onlyAdmin public {
		
		token = addresslist[_adr];
		require(token != 0);
		demotoken.transfer(_adr,token);
		addresslist[_adr] = 0;
	}

	function tokenTransferFrom(address from, address to, uint256 _token) onlyAdmin public {
		
		demotoken.transferFrom(from,to,_token);
	}

	function getList() public view returns(address[]){
		return addresskey;
	}
	
	function balance(address _owner) public view returns(uint256) {
		
		return demotoken.balanceOf(_owner);
	} 

}