// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract TicketContract {
  // address of event, which can create a new ticket
  address public eventAddress;

  struct Ticket {
    bytes32 ticketID;
    bytes32 eventID;
    bool isRedemeed;
    address ticketOwner;
    uint64 ticketPrice;
  }
  mapping(bytes32 => Ticket) public allTickets;
  bytes32[] public ticketIDsList;

    modifier isCalledByEventContract() {
        require(msg.sender == eventAddress, "Sender must be Event contract");
        _;
    }

  constructor(address _eventAddress) {
    eventAddress = _eventAddress;
  };



  function buyTicket (address ticketOwner, bytes32 eventID) external isCalledByEventContract() returns (uint64) {
    uint64 newTicketID = allTickets.push()

  }
}
