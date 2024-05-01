import { useEffect, useState } from 'react';
import { getTicketsForSale } from '../../utils/smartContractFunctions/TicketContract';
import { type ITicketFromContract } from '../../customHooks/useMyTickets';
import { type IEventContract } from '../Home/Home';
import { getEventInfo } from '../../utils/smartContractFunctions/EventContract';

export const useTicketMarkets = (): any => {
  const [ticketsForSale, setTicketsForSale] = useState<ITicketFromContract[]>();
  const [events, setEvents] = useState<IEventContract[]>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
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
    void fetchTicketsForSale();
  }, []);
  useEffect(() => {
    ticketsForSale?.forEach((item) => {
      const fetchEventsForTickets = async (): Promise<void> => {
        try {
            const response = await getEventInfo(item.eventID)
        }
      };
      void fetchEventsForTickets();
    });
  }, [ticketsForSale]);
  return {
    ticketsForSale,
    events,
    isError,
    isLoading
  };
};
