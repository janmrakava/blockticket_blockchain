import Web3 from 'web3';
import TicketContract from '../../../build/contracts/TicketContract.json';
import TicketContractAddress from '../../../contractsAddress/TicketContractAddress.json';

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
// Value of 1 CZK to eth - 26.4.2024
const ONECZKTOETH = 0.000014;

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const contractABI = TicketContract;

const contractInstance = new web3.eth.Contract(contractABI.abi, TicketContractAddress.address);

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
export const verifyTicket = async (ticketID: string, eventID: string): Promise<any> => {
  const response = await contractInstance.methods.verifyTicket(ticketID, eventID).call();
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
  const response = await contractInstance.methods
    .transferTicket(ticketID)
    .send({ from: userAddress, value: ticketPrice });
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

export const buyNewTicket = async (
  eventID: string,
  ticketPrice: number,
  userAddress: string
): Promise<any> => {
  const priceInEth = ONECZKTOETH * Number(ticketPrice);
  const priceInWei = web3.utils.toWei(priceInEth.toString(), 'ether');
  console.log(eventID, priceInWei, userAddress);
  const response = await contractInstance.methods
    .createNewTicket(eventID, userAddress, priceInWei)
    .send({ from: userAddress, gas: '1000000' });
  return response;
};
