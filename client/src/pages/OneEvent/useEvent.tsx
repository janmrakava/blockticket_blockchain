/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useParams } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { type DecodedToken } from '../Home/useHome';
import { type IUserData, getUserInfo } from '../../api/users/user';
import { type IEventContract } from '../Home/Home';
import {
  getEventInfo,
  getEventsByCategory
} from '../../utils/smartContractFunctions/EventContract';

export const useEvent = (): any => {
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

  const [event, setEvent] = useState<IEventContract>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();
  const eventId = params.eventId;
  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      try {
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
    void fetchEvents();
  }, []);

  const [similarEvents, setSimilarEvents] = useState<IEventContract[]>();
  const [errorSimilar, setErrorSimilar] = useState<boolean>(false);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(true);
  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      try {
        if (!eventId) {
          setErrorSimilar(true);
        } else {
          if (event) {
            const response = await getEventsByCategory(event?.eventCategory);
            setSimilarEvents(response);
          }
        }
      } catch (error) {
        setErrorSimilar(true);
      } finally {
        setIsLoadingSimilar(false);
      }
    };
    void fetchEvents();
  }, [event]);

  return {
    userLoggedIn,
    userData,
    event,
    isLoading,
    error,
    similarEvents,
    isLoadingSimilar,
    errorSimilar
  };
};
