/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import {
  useEventsByCategory,
  useEventsByCityCategoryTime,
  useUniqueCities
} from '../api/homeQueries';
import { type ICityObj } from '../pages/Home';
import { EventTypes, TimeTypes } from '../utils/enum';
import { type RootState } from '../pages/store';
import { useSelector } from 'react-redux';

import { type Event } from '../utils/interfaces';
import EventBanner from '../components/EventBanners/MobileEventBanner';
import SearchResultBanner from '../components/EventBanners/SearchResultBanner';
import { CircularProgress } from '@mui/material';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { getUserInfo, type IUserData } from '../api/users/user';

export interface DecodedToken {
  userId: string;
}

export const useHome = (): any => {
  const cookies = new Cookies();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>();

  useEffect(() => {
    const token = cookies.get('authToken');

    const getUserData = async (userId: string): Promise<IUserData> => {
      const data = await getUserInfo(userId);
      return data;
    };

    if (token) {
      setUserLoggedIn(true);
      const decodedToken = jwtDecode<DecodedToken>(token);

      getUserData(decodedToken.userId)
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error('Error when loading user data', error);
        });
    }
  }, []);

  /**
   * * AppLanguage
   */
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  const [activeButton, setActiveButton] = useState<string>('music');

  const handleChangeActiveButton = (newState: string): void => {
    setActiveButton(newState);
  };

  /**
   * * States for FindBannerEvent
   */

  const [choosedCity, setChoosedCity] = useState<string>('Praha');
  const [chooseEventType, setChooseEventType] = useState<string>(EventTypes.MUSIC);
  const [choosedTime, setChoosedTime] = useState<string>(TimeTypes.WEEKEND);

  const handleCityChange = (newActive: string): void => {
    setChoosedCity(newActive);
  };

  const handleEventTypeChange = (newActive: string): void => {
    setChooseEventType(newActive);
  };
  const handleTimeTypeChange = (newActive: string): void => {
    setChoosedTime(newActive);
  };

  /**
   * * QUERIES   *
   */
  const {
    data: eventsByCategoryData,
    error: eventsByCategoryError,
    isLoading: eventsByCatagoryIsLoading
  } = useEventsByCategory(activeButton);

  const {
    data: uniqueCitiesData,
    error: uniqueCitiesError,
    isLoading: uniqueCitiesIsLoading
  } = useUniqueCities();

  const {
    data: eventsByCityCategoryTimeData,
    error: eventsByCityCategoryTimeError,
    isLoading: eventsByCityCategoryTimeIsLoading
  } = useEventsByCityCategoryTime(choosedCity, chooseEventType, choosedTime);

  const citiesObj = uniqueCitiesData as unknown as ICityObj[] | null;

  const eventsData = eventsByCategoryData as unknown as Event[] | null;

  const searchResultsData = eventsByCityCategoryTimeData as unknown as Event[];

  /**
   * * Render Event Banners
   */
  const eventBanners = eventsData ? (
    eventsData?.map((event: Event, index: number) => {
      const name = event.name[appLanguage];
      return (
        <EventBanner
          key={index}
          eventId={event._id}
          userId={userData?._id ? userData._id : ''}
          name={name || 'Unknown name'}
          date={event.date_of_the_event}
          place={event.address_id ? event.address_id.name_of_place : 'Unknown place'}
          popular={event.popular || false}
          ticketsSold={event.ticket_types.reduce((total, type) => total + type.sold, 0) || 0}
          imgSrc={event.image}
          wideScreen={index % 2 === 0}
          userLoggedIn={userLoggedIn}
          userFavoritesEvent={userData?.favorite_events ? userData.favorite_events : []}
        />
      );
    })
  ) : (
    <p>No data available</p>
  );

  const searchResults = searchResultsData ? (
    searchResultsData?.map((event: Event, index: number) => {
      const name = event.name[appLanguage];
      return (
        <SearchResultBanner
          eventId={event._id}
          userId={userData?._id ? userData._id : ''}
          key={index}
          name={name}
          date={event.date_of_the_event}
          place={event.address_id.name_of_place}
          popular={event.popular}
          ticketsSold={event.ticket_types.reduce((total, type) => total + type.sold, 0) || 0}
          imgSrc={event.image}
          userLoggedIn={userLoggedIn}
          userFavoritesEvent={
            userData?.favorite_events ? userData.favorite_events : []
          }></SearchResultBanner>
      );
    })
  ) : (
    <CircularProgress />
  );

  return {
    activeButton,
    handleChangeActiveButton,
    citiesObj,
    uniqueCitiesError,
    uniqueCitiesIsLoading,
    eventsByCategoryError,
    eventsByCatagoryIsLoading,
    eventsByCityCategoryTimeError,
    eventsByCityCategoryTimeIsLoading,
    choosedCity,
    handleCityChange,
    chooseEventType,
    handleEventTypeChange,
    choosedTime,
    handleTimeTypeChange,
    eventBanners,
    searchResults
  };
};
