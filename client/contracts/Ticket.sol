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
    uint256 originalPrice;
    bool forSale;
    uint256 salePrice;
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

  function setEventContractAddress(address _eventContractAddress) external {
    eventContractAddress = _eventContractAddress;
  }

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
  event TicketReturned(bytes32 ticketID, address sender, uint256 refundAmount);
  event TicketRefunded(bytes32 ticketID, address ticketOwner, uint256 refundAmount);
  event EventCancelled(bytes32 eventID);

  event TicketSetForSale(bytes32 ticketID);
  event TicketSaleCancelled(bytes32 ticketID);
  event TicketPurchasedFromMarket(
    bytes32 ticketID,
    address oldOwner,
    address newOwner,
    uint256 price
  );

  // constructor for create new instance of TicketContract
  constructor(address _eventContractAddress) {
    eventContractAddress = _eventContractAddress;
  }
  // modifier - check if request send EventContract
  modifier onlyEventContract() {
    require(msg.sender == eventContractAddress, 'Unauthorized: caller is not the event contract');
    _;
  }
  // modifier - check if ticket is not redeemed yet. If yes user cant sell tickets to others
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
  // @param _eventID is ID of event, for which is ticket
  // @param _buyer is address of user, which ticket buy
  // @param _tickerPrice is price of the ticket
  // @ return - ID of new ticket
  // Definice Solidity eventů pro debugging
  event Debug(bytes32 indexed message, bytes32 data);
  event DebugUint(string message, uint256 data);

  function createNewTicket(
    bytes32 _eventID,
    uint256 _ticketPrice
  ) external payable onlyEventContract returns (bytes32) {
    bytes32 ticketID = keccak256(abi.encodePacked(_eventID, msg.sender, block.timestamp));
    uint64 _purchasedDate = uint64(block.timestamp);
    allTickets[ticketID] = Ticket({
      ticketID: ticketID,
      eventID: _eventID,
      ticketOwner: msg.sender,
      purchasedDate: _purchasedDate,
      isRedeemed: false,
      isValid: true,
      ticketPrice: _ticketPrice,
      originalPrice: _ticketPrice,
      forSale: false,
      salePrice: 0
    });
    ticketsByEvent[_eventID].push(ticketID);
    allTicketIDs.push(ticketID);
    totalTickets++;

    ticketIndexInEvent[ticketID] = ticketsByEvent[_eventID].length - 1;

    emit TicketCreated(ticketID, _eventID, _purchasedDate, msg.sender, _ticketPrice);

    return ticketID;
  }
  // function to change ownership of the ticket, its for selling tickets between users
  // @param _eventID is ID of event, for which is ticket
  // @param _buyer is address of user, which ticket buy
  // @return - bool value for FE handling
  function transferTicket(
    bytes32 _ticketID
  ) external payable noReentrancy isNotRedeemed(_ticketID) {
    Ticket storage ticket = allTickets[_ticketID];
    require(msg.value == ticket.ticketPrice, 'Transfer amount must match the ticket price.');
    require(ticket.isValid, 'Ticket is not valid.');

    address oldOwner = ticket.ticketOwner;
    ticket.ticketOwner = msg.sender;
    ticket.ticketPrice = msg.value;

    payable(oldOwner).transfer(msg.value);
    emit TicketTransferred(_ticketID, oldOwner, msg.sender, msg.value);
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
  // Function to return a ticket and refund the purchase price
  function returnTicket(bytes32 _ticketID) external {
    Ticket storage ticket = allTickets[_ticketID];
    require(ticket.ticketOwner == msg.sender, 'Only the ticket owner can return the ticket.');
    require(!ticket.isRedeemed, 'Ticket has already been redeemed.');
    require(ticket.isValid, 'Ticket is not valid.');

    uint256 refundAmount = ticket.originalPrice;
    address payable ownerPayable = payable(msg.sender);

    ownerPayable.transfer(refundAmount);

    removeTicketFromEventList(ticket.eventID, _ticketID);
    delete allTickets[_ticketID];
    delete ticketIndexInEvent[_ticketID];

    emit TicketReturned(_ticketID, msg.sender, refundAmount);
  }
  // Function to remove a ticket from the ticketsByEvent mapping
  function removeTicketFromEventList(bytes32 _eventId, bytes32 _ticketID) private {
    uint index = ticketIndexInEvent[_ticketID];
    uint lastIndex = ticketsByEvent[_eventId].length - 1;
    if (index != lastIndex) {
      bytes32 lastTicketID = ticketsByEvent[_eventId][lastIndex];
      ticketsByEvent[_eventId][index] = lastTicketID;
      ticketIndexInEvent[lastTicketID] = index;
    }
    ticketsByEvent[_eventId].pop();
  }
  // function to delete tickets, return all eth for ticketOwners atc. when event is cancelled
  function cancelAllTickets(bytes32 eventId) external onlyEventContract {
    bytes32[] storage tickets = ticketsByEvent[eventId];

    if (tickets.length == 0) {
      emit EventCancelled(eventId);
      delete ticketsByEvent[eventId];
      return;
    }

    for (uint i = 0; i < tickets.length; i++) {
      bytes32 ticketId = tickets[i];
      Ticket storage ticket = allTickets[ticketId];

      if (ticket.isValid && !ticket.isRedeemed) {
        uint256 refundAmount = ticket.originalPrice;
        address payable ticketOwner = payable(ticket.ticketOwner);

        ticket.isValid = false;

        require(address(this).balance >= refundAmount, 'Insufficient balance to make refunds');
        (bool sent, ) = ticketOwner.call{value: refundAmount}('');
        require(sent, 'Failed to send Ether');

        emit TicketRefunded(ticketId, ticketOwner, refundAmount);
        removeTicketFromAllTickets(ticketId);
        totalTickets--;
      }

      delete allTickets[ticketId];
      delete ticketIndexInEvent[ticketId];
    }

    delete ticketsByEvent[eventId];
    emit EventCancelled(eventId);
  }

  function removeTicketFromAllTickets(bytes32 ticketId) private {
    uint index = ticketIndexInEvent[ticketId];
    uint lastIndex = allTicketIDs.length - 1;

    if (index != lastIndex) {
      bytes32 lastTicketId = allTicketIDs[lastIndex];
      allTicketIDs[index] = lastTicketId;
      ticketIndexInEvent[lastTicketId] = index;
    }
    allTicketIDs.pop();
    delete ticketIndexInEvent[ticketId];
  }
  // function to set ticket for sale
  function setTicketForSale(bytes32 _ticketID, uint256 _price) external {
    Ticket storage _ticket = allTickets[_ticketID];
    require(msg.sender == _ticket.ticketOwner, 'Only the ticket owner can set it for sale.');
    require(!_ticket.isRedeemed, 'Cannot sell a redeemed ticket.');
    require(_ticket.isValid, 'Cannot sell an invalid ticket.');

    _ticket.forSale = true;
    _ticket.salePrice = _price;

    emit TicketSetForSale(_ticketID);
  }
  // function to set ticket not for sale
  function cancelTicketForSale(bytes32 _ticketID) external {
    Ticket storage _ticket = allTickets[_ticketID];
    require(msg.sender == _ticket.ticketOwner, 'Only the ticket owner can cancel the sale.');
    require(_ticket.forSale, 'Ticket is not for sale.');

    _ticket.forSale = false;
    _ticket.salePrice = 0;

    emit TicketSaleCancelled(_ticketID);
  }

  // function to buy ticket from market
  function buyTicketFromMarket(bytes32 _ticketID) external payable noReentrancy {
    Ticket storage _ticket = allTickets[_ticketID];
    require(_ticket.forSale, 'This ticket is not for sale.');
    require(
      msg.value == _ticket.salePrice,
      'Please submit the asking price in order to complete the purchase.'
    );
    require(_ticket.isValid, 'Cannot buy an invalid ticket.');

    address oldOwner = _ticket.ticketOwner;
    _ticket.ticketOwner = msg.sender;
    _ticket.forSale = false;
    _ticket.salePrice = 0;

    payable(oldOwner).transfer(msg.value);

    emit TicketPurchasedFromMarket(_ticketID, oldOwner, msg.sender, msg.value);
  }
}
