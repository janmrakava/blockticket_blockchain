/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CircularProgress, Grid } from '@mui/material';
import { EventBanner } from '../../components/GetTickets/EventBanner';
import { useGetTicketsPage } from './useGetTicketsPage';
import BreadcrumbNavigation from '../../components/EventPage/BreadcrumbNavigation';
import { Tickets } from '../../components/GetTickets/Tickets';

const GetTicketsPage: React.FC = () => {
  const { event, error, isLoading } = useGetTicketsPage();
  const decireRoute =
    event?.eventCategory === 'Sport'
      ? 'sport'
      : event?.eventCategory === 'Music'
      ? 'music'
      : event?.eventCategory === 'Family'
      ? 'family'
      : event?.eventCategory === 'Art'
      ? 'art'
      : event?.eventCategory === 'Deals'
      ? 'deals'
      : event?.eventCategory === 'VIP'
      ? 'vip'
      : '';

  return (
    <>
      <Grid
        container
        sx={{
          color: 'white',
          maxWidth: '1228px',
          margin: '20px'
        }}>
        <Grid item xs={12} md={12} lg={12}>
          <BreadcrumbNavigation
            items={[
              { to: '/', label: 'home' },
              { to: `/events/${decireRoute}`, label: `${event?.eventCategory}` },
              { to: `/getTickets/${event?.eventID}`, label: `${event?.eventName}` }
            ]}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ color: '#fff' }} justifyContent={'center'}>
        {Boolean(isLoading) && <CircularProgress />}
        <Grid
          container
          sx={{
            maxWidth: '1228px',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '50px',
            marginLeft: { xs: '20px' },
            marginRight: { xs: '20px' }
          }}>
          <EventBanner
            eventName={event?.eventName}
            eventImg={event?.eventImage}
            date={event?.dateOfEvent}
            place={event?.placeName}
          />
          <Tickets
            eventID={event?.eventID}
            ticketPrice={event?.ticketPrice}
            ticketsLeft={event?.ticketsLeft}
          />
        </Grid>
        {error && <div>Něco se nepovedlo, zkuste to později.</div>}
      </Grid>
    </>
  );
};

export default GetTicketsPage;
