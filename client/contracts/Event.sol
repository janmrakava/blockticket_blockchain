// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ContractEvent {
  mapping(bytes32 => Event) public allEvents;
  bytes32[] public eventIdsList;

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

  //function to get events IDs
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

  function getEventsByCategory(string memory _category) external view returns (Event[] memory) {
    uint256 count = 0;
    for (uint256 i = 0; i < eventIdsList.length; i++) {
        if (keccak256(bytes(allEvents[eventIdsList[i]].eventCategory)) == keccak256(bytes(_category))) {
            count++;
        }
    }
    Event[] memory categoryEvents = new Event[](count);
    uint256 index = 0;

    for (uint256 j = 0; j < eventIdsList.length; j++) {
        if (keccak256(bytes(allEvents[eventIdsList[j]].eventCategory)) == keccak256(bytes(_category))) {
            categoryEvents[index] = allEvents[eventIdsList[j]];
            index++;
        }
    }
    return categoryEvents;
}
}
