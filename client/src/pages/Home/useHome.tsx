/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';

import { type RootState } from '../store';
import { useSelector } from 'react-redux';

import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { getUserInfo, type IUserData } from '../../api/users/user';

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

  return {
    activeButton,
    handleChangeActiveButton,
    userData,
    userLoggedIn,
    appLanguage
  };
};
