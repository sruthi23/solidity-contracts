pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./MyToken.sol";


contract MyTokenCrowdsale{

  using SafeMath for uint256;
  MyToken public token;
  address public owner;


 function MyTokenCrowdsale() public{
  token = createTokenContract();
  owner = msg.sender;
 }

 // Creates ERC20 standard token
 function createTokenContract() internal returns (MyToken) {
   return new MyToken();
 }


 function sendTokens(address beneficiary, uint256 tokens) onlyOwner public {
   require(msg.sender == address(0));
   require(beneficiary != address(0));

   token.transfer(beneficiary, tokens);
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

}
