/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
import { getTicketsForSale } from '../../utils/smartContractFunctions/TicketContract';
import { type ITicketFromContract } from '../../customHooks/useMyTickets';
import { type IEventContract } from '../Home/Home';
import { getEventInfo } from '../../utils/smartContractFunctions/EventContract';

export const useTicketMarkets = (): any => {
  const [ticketsForSale, setTicketsForSale] = useState<ITicketFromContract[]>();
  const [events, setEvents] = useState<Record<string, IEventContract>>({});
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchTicketsForSale = async (): Promise<void> => {
      try {
        const tickets = await getTicketsForSale();
        setTicketsForSale(tickets);
      } catch (error) {
        setIsError(true);
      }
    };
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
  return {
    ticketsForSale,
    events,
    isError,
    isLoading
  };
};
