/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState, useEffect } from 'react';

import { getUserTickets } from '../utils/smartContractFunctions/TicketContract';
import { useSDK } from '@metamask/sdk-react';

export interface ITicketFromContract {
  eventID: string;
  ticketID: string;
  ticketOwner: string;
  ticketPrice: number;
  forSale: boolean;
  isRedeemed: boolean;
  isValid: boolean;
  originalPrice: number;
  purchasedDate: bigint;
  salePrice: number;
}

export const useMyTickets = (): any => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [myTickets, setMyTickets] = useState<ITicketFromContract[]>();

  const [account, setAccount] = useState<string>();
  const { sdk } = useSDK();

  useEffect(() => {
    const connect = async (): Promise<void> => {
      try {
        const accounts = await sdk?.connect();
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.log('No accounts returned by SDK');
        }
      } catch (err) {
        console.warn('failed to connect..', err);
      }
    };
    void connect();
  });

  useEffect(() => {
    const fetchUserTickets = async (): Promise<void> => {
      try {
        if (account) {
          const response = await getUserTickets(account);
          setMyTickets(response);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsError(false);
      }
    };
    void fetchUserTickets();
  }, [account]);

  return {
    account,
    myTickets,
    isLoading,
    isError
  };
};
