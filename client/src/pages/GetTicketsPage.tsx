import { CircularProgress, Grid } from '@mui/material';
import { EventBanner } from '../components/GetTickets/EventBanner';
import { useGetTicketsPage } from '../customHooks/useGetTicketsPage';
import BreadcrumbNavigation from '../components/EventPage/BreadcrumbNavigation';
import { Tickets } from '../components/GetTickets/Tickets';

const GetTicketsPage: React.FC = () => {
  const { eventData, appLanguage, eventQueryIsLoading } = useGetTicketsPage();

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
              { to: '/events', label: 'events' },
              { to: '/events/:category', label: `${eventData.category_of_event}` },
              { to: '/event/:id"', label: `${eventData.name[appLanguage]}` }
            ]}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ color: '#fff' }} justifyContent={'center'}>
        {Boolean(eventQueryIsLoading) && <CircularProgress />}
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
            eventName={eventData.name[appLanguage]}
            eventImg={eventData.image}
            date={eventData.date_of_the_event}
            place={eventData.address_id.name_of_place}
            city={eventData.address_id.city}
          />
          <Tickets
            ticketTypes={eventData.ticket_types}
            eventId={eventData._id}
            imageSrc={eventData.image}
            name={eventData.name}
            city={eventData.address_id.city}
            nameOfPlace={eventData.address_id.name_of_place}
            date={eventData.date_of_the_event}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GetTicketsPage;
