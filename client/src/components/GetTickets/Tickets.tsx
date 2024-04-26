/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
import { Box, Button, Divider, Grid } from '@mui/material';
import { memo, useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { useSDK } from '@metamask/sdk-react';
import { getAllTicketsForEvent } from '../../utils/smartContractFunctions/TicketContract';
import { buyNewTicket } from '../../utils/smartContractFunctions/EventContract';

const TicketsBanner: React.FC<ITicketsProps> = ({ eventID, ticketPrice, ticketsLeft }) => {
  const [account, setAccount] = useState<string>();
  const { sdk } = useSDK();
  useEffect(() => {
    const connect = async (): Promise<void> => {
      try {
        const accounts = await sdk?.connect();
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.log('No accounts returned by SDK');
        }
      } catch (err) {
        console.warn('failed to connect..', err);
      }
    };
    void connect();
  });
  const handleClickBuyTicket = async (): Promise<void> => {
    try {
      if (account) {
        const response = await buyNewTicket(eventID, ticketPrice, account);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTickets = async (): Promise<void> => {
    const response = await getAllTicketsForEvent(eventID);
    console.log(response);
  };
  return (
    <Grid item xs={12} md={12} lg={12}>
      <h1>
        <FormattedMessage id="app.gettickets.ticketsHeading" />
      </h1>
      <Divider sx={{ background: '#80797B', marginTop: '10px' }} />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
        <Box>
          <p style={{ fontWeight: '900' }}>Název vstupenky</p>
          <p style={{ marginTop: '20px' }}>Standardní vstupenka</p>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <p style={{ fontWeight: '900' }}>Cena</p>
          <p style={{ marginTop: '20px' }}>{ticketPrice?.toString()}</p>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <p style={{ fontWeight: '900' }}>Počet dostupných vstupenek</p>
          <p style={{ marginTop: '20px' }}>{ticketsLeft?.toString()}</p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '10px'
          }}>
          <p style={{ fontWeight: '900' }}>Koupit vstupenku</p>
          <Button variant="contained" sx={{ marginTop: '10px' }} onClick={handleClickBuyTicket}>
            Koupit
          </Button>
        </Box>
      </Box>
      <Button variant="contained" sx={{ marginTop: '10px' }} onClick={handleGetTickets}>
        dej tickets
      </Button>
    </Grid>
  );
};

export const Tickets = memo(TicketsBanner);
