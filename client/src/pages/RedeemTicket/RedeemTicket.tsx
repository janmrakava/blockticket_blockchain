/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Alert, Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { StyledGridForm, StyledForm } from './styled';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import { type FormEvent, useEffect, useState } from 'react';
import { redeemTicket, verifyTicket } from '../../utils/smartContractFunctions/TicketContract';
import { useSDK } from '@metamask/sdk-react';

const RedeemTicket: React.FC = () => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  const [showSuccessSnackBar, setSuccessShowSnackBar] = useState<boolean>(false);
  const [showErrorSnackBar, setErrorShowSnackBar] = useState<boolean>(false);
  const [ticketID, setTicketID] = useState<string>('');
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setTicketID(value);
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const response = await verifyTicket(ticketID);
      if (response && account) {
        const redeemedTicket = await redeemTicket(ticketID, account);
        if (redeemedTicket) {
          setSuccessShowSnackBar(true);
          setTimeout(() => {
            setSuccessShowSnackBar(false);
          }, 2500);
        } else {
          setErrorShowSnackBar(true);
          setTimeout(() => {
            setErrorShowSnackBar(false);
          }, 2500);
        }
      } else {
        setErrorShowSnackBar(true);
        setTimeout(() => {
          setErrorShowSnackBar(false);
        }, 2500);
      }
    } catch (error) {
      setErrorShowSnackBar(true);
      setTimeout(() => {
        setErrorShowSnackBar(false);
      }, 2500);
    }
  };
  return (
    <Grid
      container
      sx={{
        maxWidth: '1228px',
        margin: '0 auto',
        color: '#fff',
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '200px'
      }}>
      <Grid item xs={12} md={12} lg={12}>
        <Typography sx={{ fontSize: '30px', fontWeight: 900, padding: '20px' }}>
          Stránka pro uplatnění vstupenky
        </Typography>
      </Grid>
      <StyledGridForm item xs={12} md={12} lg={12}>
        <StyledForm
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}>
          <TextField
            label={appLanguage === 'cs' ? 'ID Vstupenky' : 'Ticket ID'}
            variant="filled"
            value={ticketID}
            placeholder={appLanguage === 'cs' ? 'ID Vstupenky' : 'ID Ticket'}
            name="eventName"
            type="text"
            onChange={handleChange}
            sx={{ background: '#4B4958', borderRadius: '5px' }}
            InputProps={{
              style: { color: '#80797B' }
            }}
            fullWidth
          />
          <Button type="submit" variant="contained">
            {appLanguage === 'cs' ? 'Uplatit vstupenku' : 'Redeemed Ticket'}
          </Button>
        </StyledForm>
      </StyledGridForm>
      <Snackbar
        open={showErrorSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          Vstupenka není platná
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Uplatnění vstupenky bylo úspěšné
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default RedeemTicket;
