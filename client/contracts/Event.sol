// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ContractEvent {
  mapping(bytes32 => Event) public allEvents;
  bytes32[] public eventIdsList;

  // All attributes for the Events (Maybe i need to add number of sell tickets?)
  struct Event {
    bytes32 eventID;
    string eventName;
    uint64 dateOfEvent;
    uint64 numberOfTickets;
    uint64 ticketPrice;
    string placeName;
    string eventDescription;
    string eventCategory;
    address eventOwner;
    string eventImage;
  }

  event EventCreated(bytes32 eventID);
  event EventCancelled(bytes32 eventID);
  event TicketPriceUpdated(bytes32 eventID, uint64 newTicketPrice);

  modifier onlyEventOwner(bytes32 _eventID) {
    require(
      allEvents[_eventID].eventOwner == msg.sender,
      'Only the event owner can perform this action'
    );
    _;
  }
  modifier eventExists(bytes32 _eventID) {
    require(allEvents[_eventID].eventID == _eventID, 'Event with this ID does not exist');
    _;
  }

  //function to create an event
  function createEvent(
    bytes32 _eventID,
    string memory _eventName,
    uint64 _dateOfEvent,
    uint64 _numberOfTickets,
    uint64 _ticketPrice,
    string memory _placeName,
    string memory _eventDescription,
    string memory _eventCategory,
    string memory _eventImage
  ) external {
    for (uint i = 0; i < eventIdsList.length; i++) {
      require(eventIdsList[i] != _eventID, 'Event with this ID already exists');
    }

    allEvents[_eventID].eventName = _eventName;
    allEvents[_eventID].eventID = _eventID;
    allEvents[_eventID].dateOfEvent = _dateOfEvent;
    allEvents[_eventID].numberOfTickets = _numberOfTickets;
    allEvents[_eventID].ticketPrice = _ticketPrice;
    allEvents[_eventID].placeName = _placeName;
    allEvents[_eventID].eventDescription = _eventDescription;
    allEvents[_eventID].eventCategory = _eventCategory;
    allEvents[_eventID].eventOwner = msg.sender;
    allEvents[_eventID].eventImage = _eventImage;
    eventIdsList.push(_eventID);
    emit EventCreated(_eventID);
  }

  function cancelEvent(bytes32 _eventID) external onlyEventOwner(_eventID) {
    require(
      allEvents[_eventID].dateOfEvent > block.timestamp,
      'Cannot cancel event after it has started'
    );
    uint64 refundedAmount = allEvents[_eventID].numberOfTickets * allEvents[_eventID].ticketPrice;
    payable(msg.sender).transfer(refundedAmount);
    delete allEvents[_eventID];
    for (uint i = 0; i < eventIdsList.length; i++) {
      if (eventIdsList[i] == _eventID) {
        delete eventIdsList[i];
        break;
      }
    }
    emit EventCancelled(_eventID);
  }
  function updateTicketPrice(
    bytes32 _eventID,
    uint64 _newTicketPrice
  ) external onlyEventOwner(_eventID) eventExists(_eventID) {
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
  )
    external
    view
    eventExists(_eventID)
    returns (
      bytes32 eventId,
      string memory eventName,
      uint64 dateOfEvent,
      uint64 numberOfTickets,
      uint64 ticketPrice,
      string memory placeName,
      string memory eventDescription,
      string memory eventCategory,
      address eventOwner,
      string memory eventImage
    )
  {
    eventId = allEvents[_eventID].eventID;
    eventName = allEvents[_eventID].eventName;
    dateOfEvent = allEvents[_eventID].dateOfEvent;
    numberOfTickets = allEvents[_eventID].numberOfTickets;
    ticketPrice = allEvents[_eventID].ticketPrice;
    placeName = allEvents[_eventID].placeName;
    eventDescription = allEvents[_eventID].eventDescription;
    eventCategory = allEvents[_eventID].eventCategory;
    eventOwner = allEvents[_eventID].eventOwner;
    eventImage = allEvents[_eventID].eventImage;
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
}
