/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

import { type DecodedToken } from './useHome';
import Cookies from 'universal-cookie';
import { useGetUserFavorites } from '../api/userQueries';
import FavoriteEventBanner from '../components/FavoritesPage/FavoriteEventBanner';
import { type Event } from '../utils/interfaces';

export const useFavorites = (): any => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get('authToken');

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (token) {
      setUserLoggedIn(true);
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserId(decodedToken.userId);
    }
  }, []);
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError
  } = useGetUserFavorites(userId);

  const favoriteEventsRender =
    userData && userData.length > 0
      ? userData.map((event: Event, index: number) => {
          return (
            <FavoriteEventBanner
              key={index}
              eventId={event._id}
              userId={userId}
              ticketsSold={event.ticket_types.reduce((total, type) => total + type.sold, 0) || 0}
              userLoggedIn={userLoggedIn}
              userFavoriteEvents={userData}
              name={event.name}
              dateOfTheEvent={event.date_of_the_event}
              image={event.image}
              place={event.address_id.name_of_place}
            />
          );
        })
      : null;

  return {
    favoriteEventsRender,
    userId,
    userLoggedIn,
    userDataLoading,
    userDataError
  };
};
