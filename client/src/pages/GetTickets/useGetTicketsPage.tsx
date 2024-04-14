/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { type IEventContract } from '../Home/Home';
import { getEventInfo } from '../../utils/smartContractFunctions/EventContract';

/***
 * TODO remove any okay
 */

export const useGetTicketsPage = (): any => {
  const params = useParams();

  const [event, setEvent] = useState<IEventContract>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchEvent = async (): Promise<void> => {
      try {
        const eventId = params.eventId;
        if (!eventId) {
          setError(true);
        } else {
          const response = await getEventInfo(eventId);
          console.log('eventID USEeFFECT: ', eventId);

          setEvent(response);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchEvent();
  }, []);
  return {
    event,
    error,
    isLoading
  };
};
