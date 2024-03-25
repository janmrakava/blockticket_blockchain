import { useQuery, type UseQueryResult } from 'react-query';
import { type Event } from '../utils/interfaces';
import { getEvent } from './event/event';

interface IOneEvent {
  data: Event;
  error: Error | null;
  isLoading: boolean;
  category_of_event: string;
}

const intervalMs = 3000;

export const useGetOneEvent = (id: string | undefined): UseQueryResult<IOneEvent> => {
  return useQuery(['oneEvent', id], async () => await getEvent(id), {
    refetchInterval: intervalMs
  });
};
