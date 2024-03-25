/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, CircularProgress, Grid } from '@mui/material';
import { useEvent } from '../../customHooks/useEvent';

import EventHeading from '../EventPage/EventHeading';
import BreadcrumbNavigation from '../EventPage/BreadcrumbNavigation';
import EventInfo from '../EventPage/EventInfo';
import GetTickets from '../EventPage/GetTickets';
import EventDescription from '../EventPage/EventDescription';
import NoMatch from '../NoMatch';
import { FormattedMessage } from 'react-intl';
import { EventDescriptionDivider, SimilarEventsHeading } from './styled';
import SimilarEventBanner from '../EventPage/SimilarEventBanner';
import { useEffect, useState } from 'react';

const Event: React.FC = () => {
  const {
    eventData,
    eventQueryError,
    eventQueryIsLoading,
    appLanguage,
    similarEventData,
    eventsByCategoryError,
    eventsByCatagoryIsLoading,
    userLoggedIn,
    userData
  } = useEvent();

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (eventQueryError) {
    return <NoMatch />;
  }

  const threeSimilar = similarEventData?.slice(6, 9);

  const renderSimilar = threeSimilar?.map((item: IEvent, index: number) => {
    const lang = appLanguage === 'cs' ? 'cs' : 'en';
    return (
      <Grid item xs={12} md={4} lg={4} key={index}>
        <SimilarEventBanner artist={item.name[lang]} image={item.image} id={item._id} />
      </Grid>
    );
  });

  const [route, setRoute] = useState<string>('');

  useEffect(() => {
    if (eventData) {
      const decideRoute =
        eventData.category_of_event === 'Sport'
          ? 'sport'
          : eventData.category_of_event === 'Music'
          ? 'music'
          : eventData.category_of_event === 'Family'
          ? 'family'
          : eventData.category_of_event === 'Art'
          ? 'art'
          : eventData.category_of_event === 'Deals'
          ? 'deals'
          : eventData.category_of_event === 'VIP'
          ? 'vip'
          : '';
      setRoute(decideRoute);
    }
  }, []);

  return (
    <Grid container sx={{ color: 'white' }}>
      {(eventQueryIsLoading as boolean) ? (
        <CircularProgress />
      ) : (
        <>
          <EventHeading eventName={eventData.name[appLanguage]} />
          <BreadcrumbNavigation
            items={[
              { to: '/', label: 'home' },
              { to: '/events', label: 'events' },
              {
                to: `/events/${route}`,
                label: `${eventData.category_of_event}`
              },
              { to: `/event/${eventData._id}`, label: `${eventData.name[appLanguage]}` }
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
                  src={`${eventData.image}`}
                  alt={`Artist ${eventData.name[appLanguage]}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={5} sx={{ marginTop: '20px' }}>
              <EventInfo
                artist={eventData.name[appLanguage]}
                eventId={eventData._id}
                city={eventData.address_id.city}
                location={eventData.address_id.name_of_place}
                date={eventData.date_of_the_event}
                prices={eventData.ticket_types}
                userId={userData ? userData._id : ''}
                userFavoriteEvents={userData ? userData.favorite_events : []}
                userLoggedIn={userLoggedIn}
              />
              <GetTickets id={eventData._id} />
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
                description={eventData.description[appLanguage]}
                tickets={eventData.ticket_types}
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
            {eventsByCategoryError ? (
              <p>Error, sorry :( </p>
            ) : eventsByCatagoryIsLoading ? (
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
    </Grid>
  );
};

export default Event;
