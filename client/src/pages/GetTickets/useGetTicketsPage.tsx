/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { type IEventContract } from '../Home/Home';
import { getEventInfo } from '../../utils/smartContractFunctions/EventContract';

export const useGetTicketsPage = (): any => {
  const params = useParams();

  const [event, setEvent] = useState<IEventContract>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchEvent = async (): Promise<void> => {
    try {
      const eventId = params.eventId;
      if (!eventId) {
        setError(true);
      } else {
        const response = await getEventInfo(eventId);
        setEvent(response);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    void fetchEvent();
  }, []);
  return {
    event,
    fetchEvent,
    error,
    isLoading
  };
};
