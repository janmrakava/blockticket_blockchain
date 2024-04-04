// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Events {
  struct Event {
    uint id;
    string name;
    string category;
    string description;
    string date;
    uint256 totalTickets;
    uint price;
    uint remainingTickets;
    address owner;
  }
  Event[] public events;

  constructor() public {
    createEvent(1, 'Pokus', 'Music', 'Description', '1.1.2025', 100, 599, 100, msg.sender);
  }

  function createEvent(
    uint _id,
    string memory _name,
    string memory _category,
    string memory _description,
    string memory _date,
    uint256 _totalTickets,
    uint _price,
    uint _remainingTickets,
    address _owner
  ) public {
    events.push(Event(_id, _name, _category, _description, _date, _totalTickets, _price, _remainingTickets, _owner));
  }
  function getAllEvents() public view returns (Event[] memory) {
    return events;
  }
}
