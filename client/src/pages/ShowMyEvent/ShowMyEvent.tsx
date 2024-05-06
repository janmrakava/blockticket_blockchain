/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getEventsByOwner } from '../../utils/smartContractFunctions/EventContract';
import { useSDK } from '@metamask/sdk-react';
import MyEvent from '../../components/ShowMyEvent/MyEvent';

export interface IMyEvent {
  eventName: string;
  eventID: string;
  dateOfEvent: bigint;
  placeName: string;
  eventImage: string;
}

const ShowMyEvent: React.FC = () => {
  const [myEvents, setMyEvents] = useState<IMyEvent[]>();
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
        const events = await getEventsByOwner(account);
        setMyEvents(events);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMyEvents();
  }, [account]);

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
        justifyContent: 'center'
      }}>
      <Grid item xs={12} md={12} lg={12}>
        <Typography
          sx={{ fontSize: '30px', fontWeight: 900, padding: '20px', marginBottom: '-70px' }}>
          <FormattedMessage id="app.showmyevent.heading" />
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', gap: '20px' }}>
        {isLoading && <CircularProgress />}
        {isError && <div>Něco se nepovedlo...</div>}
        {myEvents?.length === 0 && <div>Nemáte žádné události</div>}
        {myEvents?.map((event, index) => {
          return (
            <MyEvent
              key={index}
              eventName={event.eventName}
              eventImage={event.eventImage}
              dateOfEvent={event.dateOfEvent}
              placeName={event.placeName}
              eventID={event.eventID}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ShowMyEvent;
