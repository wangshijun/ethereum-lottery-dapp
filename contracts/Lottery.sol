pragma solidity ^0.4.17;

contract Lottery {
    address public owner;
    address[] public players;

    constructor() public {
        owner = msg.sender;
    }

    function participate() public payable {
        require(msg.value >= .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public ownerOnly {
        require(players.length > 0);

        uint index = random() % players.length;
        players[index].transfer(address(this).balance);

        players = new address[](0);
    }

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    function getPlayers() public view returns(address[]) {
        return players;
    }
}
