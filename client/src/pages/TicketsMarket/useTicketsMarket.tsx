/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
import {
  getTicketsForSale,
  transferTicket
} from '../../utils/smartContractFunctions/TicketContract';
import { type ITicketFromContract } from '../../customHooks/useMyTickets';
import { type IEventContract } from '../Home/Home';
import { getEventInfo } from '../../utils/smartContractFunctions/EventContract';
import { useSDK } from '@metamask/sdk-react';

export const useTicketMarkets = (): any => {
  const [ticketsForSale, setTicketsForSale] = useState<ITicketFromContract[]>();
  const [events, setEvents] = useState<Record<string, IEventContract>>({});
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleClickBuyButton = async (
    ticketID: string,
    ticketPrice: string,
    userAddress: string
  ): Promise<any> => {
    try {
      const response = await transferTicket(ticketID, ticketPrice, userAddress);
      console.log(response);
      void fetchTicketsForSale();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTicketsForSale = async (): Promise<void> => {
    try {
      const tickets = await getTicketsForSale();
      setTicketsForSale(tickets);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    void fetchTicketsForSale();
  }, []);

  useEffect(() => {
    const fetchEventsForTickets = async (): Promise<void> => {
      const allEvents: Record<string, IEventContract> = {};
      for (const item of ticketsForSale!) {
        try {
          const response = await getEventInfo(item.eventID);
          allEvents[item.ticketID] = response;
        } catch (error) {
          console.error('Error fetching event:', error);
          setIsError(true);
        }
      }
      setEvents(allEvents);
      setIsLoading(false);
    };

    if (ticketsForSale && ticketsForSale.length > 0) {
      void fetchEventsForTickets();
    }
  }, [ticketsForSale]);

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
  return {
    account,
    ticketsForSale,
    events,
    isError,
    isLoading,
    handleClickBuyButton
  };
};
