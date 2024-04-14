/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, CircularProgress, Grid } from '@mui/material';
import { useEvent } from './useEvent';

import EventHeading from '../../components/EventPage/EventHeading';
import BreadcrumbNavigation from '../../components/EventPage/BreadcrumbNavigation';
import EventInfo from '../../components/EventPage/EventInfo';
import GetTickets from '../../components/EventPage/GetTickets';
import EventDescription from '../../components/EventPage/EventDescription';
import { FormattedMessage } from 'react-intl';
import { EventDescriptionDivider, SimilarEventsHeading } from './styled';
import SimilarEventBanner from '../../components/EventPage/SimilarEventBanner';
import { useEffect, useState } from 'react';
import { type IEventContract } from '../Home/Home';

const Event: React.FC = () => {
  const {
    userLoggedIn,
    userData,
    event,
    isLoading,
    error,
    similarEvents,
    isLoadingSimilar,
    errorSimilar
  } = useEvent();

  const threeSimilar = similarEvents?.slice(0, 6);

  const renderSimilar = threeSimilar?.map((event: IEventContract, index: number) => {
    return (
      <Grid item xs={12} md={4} lg={4} key={index}>
        <SimilarEventBanner artist={event.eventName} image={event.eventImage} id={event.eventID} />
      </Grid>
    );
  });

  const [route, setRoute] = useState<string>('');

  useEffect(() => {
    if (event) {
      const decideRoute =
        event.eventCategory === 'Sport'
          ? 'sport'
          : event.eventCategory === 'Music'
          ? 'music'
          : event.eventCategory === 'Family'
          ? 'family'
          : event.eventCategory === 'Art'
          ? 'art'
          : event.eventCategory === 'Deals'
          ? 'deals'
          : event.eventCategory === 'VIP'
          ? 'vip'
          : '';
      setRoute(decideRoute);
    }
  }, []);
  console.log(event);
  return (
    <Grid container sx={{ color: 'white' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <EventHeading eventName={event.eventName} />
          <BreadcrumbNavigation
            items={[
              { to: '/', label: 'home' },
              { to: '/event', label: 'events' },
              {
                to: `/event/${route}`,
                label: `${event.eventCategory}`
              },
              { to: `/event/${event.eventID}`, label: `${event.eventName}` }
            ]}
          />
          <Grid
            container
            sx={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: '21px',
              alignItems: 'flex-start',
              margin: { xs: '0 20px' }
            }}>
            <Grid item xs={12} md={6} lg={6}>
              <Box
                sx={{
                  maxWidth: '1000px',
                  maxHeight: '600px',
                  padding: '0px !important',
                  marginTop: '20px'
                }}>
                <img
                  src={`${event.eventImage}`}
                  alt={`Artist ${event.eventName}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={5} sx={{ marginTop: '20px' }}>
              <EventInfo
                eventName={event.eventName}
                eventID={event.eventID}
                placeName={event.placeName}
                dateOfEvent={event.dateOfEvent}
                ticketPrice={event.ticketPrice}
                userId={userData ? userData._id : ''}
                userFavoriteEvents={userData ? userData.favorite_event : []}
                userLoggedIn={userLoggedIn}
              />
              <GetTickets id={event.eventId} />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                display: 'flex',
                flexDirection: { lg: 'row', md: 'row', xs: 'column' },
                alignItems: { xs: 'flex-start', lg: 'center' },
                gap: '3%',
                justifyContent: 'center'
              }}>
              <EventDescription
                description={event.eventDescription}
                ticketPrice={event.ticketPrice}
                numberOfTickets={event.numberOfTickets}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ marginLeft: '20PX' }}>
            <SimilarEventsHeading>
              <FormattedMessage id="app.oneevent.similar" />
            </SimilarEventsHeading>
            <EventDescriptionDivider />
          </Grid>
          <Grid container>
            {errorSimilar ? (
              <p>Error, sorry :( </p>
            ) : isLoadingSimilar ? (
              <CircularProgress />
            ) : (
              renderSimilar
            )}

            <Grid item xs={12} md={12} lg={12} sx={{ margin: '20px' }}>
              <EventDescriptionDivider />
            </Grid>
          </Grid>
        </>
      )}
      {error && <div>Něco se nepovedlo...</div>}
    </Grid>
  );
};

export default Event;
