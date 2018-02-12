pragma solidity ^0.4.18;

import "../zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract ChainToken is StandardToken {

	string public constant name = "Chain Coin";
	string public  constant symbol = "CCT"; 
	uint8 public constant decimals = 18;
	uint256 public constant total_supply = 1000000  * (1 ether / 1 wei);
	address public owner;
	address public admin;
	
	function ChainToken() public {
		totalSupply_ = total_supply;
		owner = msg.sender;
		balances[owner] = total_supply;
	}

	function transferFrom(address _from,address _to,uint256 _value,address _admin) public{

		admin = _admin;
		transferFrom(_from, _to, _value);
	}

	function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
		require(_to != address(0));
		require(_value <= balances[_from]);
		require(_value <= allowed[_from][admin]);
		balances[_from] = balances[_from].sub(_value);
		balances[_to] = balances[_to].add(_value);
		allowed[_from][admin] = allowed[_from][admin].sub(_value);
		Transfer(_from, _to, _value);
		return true;
	}

}