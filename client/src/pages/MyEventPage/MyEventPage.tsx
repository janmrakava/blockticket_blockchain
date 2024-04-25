/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useSDK } from '@metamask/sdk-react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { cancelEvent, getEventsByOwner } from '../../utils/smartContractFunctions/EventContract';
import { convertToDate } from '../../utils/function';
import { InfoEventContainer } from './styled';
import { useNavigate } from 'react-router-dom';

interface IMyEvent {
  dateOfEvent: any;
  eventName: string;
  eventCategory: string;
  eventID: string;
  eventImage: string;
  eventOwner: string;
  numberOfTickets: number;
  placeName: string;
  soldTickets: number;
  ticketPrice: number;
  ticketsLeft: number;
}

const MyEventPage: React.FC = () => {
  const [myEvent, setMyEvent] = useState<IMyEvent[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchMyEvents = async (): Promise<void> => {
      if (!account) {
        setIsLoading(false);
        return;
      }
      try {
        const event = await getEventsByOwner(account);
        setMyEvent(event);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMyEvents();
  }, [account]);

  const convertedDate = convertToDate(myEvent && myEvent[0].dateOfEvent);
  const renderDate = `${convertedDate.getDate()}.${
    convertedDate.getMonth() + 1
  }.${convertedDate.getFullYear()}`;

  const handleUpdateTicketPrice = (): void => {};

  const navigate = useNavigate();

  const handleCancelEvent = async (): Promise<void> => {
    if (myEvent && account) {
      const response = await cancelEvent(myEvent[0].eventID, account);
      console.log(response);
      navigate('/showmyevents');
    }
  };

  return (
    <Grid
      container
      sx={{
        color: '#fff',
        padding: '20px',
        maxWidth: '1228px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        gap: '70px',
        justifyContent: 'center',
        paddingBottom: '200px'
      }}>
      <Grid item xs={12} md={12} lg={12}>
        <Typography
          sx={{ fontSize: '30px', fontWeight: 900, padding: '20px', marginBottom: '-70px' }}>
          <FormattedMessage id="app.myeventpage.heading" />
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{ paddingLeft: '20px', display: !isLoading || !isError ? 'none' : 'block' }}>
        {isLoading && <CircularProgress />}
        {isError && <div>Něco se nepovedlo...</div>}
      </Grid>
      {myEvent && (
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{
            paddingLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '50px'
          }}>
          <img src={myEvent[0]?.eventImage} alt="Image of event" style={{ width: '100%' }} />
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InfoEventContainer>
              <Typography sx={{ width: '50%' }}>ID události:</Typography>
              <Typography>{myEvent[0].eventID}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Název události:</Typography>
              <Typography>{myEvent[0]?.eventName}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Datum konání události:</Typography>
              <Typography>{renderDate}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Kategorie události:</Typography>
              <Typography>{myEvent[0].eventCategory}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Vlastník události:</Typography>
              <Typography>{myEvent[0].eventOwner}</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Celkový počet vstupenek:</Typography>
              <Typography>{myEvent[0].numberOfTickets.toString()} ks</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Počet dostupných vstupenek:</Typography>
              <Typography>{myEvent[0].soldTickets.toString()} ks</Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Počet prodaných vstupenek:</Typography>
              <Typography>{myEvent[0].soldTickets.toString()} ks </Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Cena vstupenky:</Typography>
              <Typography>{myEvent[0].ticketPrice.toString()} CZK </Typography>
            </InfoEventContainer>
            <InfoEventContainer>
              <Typography sx={{ width: '42%' }}>Místo konání události</Typography>
              <Typography>{myEvent[0].placeName}</Typography>
            </InfoEventContainer>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" sx={{ width: '40%' }}>
              Upravit cenu vstupenky
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ width: '40%' }}
              onClick={handleCancelEvent}>
              Smazat událost
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default MyEventPage;
