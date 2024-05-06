/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Web3, { type Transaction } from 'web3';
import TicketContract from '../../../build/contracts/TicketContract.json';
export interface ITicket {
  ticketID: string;
  eventID: string;
  ticketOwner: string;
  purchasedDate: number;
  isRedeemed: boolean;
  isValid: boolean;
  ticketPrice: number;
  originalPrice: number;
}
interface TransactionWithHash extends Transaction {
  hash: string;
}

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const contractABI = TicketContract.abi;
const addressContract = TicketContract.networks[5777].address;
const contractInstance = new web3.eth.Contract(contractABI, addressContract);


//  METHOD TO GET INFO ABOUT ALL TICKETS FROM ONE EVENT
export const getAllTicketsForEvent = async (eventID: string): Promise<any> => {
  const response = await contractInstance.methods.getTicketsForEvent(eventID).call();
  return response;
};
//  METHOD TO GET INFO ABOUT ONE TICKETS WITH ID
export const getOneTicketInfo = async (ticketID: string): Promise<any> => {
  const response = await contractInstance.methods.getTicketInfo(ticketID).call();
  return response;
};
//  METHOD TO GET TICKETS FOR ONE SPECIFIC OWNER
export const getUserTickets = async (userAddress: string): Promise<any> => {
  const response = await contractInstance.methods.getMyTickets().call({ from: userAddress });
  return response;
};
//  METHOD TO MARK TICKET AS REDEEM, AFTER THAT USER CANT TRANSFER TICKET TO ANYONE ELSE
export const redeemTicket = async (ticketID: string, userAddress: string): Promise<any> => {
  const response = await contractInstance.methods
    .redeemTicket(ticketID)
    .send({ from: userAddress });
  return response;
};
//  METHOD TO VERIFY TICKET FOR THE USER
export const verifyTicket = async (ticketID: string): Promise<any> => {
  const response = await contractInstance.methods.verifyTicket(ticketID).call();
  return response;
};
// METHOD TO RETURN TICKET FOR THE USER
export const returnTicket = async (ticketID: string, userAddress: string): Promise<any> => {
  const response = await contractInstance.methods
    .returnTicket(ticketID)
    .send({ from: userAddress });
  return response;
};

// METHOD TO TRANSFER TICKET FOR THE USER
export const transferTicket = async (
  ticketID: string,
  ticketPrice: string,
  userAddress: string
): Promise<any> => {
  const priceInEth = Number(ticketPrice) * 0.000014;
  const priceInWei = web3.utils.toWei(priceInEth, "ether")
  const response = await contractInstance.methods
    .transferTicket(ticketID)
    .send({ from: userAddress, value: priceInWei, gas: "500000" });
  return response;
};

// METHOD FOR USER TO SET TICKET TO SALE ON MARKET
export const setTicketForSale = async (
  ticketID: string,
  price: number,
  userAddress: string
): Promise<any> => {
  const response = await contractInstance.methods
    .setTicketForSale(ticketID, price)
    .send({ from: userAddress });
  return response;
};

// METHOD FOR USER TO SET TICKET NOT FOR SALE ON MARKET
export const cancelTicketForSale = async (ticketID: string, userAddress: string): Promise<any> => {
  const response = await contractInstance.methods
    .cancelTicketForSale(ticketID)
    .send({ from: userAddress });
  return response;
};
// METHOD TO BUY TICKET FROM MARKET
export const buyTicketFromMarket = async (
  ticketID: string,
  ticketPrice: string,
  userAddress: string
): Promise<any> => {
  const priceInWei = web3.utils.toWei(ticketPrice, 'ether');
  const response = await contractInstance.methods
    .buyTicket(ticketID)
    .send({ from: userAddress, value: priceInWei });
  return response;
};
// METHOD TO DELETE ALL TICKETS WHEN EVENTS ARE CANCELLED

export const cancelAllTickets = async (eventID: string, userAddress: string): Promise<any> => {
  const response = await contractInstance.methods
    .cancelAllTickets(eventID)
    .send({ from: userAddress });
  return response;
};

export async function findTicketInTransactions(ticketID: string): Promise<any> {
  const latestBlock = await web3.eth.getBlockNumber();
  const transactionsFound: any = [];

  for (let i = 0; i <= latestBlock; i++) {
    const block = await web3.eth.getBlock(i, true);

    if (block.transactions && block.transactions.length > 0) {
      for (let j = 0; j < block.transactions.length; j++) {
        let tx: TransactionWithHash | string = block.transactions[j];

        if (typeof tx === 'string') {
          tx = await web3.eth.getTransaction(tx);
        }

        const receipt = await web3.eth.getTransactionReceipt(tx.hash);
        const logs = receipt.logs;

        logs.forEach((log) => {
          if (log.data) {
            const dataHex = new Web3(web3.currentProvider).utils.toHex(log.data);
            if (dataHex.toLowerCase().includes(ticketID.toLowerCase())) {
              transactionsFound.push(tx);
            }
          }
        });
      }
    }
  }

  return transactionsFound;
}
// METHOD TO GET ALL EMITED EVENTS FOR TICKET WITH ID
export async function getEventsForTicketID(ticketID: string): Promise<any> {
  const events = await contractInstance.getPastEvents('allEvents', {
    filter: { ticketID },
    fromBlock: 0,
    toBlock: 'latest'
  });
  return events;
}
async function getTransactionTimestamp(transactionHash: string): Promise<bigint> {
  const transaction = await web3.eth.getTransaction(transactionHash);
  const block = await web3.eth.getBlock(transaction.blockNumber);
  return block.timestamp; 
}

// METHOD TO GET TIMESTAMP OF TRANSACTION
export async function extractEventData(events: any[]): Promise<any[]> {
  const extractedData: any[] = [];

  for (const event of events) {
    const timestamp = await getTransactionTimestamp(event.transactionHash);
    const eventData = {
      timestamp: new Date(Number(timestamp) * 1000), 
      ticketID: event.returnValues[0], 
    };
    extractedData.push(eventData);
  }

  return extractedData;
}
// METHOD TO GET ALL TICKETS MARKED AS FOR SALE
export async function getTicketsForSale(): Promise<any> {
  try {
    const response = await contractInstance.methods.getTicketsForSale().call();
    return response;
  } catch (error) {
    console.log(error);
  }
}
// METHOD TO CONVERT WEI TO ETH
export function convertToEth(price: string): string {
  if (!price) return '0';  
  const convertedPrice = web3.utils.fromWei(price, "ether");
  return convertedPrice;
}