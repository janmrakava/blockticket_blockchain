/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Web3 from 'web3';
import EventContract from '../../../build/contracts/ContractEvent.json';

import { type INewEvent } from '../../pages/CreateEvent';



const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const eventContractABI = EventContract.abi;
const addressContract = EventContract.networks[5777].address;
const eventContractInstance = new web3.eth.Contract(
  eventContractABI,
  addressContract
);


// METHOD TO CONVERT DATE TO UINT64 VALUE
export const dateToUint64 = (date: Date): bigint => {
  const uint64Value = date.getTime();
  return uint64Value as unknown as bigint;
};

//  METHOD TO GET INFO ABOUT ALL EVENTS
export const getAllEventsFromContract = async (): Promise<any> => {
  const response = await eventContractInstance.methods.getEvents().call();
  return response;
};
// METHOD TO GET INFO ABOUT ONE EVENT WITH ID
export const getEventInfo = async (eventID: string): Promise<any> => {
  const response = await eventContractInstance.methods.getEventInfo(eventID).call();
  return response;
};
// METHOD TO GET INFO ABOUT EVENT WITH CATEGORY
export const getEventsByCategory = async (category: string): Promise<any> => {
  const response = await eventContractInstance.methods.getEventsByCategory(category).call();
  return response;
};
// METHOD TO GET EVENT BY OWNER
export const getEventsByOwner = async (userAddress: string): Promise<any> => {
  const response = await eventContractInstance.methods
    .getEventsForOwner()
    .call({ from: userAddress });
  return response;
};

// METHOD TO CREATE NEW EVENT
export const createNewEvent = async (
  dateUINT64: bigint,
  newEventInfo: INewEvent,
  userAddress: string
): Promise<any> => {
  const gasLimit = '500000';
  const response = await eventContractInstance.methods
    .createEvent(
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
      from: userAddress,
      gas: gasLimit
    });
  return response;
};
// METHOD TO UPDATE TICKET PRICE
export const updateTicketPrice = async (
  eventID: string,
  newTicketPrice: number,
  userAddress: string
): Promise<any> => {
  const response = await eventContractInstance.methods
    .updateTicketPrice(eventID, newTicketPrice)
    .send({ from: userAddress });
  return response;
};
// FUNCTION TO BUY NEW TICKET
export const buyNewTicket = async (eventID: string, userAddress: string): Promise<any> => {
  try {
    const response = await eventContractInstance.methods
      .buyTicket(eventID, userAddress)
      .send({ from: userAddress, gas: '500000' });
    return response;
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

// FUNCTION TO CANCEL EVENT, AND RETURN ALL FUNDS TO TICKETOWNERS
export const cancelEvent = async (eventID: string, userAddress: string): Promise<any> => {

  const response = await eventContractInstance.methods
    .cancelEvent(eventID)
    .send({ from: userAddress });
  return response;
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function findEventInTransactions(eventID: string) {
  const latestBlock = await web3.eth.getBlockNumber();
  let eventFound = false;

  for (let i = 0; i <= latestBlock; i++) {
    const block = await web3.eth.getBlock(i, true);

    if (block.transactions && block.transactions.length > 0) {
      for (let j = 0; j < block.transactions.length; j++) {
        let tx: any = block.transactions[j];

        if (typeof tx === 'string') {
          tx = await web3.eth.getTransaction(tx);
        }

        const receipt = await web3.eth.getTransactionReceipt(tx.hash);
        const logs = receipt.logs;

        logs.forEach((log) => {
          const eventTopic = web3.eth.abi.encodeEventSignature({
            type: 'event',
            name: 'EventCreated',
            inputs: [{ type: 'bytes32', name: 'eventID' }]
          });
          if (log.topics?.includes(eventTopic)) {
            if (log.data) {
              const decodedData = web3.eth.abi.decodeParameters(['bytes32'], log.data as string);
              const loggedEventID = decodedData[0];
              if (loggedEventID === eventID) {
                console.log(
                  'Found EventCreated event with eventID:',
                  eventID,
                  'in transaction log:',
                  log
                );
                eventFound = true;
              }
            }
          }
        });
      }
    }
  }

  if (!eventFound) {
    console.log('Event with eventID', eventID, 'not found in transaction logs.');
  }
}

export async function findEventInTransactionsAllData(eventID: string) {
  const latestBlock = await web3.eth.getBlockNumber();
  let eventFound = false;

  for (let i = 0; i <= latestBlock; i++) {
    const block = await web3.eth.getBlock(i, true);

    if (block.transactions && block.transactions.length > 0) {
      for (let j = 0; j < block.transactions.length; j++) {
        let tx: any = block.transactions[j];

        if (typeof tx === 'string') {
          tx = await web3.eth.getTransaction(tx);
        }

        const receipt = await web3.eth.getTransactionReceipt(tx.hash);
        const logs = receipt.logs;

        logs.forEach((log) => {
          const eventTopic = web3.eth.abi.encodeEventSignature({
            type: 'event',
            name: 'EventCreated',
            inputs: [
              { type: 'bytes32', name: 'eventID' },
              { type: 'string', name: 'eventName' },
              { type: 'uint64', name: 'dateOfEvent' },
              { type: 'uint64', name: 'numberOfTickets' },
              { type: 'uint64', name: 'ticketPrice' },
              { type: 'string', name: 'placeName' },
              { type: 'string', name: 'eventDescription' },
              { type: 'string', name: 'eventCategory' },
              { type: 'string', name: 'eventImage' }
            ]
          });
          if (log.topics?.includes(eventTopic)) {
            if (log.data) {
              const decodedData = web3.eth.abi.decodeParameters(['bytes32'], log.data as string);
              const loggedEventID = decodedData[0];
              if (loggedEventID === eventID) {
                console.log(
                  'Found EventCreated event with eventID:',
                  eventID,
                  'in transaction log:',
                  log
                );
                const decoded = web3.eth.abi.decodeLog(
                  [
                    { type: 'bytes32', name: 'eventID' },
                    { type: 'string', name: 'eventName' },
                    { type: 'uint64', name: 'dateOfEvent' },
                    { type: 'uint64', name: 'numberOfTickets' },
                    { type: 'uint64', name: 'ticketPrice' },
                    { type: 'string', name: 'placeName' },
                    { type: 'string', name: 'eventDescription' },
                    { type: 'string', name: 'eventCategory' },
                    { type: 'string', name: 'eventImage' }
                  ],
                  web3.utils.bytesToHex(log.data),
                  log.topics.map((topic) => web3.utils.bytesToHex(topic))
                );
                console.log(decoded);
                eventFound = true;
              }
            }
          }
        });
      }
    }
  }

  if (!eventFound) {
    console.log('Event with eventID', eventID, 'not found in transaction logs.');
  }
}
