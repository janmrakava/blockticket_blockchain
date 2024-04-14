import { useParams } from 'react-router-dom';
import { useGetOneEvent } from '../api/eventQueries';
import { type IEventProps } from '../components/EventBanners/HomeEventBanner';
import { useSelector } from 'react-redux';
import { type RootState } from '../pages/store';

/***
 * TODO remove any okay
 */

export const useGetTicketsPage = (): any => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  const params = useParams();

  const {
    data: eventQueryData,
    error: eventQueryError,
    isLoading: eventQueryIsLoading
  } = useGetOneEvent(params.eventId);

  const eventData = eventQueryData as unknown as IEventProps | null;

  return {
    eventData,
    eventQueryError,
    eventQueryIsLoading,
    appLanguage
  };
};
