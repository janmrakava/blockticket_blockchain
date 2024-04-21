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
