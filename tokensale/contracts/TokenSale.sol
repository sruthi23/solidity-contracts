pragma solidity ^0.4.18;

import './ChainToken.sol';


contract TokenSale {

	ChainToken public demotoken;
	mapping (address => uint256) addresslist;
	address[] addresskey;
	uint256 public token = 0;
	address public admin;
	//uint256 public tokencount;
	uint8 public count;

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

	function setList(address _adr, uint256 _token) onlyAdmin public returns (bool) {
		addresslist[_adr] = _token;
		addresskey.push(_adr);
		//tokencount += _token;
		return true;
	}

	function tokenTransfer (address _adr) onlyAdmin public {

		require(count <= 2000);
		token = addresslist[_adr];
		require(token != 0);
		demotoken.transfer(_adr,token);
		addresslist[_adr] = 0;
		count += 1;

	}

	function tokenTransferFrom(address from, address to, uint256 _token) onlyAdmin public {

		demotoken.transferFrom(from,to,_token,admin);
	}

	function getList() public view returns(address[]){

		return addresskey;
	}

	function balance(address _owner) public view returns(uint256) {

		return demotoken.balanceOf(_owner);
	} 

	function allowance(address _owner,address _spender) public view returns(uint256) {

		return demotoken.allowance(_owner,_spender);
	}

}