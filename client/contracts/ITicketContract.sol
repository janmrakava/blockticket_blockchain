// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface ITicketContract {
  function createNewTicket(bytes32 _eventID, uint256 _ticketPrice) external returns (bytes32);

  function cancelAllTickets(bytes32 eventId) external;
}
