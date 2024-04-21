// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import './Ticket.sol';

interface ITicketContract {
  function createNewTicket(
    bytes32 eventID,
    address buyer,
    uint256 ticketPrice
  ) external returns (bytes32);
  function cancelAllTickets(bytes32 eventID) external;
}

contract ContractEvent {
  ITicketContract ticketContract;

  function setTicketContractAddress(address _ticketAddress) external {
    ticketContract = ITicketContract(_ticketAddress);
  }

  mapping(bytes32 => Event) public allEvents;
  mapping(bytes32 => bool) public eventExists;

  bytes32[] public eventIdsList;

  address public ticketAddress;

  // All attributes for the Events (Maybe i need to add number of sell tickets?)
  struct Event {
    bytes32 eventID;
    string eventName;
    uint64 dateOfEvent;
    uint64 numberOfTickets;
    uint64 ticketPrice;
    uint64 ticketsLeft;
    string placeName;
    string eventDescription;
    string eventCategory;
    address eventOwner;
    string eventImage;
    uint64 soldTickets;
  }

  event EventCreated(bytes32 eventID);
  event EventCancelled(bytes32 eventID);

  event TicketPriceUpdated(bytes32 eventID, uint64 newTicketPrice);
  event TicketBought(bytes32 eventID, bytes32 ticketID);

  modifier isEnoughTickets(bytes32 _eventID) {
    require(allEvents[_eventID].ticketsLeft > 0, 'There is no remaining tickets!');
    _;
  }

  modifier onlyEventOwner(bytes32 _eventID) {
    require(
      allEvents[_eventID].eventOwner == msg.sender,
      'Only the event owner can perform this action'
    );
    _;
  }
  modifier eventExistsModifier(bytes32 _eventID) {
    require(eventExists[_eventID], 'Event does not exist');
    _;
  }
  //function to create an event
  function createEvent(
    string memory _eventName,
    uint64 _dateOfEvent,
    uint64 _numberOfTickets,
    uint64 _ticketPrice,
    string memory _placeName,
    string memory _eventDescription,
    string memory _eventCategory,
    string memory _eventImage
  ) external {
    bytes32 _eventID = keccak256(abi.encodePacked(_eventName, block.timestamp));
    require(!eventExists[_eventID], 'Event with this ID already exists');

    allEvents[_eventID] = Event({
      eventID: _eventID,
      eventName: _eventName,
      dateOfEvent: _dateOfEvent,
      numberOfTickets: _numberOfTickets,
      ticketPrice: _ticketPrice,
      ticketsLeft: _numberOfTickets,
      placeName: _placeName,
      eventDescription: _eventDescription,
      eventCategory: _eventCategory,
      eventOwner: msg.sender,
      eventImage: _eventImage,
      soldTickets: 0
    });

    eventIdsList.push(_eventID);
    eventExists[_eventID] = true;

    emit EventCreated(_eventID);
  }

  function updateTicketPrice(
    bytes32 _eventID,
    uint64 _newTicketPrice
  ) external onlyEventOwner(_eventID) eventExistsModifier(_eventID) {
    require(_newTicketPrice > 0, 'New ticket price must be greater than zero.');

    allEvents[_eventID].ticketPrice = _newTicketPrice;
    emit TicketPriceUpdated(_eventID, _newTicketPrice);
  }

  function getEventIDs() external view returns (bytes32[] memory eventList) {
    return eventIdsList;
  }

  //function to get all events
  function getEvents() external view returns (Event[] memory eventList) {
    eventList = new Event[](eventIdsList.length);
    for (uint i = 0; i < eventIdsList.length; i++) {
      eventList[i] = allEvents[eventIdsList[i]];
    }
    return eventList;
  }
  //function to get info about event with given ID
  function getEventInfo(
    bytes32 _eventID
  ) external view eventExistsModifier(_eventID) returns (Event memory) {
    return allEvents[_eventID];
  }
  //function to get events by selected category
  function getEventsByCategory(string memory _category) external view returns (Event[] memory) {
    uint256 count = 0;
    for (uint256 i = 0; i < eventIdsList.length; i++) {
      if (
        keccak256(bytes(allEvents[eventIdsList[i]].eventCategory)) == keccak256(bytes(_category))
      ) {
        count++;
      }
    }
    Event[] memory categoryEvents = new Event[](count);
    uint256 index = 0;

    for (uint256 j = 0; j < eventIdsList.length; j++) {
      if (
        keccak256(bytes(allEvents[eventIdsList[j]].eventCategory)) == keccak256(bytes(_category))
      ) {
        categoryEvents[index] = allEvents[eventIdsList[j]];
        index++;
      }
    }
    return categoryEvents;
  }
  // function to buy (Create) new ticket for the user
  function buyTicket(
    bytes32 _eventID
  ) external payable isEnoughTickets(_eventID) eventExistsModifier(_eventID) returns (bytes32) {
    Event storage _event = allEvents[_eventID];
    require(msg.value >= _event.ticketPrice, 'Insufficient funds sent');

    uint256 overpaidAmount = msg.value - _event.ticketPrice;

    bytes32 ticketID = ticketContract.createNewTicket(_eventID, msg.sender, _event.ticketPrice);
    _event.ticketsLeft -= 1;
    _event.soldTickets += 1;

    emit TicketBought(_eventID, ticketID);
    if (overpaidAmount > 0) {
      (bool refunded, ) = msg.sender.call{value: overpaidAmount}('');
      require(refunded, 'Failed to refund overpaid amount');
    }

    return ticketID;
  }
  function cancelEvent(
    bytes32 _eventID
  ) external onlyEventOwner(_eventID) eventExistsModifier(_eventID) {
    Event storage _event = allEvents[_eventID];
    require(_event.dateOfEvent > block.timestamp, 'Cannot cancel event after it has started');

    ticketContract.cancelAllTickets(_eventID);
    delete allEvents[_eventID];

    for (uint i = 0; i < eventIdsList.length; i++) {
      if (eventIdsList[i] == _eventID) {
        eventIdsList[i] = eventIdsList[eventIdsList.length - 1];
        eventIdsList.pop();
        break;
      }
    }

    emit EventCancelled(_eventID);
  }
}
