// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import './ITicketContract.sol';

contract ContractEvent {
  ITicketContract ticketContract;

  function setTicketContractAddress(address _ticketAddress) external {
    ticketContract = ITicketContract(_ticketAddress);
  }

  mapping(bytes32 => Event) public allEvents;
  mapping(bytes32 => bool) public eventExists;

  bytes32[] public eventIdsList;

  address public ticketAddress;

  // All attributes for the Events
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

  // modifier to protect the user from buying more tickets than are actually available
  modifier isEnoughTickets(bytes32 _eventID) {
    require(allEvents[_eventID].ticketsLeft > 0, 'There is no remaining tickets!');
    _;
  }
  // modifiet to prevent the event from being edited by anyone other than its owner
  modifier onlyEventOwner(bytes32 _eventID) {
    require(
      allEvents[_eventID].eventOwner == msg.sender,
      'Only the event owner can perform this action'
    );
    _;
  }
  // modifier- if event with given id even exists
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
  // function to update ticket price
  function updateTicketPrice(
    bytes32 _eventID,
    uint64 _newTicketPrice
  ) external onlyEventOwner(_eventID) eventExistsModifier(_eventID) {
    require(_newTicketPrice > 0, 'New ticket price must be greater than zero.');

    allEvents[_eventID].ticketPrice = _newTicketPrice;
    emit TicketPriceUpdated(_eventID, _newTicketPrice);
  }
  // function to return only event ids
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
  // Function to get events owned by the caller
  function getEventsForOwner() external view returns (Event[] memory) {
    uint256 count = 0;
    for (uint256 i = 0; i < eventIdsList.length; i++) {
      if (allEvents[eventIdsList[i]].eventOwner == msg.sender) {
        count++;
      }
    }

    Event[] memory ownerEvents = new Event[](count);
    uint256 index = 0;

    for (uint256 j = 0; j < eventIdsList.length; j++) {
      if (allEvents[eventIdsList[j]].eventOwner == msg.sender) {
        ownerEvents[index] = allEvents[eventIdsList[j]];
        index++;
      }
    }
    return ownerEvents;
  }
  //function to cancel event
  function cancelEvent(
    bytes32 _eventID
  ) external onlyEventOwner(_eventID) eventExistsModifier(_eventID) returns (bytes32) {
    Event storage _event = allEvents[_eventID];
    require(_event.dateOfEvent > block.timestamp, 'Cannot cancel event after it has started');

    delete allEvents[_eventID];

    for (uint i = 0; i < eventIdsList.length; i++) {
      if (eventIdsList[i] == _eventID) {
        eventIdsList[i] = eventIdsList[eventIdsList.length - 1];
        eventIdsList.pop();
        break;
      }
    }

    emit EventCancelled(_eventID);
    return _eventID;
  }
  // function to buyticket
  function buyTicket(
    bytes32 _eventID,
    address userAddress
  ) external onlyEventOwner(_eventID) eventExistsModifier(_eventID) returns (bytes32) {
    Event storage _event = allEvents[_eventID];

    bytes32 ticketID = ticketContract.createNewTicket(_eventID, _event.ticketPrice, userAddress);
    _event.ticketsLeft -= 1;
    _event.soldTickets += 1;

    emit TicketBought(_eventID, ticketID);

    return ticketID;
  }
}
