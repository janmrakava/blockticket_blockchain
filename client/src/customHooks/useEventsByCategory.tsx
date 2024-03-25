import { useParams } from 'react-router-dom';
import { useEventsByCategory as useEventsByCategoryQuery } from '../api/homeQueries';
export const useEventsByCategory = (): any => {
  const params = useParams();
  const category = params.category ?? '';

  const {
    data: eventsByCategoryData,
    error: eventsByCategoryError,
    isLoading: eventsByCatagoryIsLoading
  } = useEventsByCategoryQuery(category);

  const eventsData = eventsByCategoryData as unknown as Event[] | null;

  return {
    eventsData,
    eventsByCatagoryIsLoading,
    eventsByCategoryError
  };
};
