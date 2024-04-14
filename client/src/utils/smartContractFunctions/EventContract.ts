import Web3 from 'web3';
import EventContract from '../../../build/contracts/ContractEvent.json';
import EventContractAddress from '../../../contractsAddress/EventContractAddress.json';
import { type INewEvent } from '../../pages/CreateEvent';

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const contractABI = EventContract;

const contractInstance = new web3.eth.Contract(contractABI.abi, EventContractAddress.address);

// METHOD TO CONVERT DATE TO UINT64 VALUE
export const dateToUint64 = (date: Date): bigint => {
  const uint64Value = date.getTime();
  return uint64Value as unknown as bigint;
};

// METHOD TO CREATE EVENTID IN BYTES32 FORMAT
export const convertToBytes32 = (str: string): string => {
  const bytes32Value = web3.utils.utf8ToHex(str).padEnd(66, '0');
  return bytes32Value;
};

//  METHOD TO GET INFO ABOUT ALL EVENTS
export const getAllEventsFromContract = async (): Promise<any> => {
  const response = await contractInstance.methods.getEvents().call();
  return response;
};
// METHOD TO GET INFO ABOUT ONE EVENT WITH ID
export const getEventInfo = async (eventID: string): Promise<any> => {
  const response = await contractInstance.methods.getEventInfo(eventID).call();
  return response;
};
// METHOD TO GET INFO ABOUT EVENT WITH CATEGORY
export const getEventsByCategory = async (category: string): Promise<any> => {
  const response = await contractInstance.methods.getEventsByCategory(category).call();
  return response;
};

// METHOD TO CREATE NEW EVENT
export const createNewEvent = async (
  eventID: string,
  dateUINT64: bigint,
  newEventInfo: INewEvent,
  account: any
): Promise<any> => {
  const response = await contractInstance.methods
    .createEvent(
      eventID,
      newEventInfo.eventName,
      dateUINT64,
      newEventInfo.numberOfTicket,
      newEventInfo.ticketPrice,
      newEventInfo.placeName,
      newEventInfo.description,
      newEventInfo.category,
      newEventInfo.imageSrc
    )
    .send({
      from: account,
      gas: '300000'
    });
  return response;
};
