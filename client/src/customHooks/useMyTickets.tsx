/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

import { type DecodedToken } from './useHome';
import Cookies from 'universal-cookie';
import { useGetUserTickets } from '../api/userQueries';
import { Box, Grid, Typography } from '@mui/material';
import { type TicketWithId } from '../utils/interfaces';
import { useNavigate } from 'react-router-dom';
import { countDate } from '../utils/dateFunctions';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';
import NothingToShowBanner from '../components/FavoritesPage/NoFavoriteEvents';

export const useMyTickets = (): any => {
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
    data: ticketsData,
    isLoading: ticketsDataLoading,
    error: ticketsDataError
  } = useGetUserTickets(userId);

  const navigate = useNavigate();
  const handleNavigate = (ticketId: string, eventID: string): void => {
    navigate(`/ticketInfo/${eventID}/${ticketId}`);
  };

  const renderTickets =
    ticketsData && ticketsData.length > 0 ? (
      ticketsData?.map((ticket: TicketWithId, index: number) => {
        const renderDate = countDate(ticket.date);
        const colorTicket =
          ticket.ticket_category === 'Gold'
            ? '#E5B80B'
            : ticket.ticket_category === 'VIP'
            ? '#f08c78'
            : ticket.ticket_category === 'Platinum'
            ? '#C0C0C0'
            : '#fff';
        return (
          <Grid
            item
            xs={12}
            md={5}
            lg={3}
            key={index}
            onClick={() => {
              handleNavigate(ticket._id, ticket.event);
            }}
            sx={{
              height: '400px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px',
              backgroundImage: `url(${ticket.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <ConfirmationNumber />
              <img src="/icons_imgs/Concert.png" style={{ width: '30px' }} />
            </Box>
            <Box>
              <Typography sx={{ color: colorTicket }}>{ticket.ticket_category}</Typography>
              <Typography sx={{ fontSize: '30px', fontWeight: 800 }}>{ticket.name}</Typography>
              <Typography sx={{ fontSize: '20px' }}>{renderDate}</Typography>
              <Typography>{ticket.city}</Typography>
              <Typography>{ticket.place}</Typography>
            </Box>
          </Grid>
        );
      })
    ) : (
      <NothingToShowBanner text="notickets" />
    );

  return {
    userLoggedIn,
    renderTickets,
    ticketsDataLoading,
    ticketsDataError
  };
};
