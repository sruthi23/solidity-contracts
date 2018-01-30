pragma solidity ^0.4.18;

import './StandardToken.sol';

contract ChainToken is StandardToken {

	string public constant name = "Chain Coin";
	string public  constant symbol = "CCT"; 
	uint8 public constant decimals = 18;
	uint256 public constant total_supply = 1000000  * (1 ether / 1 wei);
	address public owner;
	
	function ChainToken() public {

		totalSupply_ = total_supply;
		owner = msg.sender;
		balances[owner] = total_supply;
		
	}
	
	function approve(address _spender, uint256 _token) public returns(bool){
		
		require(balances[msg.sender] >= _token);
		super.approve(_spender,_token);
	}

}