/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useRef, useEffect, useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';

import SettingsImg from '../../../../../../public/icons_imgs/Settings.png';
import SupportImg from '../../../../../../public/icons_imgs/Support.png';
import OrderImg from '../../../../../../public/icons_imgs/Orders.png';
import TicketImg from '../../../../../../public/icons_imgs/Ticket.png';
import FavoritesImg from '../../../../../../public/icons_imgs/Favorites.png';
import AddEvent from '../../../../../../public/icons_imgs/AddEvent.png';

import { Avatar, Box } from '@mui/material';

import UserClickItem from './UserClickItem';
import {
  DividerThicker,
  DividerThinner,
  UserClickBox,
  UserClickTypography
} from '../../../../../styles/styles';
import LogoutItem from './LogoutItem';

import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { useGetUserInfo } from '../../../../../api/userQueries';
import { type DecodedToken } from '../../../../../customHooks/useHome';

interface IUserClickProps {
  menuShow: boolean;
  setMenuShow: (state: boolean) => void;
}

const UserClick: React.FC<IUserClickProps> = ({ menuShow, setMenuShow }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (): void => {
    setMenuShow(!menuShow);
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (menuRef.current != null && !menuRef.current.contains(e.target as Node)) {
      toggleMenu();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const cookies = new Cookies();
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const token = cookies.get('authToken');

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserId(decodedToken.userId);
    }
  }, []);

  const {
    data: userData,
    isLoading: userDataLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: userDataError
  } = useGetUserInfo(userId);

  return (
    <>
      <UserClickBox ref={menuRef}>
        <UserClickTypography variant="h5">
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            <Avatar>
              <PersonIcon></PersonIcon>
            </Avatar>
            {userDataLoading ? (
              <p>loading...</p>
            ) : (
              <p>
                {userData?.first_name} {userData?.last_name}
              </p>
            )}
            {` `}
          </Box>
        </UserClickTypography>
        <DividerThicker />
        <UserClickItem text="settings" imgSrc={SettingsImg} />
        <DividerThinner />
        <UserClickItem text="orders" imgSrc={OrderImg} />
        <DividerThinner />
        <UserClickItem text="mytickets" imgSrc={TicketImg} />
        <DividerThinner />
        <UserClickItem text="favorites" imgSrc={FavoritesImg} />
        <DividerThinner />
        <UserClickItem text="support" imgSrc={SupportImg} />
        <DividerThinner />
        {userData?.role === 'Admin' && (
          <>
            <UserClickItem text="createevent" imgSrc={AddEvent} />
            <DividerThinner />
          </>
        )}
        <LogoutItem />
        <DividerThicker />
      </UserClickBox>
    </>
  );
};
export default UserClick;
