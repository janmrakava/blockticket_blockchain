// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ContractEvent {
  mapping(bytes32 => Event) public allEvents;
  bytes32[] public eventIdsList;

  struct Event {
    bytes32 eventID;
    string eventName;
    string placeName;
    string placeAddress;
    string eventDescription;
    string eventCategory;
    address ownerOfEvent;
    string imageSrc;
    uint64 dateOfEvent;
    uint64 numberOfTickets;
    uint64 ticketPrice;
    bool exists;
  }

  event EventCreated(bytes32 eventID);

  modifier isEventExists(bytes32 eventID) {
    require(allEvents[eventID].exists, 'Event with this id does not exit!');
    _;
  }

  //function to create an event
  function createEvent(
    bytes32 _eventID,
    string memory _eventName,
    string memory _placeName,
    string memory _placeAddress,
    string memory _eventDescription,
    string memory _eventCategory,
    string memory _imageSrc,
    uint64 _dateOfEvent,
    uint64 _numberOfTickets,
    uint64 _ticketPrice
  ) external {
    require(!allEvents[_eventID].exists, 'Event with this ID already exists!');
    require(_numberOfTickets <= 0, 'Cannot create an event without tickets');
    allEvents[_eventID].exists = true;
    allEvents[_eventID].eventName = _eventName;
    allEvents[_eventID].placeName = _placeName;
    allEvents[_eventID].placeAddress = _placeAddress;
    allEvents[_eventID].eventDescription = _eventDescription;
    allEvents[_eventID].eventCategory = _eventCategory;
    allEvents[_eventID].imageSrc = _imageSrc;
    allEvents[_eventID].dateOfEvent = _dateOfEvent;
    allEvents[_eventID].numberOfTickets = _numberOfTickets;
    allEvents[_eventID].ticketPrice = _ticketPrice;
    eventIdsList.push(_eventID);
    emit EventCreated(_eventID);
  }

  //function to get events IDs
  function getEvents() external view returns (bytes32[] memory eventList) {
    return eventIdsList;
  }
  //function to get info about event with given ID
  function getEventInfo(
    bytes32 eventID
  )
    external
    view
    isEventExists(eventID)
    returns (
      bytes32 id,
      string memory eventName,
      string memory placeName,
      string memory placeAddress,
      string memory eventDescription,
      string memory eventCategory,
      address ownerOfEvent,
      string memory imageSrc,
      uint64 dateOfEvent,
      uint64 numberOfTickets,
      uint64 ticketPrice
    )
  {
    Event memory _event = allEvents[eventID];
    return (
      _event.eventID,
      _event.eventName,
      _event.placeName,
      _event.placeAddress,
      _event.eventDescription,
      _event.eventCategory,
      _event.ownerOfEvent,
      _event.imageSrc,
      _event.dateOfEvent,
      _event.numberOfTickets,
      _event.ticketPrice
    );
  }
}
