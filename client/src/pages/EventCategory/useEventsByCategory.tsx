import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getEventsByCategory } from '../../utils/smartContractFunctions/EventContract';
import { type IEventContract } from '../Home/Home';
import { type DecodedToken } from './EventsByCategory';
import { getUserInfo, type IUserData } from '../../api/users/user';

export const useEventsByCategory = (): any => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>();
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get('authToken');

    const getUserData = async (userId: string): Promise<IUserData> => {
      const data = await getUserInfo(userId);
      return data;
    };

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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

  const [events, setEvents] = useState<IEventContract[]>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { category } = useParams();

  useEffect(() => {
    const fetchEventsByCategory = async (): Promise<void> => {
      try {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!category) {
          setError(true);
        } else {
          const fixCategory = category.charAt(0).toUpperCase() + category.slice(1);
          const response = await getEventsByCategory(fixCategory);
          setEvents(response);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchEventsByCategory();
  }, [category]);

  return {
    category,
    events,
    isLoading,
    error,
    userData,
    userLoggedIn
  };
};
