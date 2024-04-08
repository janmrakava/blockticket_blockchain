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
  }

  event EventCreated(bytes32 eventID);

  //function to create an event
  function createEvent(
    bytes32 _eventID,
    string memory _eventName,
    uint64 _dateOfEvent,
    uint64 _numberOfTickets,
    uint64 _ticketPrice
  ) external {
    for (uint i = 0; i < eventIdsList.length; i++) {
      require(eventIdsList[i] != _eventID, 'Event with this ID already exists');
    }

    allEvents[_eventID].eventName = _eventName;
    allEvents[_eventID].eventID = _eventID;
    allEvents[_eventID].dateOfEvent = _dateOfEvent;
    allEvents[_eventID].numberOfTickets = _numberOfTickets;
    allEvents[_eventID].ticketPrice = _ticketPrice;
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
      uint64 ticketPrice
    )
  {
    eventId = allEvents[_eventID].eventID;
    eventName = allEvents[_eventID].eventName;
    dateOfEvent = allEvents[_eventID].dateOfEvent;
    numberOfTickets = allEvents[_eventID].numberOfTickets;
    ticketPrice = allEvents[_eventID].ticketPrice;
  }
}
