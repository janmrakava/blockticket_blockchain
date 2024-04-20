// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract TicketContract {
  struct Ticket {
    bytes32 ticketID;
    bytes32 eventID;
    address ticketOwner;
    uint64 purchasedDate;
    bool isRedeemed;
    bool isValid;
    uint256 ticketPrice;
  }
  //mapping for allTickets for the TicketContract
  mapping(bytes32 => Ticket) public allTickets;
  // mapping for allEvents but by eventID
  mapping(bytes32 => bytes32[]) public ticketsByEvent;
  // array to keep all IDs for tickets
  bytes32[] public allTicketIDs;
  // address of EventContract, only this address can create new tickets
  address public eventContractAddress;
  // number of all tickets
  uint256 public totalTickets;
  // variable for this -> The reentrancy guard is a mechanism that prevents reentry to certain functions during
  // their execution. This is particularly important for functions that involve the transfer of funds.
  bool private locked;
  // mapping for better and more optimalize indexing
  mapping(bytes32 => uint256) private ticketIndexInEvent;

  // event emitters
  event TicketTransferred(bytes32 ticketID, address from, address to, uint256 newPrice);
  event TicketCreated(
    bytes32 ticketID,
    bytes32 eventID,
    uint64 purchasedDate,
    address buyer,
    uint256 price
  );
  event TicketRedeemed(bytes32 ticketID, address redeemer);
  event TicketDeleted(bytes32 ticketID);

  constructor(address _eventContractAddress) {
    eventContractAddress = _eventContractAddress;
  }
  modifier onlyEventContract() {
    require(msg.sender == eventContractAddress, 'Unauthorized: caller is not the event contract');
    _;
  }
  modifier isNotRedeemed(bytes32 _ticketID) {
    require(!allTickets[_ticketID].isRedeemed, 'Ticket has already been redeemed.');
    _;
  }
  // modifier - The reentrancy guard is a mechanism that prevents reentry to certain functions during
  // their execution. This is particularly important for functions that involve the transfer of funds.
  modifier noReentrancy() {
    require(!locked, 'Reentrancy is not allowed');
    locked = true;
    _;
    locked = false;
  }
  // Function to create new ticket for eventID
  // returns ID of new ticket
  function createNewTicket(
    bytes32 _eventID,
    address _buyer,
    uint256 _ticketPrice
  ) external onlyEventContract returns (bytes32) {
    bytes32 ticketID = keccak256(abi.encodePacked(_eventID, _buyer, block.timestamp));
    uint64 _purchasedDate = uint64(block.timestamp);
    allTickets[ticketID] = Ticket({
      ticketID: ticketID,
      eventID: _eventID,
      ticketOwner: _buyer,
      purchasedDate: _purchasedDate,
      isRedeemed: false,
      isValid: true,
      ticketPrice: _ticketPrice
    });
    ticketsByEvent[_eventID].push(ticketID);
    allTicketIDs.push(ticketID);
    totalTickets++;

    ticketIndexInEvent[ticketID] = ticketsByEvent[_eventID].length - 1;

    emit TicketCreated(ticketID, _eventID, _purchasedDate, _buyer, _ticketPrice);

    return ticketID;
  }
  // change ownership of the ticket, transfer eth too
  function transferTicket(
    bytes32 _ticketID,
    address _newOwner
  ) external payable noReentrancy isNotRedeemed(_ticketID) {
    Ticket storage ticket = allTickets[_ticketID];
    require(ticket.ticketOwner == msg.sender, 'Only the ticket owner can transfer it.');
    require(msg.value > 0, 'Transfer amount must be greater than zero.');
    require(ticket.isValid, 'Ticket is not valid.');

    address oldOwner = ticket.ticketOwner;
    ticket.ticketOwner = _newOwner;
    ticket.ticketPrice = msg.value;

    payable(oldOwner).transfer(msg.value);
    emit TicketTransferred(_ticketID, oldOwner, _newOwner, msg.value);
  }
  // function return info about ticket with _ticketID
  function getTicketInfo(bytes32 _ticketID) external view returns (Ticket memory) {
    return allTickets[_ticketID];
  }
  // function to return array of tickets for one specific event
  function getTicketsForEvent(bytes32 _eventID) external view returns (bytes32[] memory) {
    return ticketsByEvent[_eventID];
  }
  // function to return tickets for one specific user
  function getMyTickets() external view returns (Ticket[] memory) {
    uint totalTicketsCount = 0;

    for (uint256 i = 0; i < allTicketIDs.length; i++) {
      if (allTickets[allTicketIDs[i]].ticketOwner == msg.sender) {
        totalTicketsCount++;
      }
    }

    Ticket[] memory ownedTickets = new Ticket[](totalTicketsCount);
    uint256 index = 0;
    for (uint256 i = 0; i < allTicketIDs.length; i++) {
      if (allTickets[allTicketIDs[i]].ticketOwner == msg.sender) {
        ownedTickets[index] = allTickets[allTicketIDs[i]];
        index++;
      }
    }

    return ownedTickets;
  }
  // function to flag ticket as reedeemed, which means user arrive on the event, so
  // any other function cant run
  function redeemTicket(bytes32 _ticketID) external {
    require(
      allTickets[_ticketID].ticketOwner == msg.sender,
      'Only the ticket owner can redeem it.'
    );
    require(!allTickets[_ticketID].isRedeemed, 'Ticket has already been redeemed.');
    require(allTickets[_ticketID].isValid, 'Ticket is not valid.');

    allTickets[_ticketID].isRedeemed = true;

    emit TicketRedeemed(_ticketID, msg.sender);
  }
  // function to verify ticket
  function verifyTicket(bytes32 _ticketID, bytes32 _eventID) external view returns (bool) {
    Ticket storage _ticket = allTickets[_ticketID];
    if (_ticket.ticketID != 0 && _ticket.eventID == _eventID && _ticket.isValid) {
      return true;
    } else {
      return false;
    }
  }
  // function to delete one specific ticket with id
  function deleteTicket(bytes32 _ticketID) external {
    require(
      msg.sender == allTickets[_ticketID].ticketOwner || msg.sender == eventContractAddress,
      'Unauthorized: caller is not the ticket owner or event contract'
    );

    bytes32 eventId = allTickets[_ticketID].eventID;
    uint index = ticketIndexInEvent[_ticketID];
    uint lastIndex = ticketsByEvent[eventId].length - 1;

    if (index != lastIndex) {
      bytes32 lastTicketID = ticketsByEvent[eventId][lastIndex];
      ticketsByEvent[eventId][index] = lastTicketID;
      ticketIndexInEvent[lastTicketID] = index;
    }
    ticketsByEvent[eventId].pop();
    delete ticketIndexInEvent[_ticketID];
    delete allTickets[_ticketID];

    emit TicketDeleted(_ticketID);
  }
}
