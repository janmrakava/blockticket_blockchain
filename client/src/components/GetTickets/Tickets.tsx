/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
import { Alert, Box, Button, Divider, Grid, Snackbar, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { useSDK } from '@metamask/sdk-react';
import { buyNewTicket } from '../../utils/smartContractFunctions/EventContract';
import { useNavigate } from 'react-router-dom';

const TicketsBanner: React.FC<ITicketsProps> = ({
  eventID,
  ticketPrice,
  ticketsLeft,
  fetchEvent
}) => {
  const [account, setAccount] = useState<string>();
  const [showSuccessfullSnackBar, setShowSuccessfullSnackBar] = useState<boolean>(false);
  const [showErrorSnackBar, setShowErrorSnackBar] = useState<boolean>(false);

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
  const navigate = useNavigate();

  const handleClickBuyTicket = async (): Promise<void> => {
    try {
      if (account) {
        const response = await buyNewTicket(eventID, account);
        setShowSuccessfullSnackBar(true);
        fetchEvent();
        setTimeout(() => {
          setShowSuccessfullSnackBar(false);
          navigate('/mytickets');
        }, 2500);
      }
    } catch (error) {
      setShowErrorSnackBar(true);
      setTimeout(() => {
        setShowErrorSnackBar(false);
        navigate('/mytickets');
      }, 2500);
    }
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
          {ticketsLeft?.toString() === '0' ? (
            <Typography sx={{ fontWeight: '900', marginTop: '10px' }}>VYPRODÁNO</Typography>
          ) : (
            <Button variant="contained" sx={{ marginTop: '10px' }} onClick={handleClickBuyTicket}>
              Koupit
            </Button>
          )}
        </Box>
      </Box>
      <Snackbar
        open={showErrorSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.gettickets.errorbuy`} />
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessfullSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.gettickets.successbuy`} />
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export const Tickets = memo(TicketsBanner);
