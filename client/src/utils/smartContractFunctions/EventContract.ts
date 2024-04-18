/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Web3, { type Transaction } from 'web3';
import EventContract from '../../../build/contracts/ContractEvent.json';
import EventContractAddress from '../../../contractsAddress/EventContractAddress.json';
import { type INewEvent } from '../../pages/CreateEvent';

interface TransactionWithHash extends Transaction {
  hash: string;
}

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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function findEventInTransactions(eventID: string) {
  const latestBlock = await web3.eth.getBlockNumber();
  let eventFound = false;

  // Procházení bloků
  for (let i = 0; i <= latestBlock; i++) {
    const block = await web3.eth.getBlock(i, true); // Získání detailů o bloku včetně transakcí

    // Kontrola, zda blok obsahuje transakce
    if (block.transactions && block.transactions.length > 0) {
      // Procházení transakcí v bloku
      for (let j = 0; j < block.transactions.length; j++) {
        let tx: TransactionWithHash | string = block.transactions[j];

        if (typeof tx === 'string') {
          // Pokud tx je typu string (hash transakce), získáme transakci
          tx = await web3.eth.getTransaction(tx);
        }

        const receipt = await web3.eth.getTransactionReceipt(tx.hash);
        const logs = receipt.logs;

        // Procházení logů transakce
        logs.forEach((log) => {
          // Kontrola, zda log obsahuje událost EventCreated a zda má správné eventID
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
