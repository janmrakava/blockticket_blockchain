/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CircularProgress, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import HomeEventBanner from '../../components/EventBanners/HomeEventBanner';

import { useEventsByCategory } from './useEventsByCategory';
import { type IEventContract } from '../Home/Home';

export interface DecodedToken {
  userId: string;
}

const EventsByCategory: React.FC = () => {
  const { category, events, isLoading, error, userData, userLoggedIn } = useEventsByCategory();

  console.log(events);

  return (
    <Grid
      container
      sx={{
        color: '#fff',
        maxWidth: '1228px',
        margin: '0 auto',
        marginBottom: '100px'
      }}>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          backgroundImage: `url(/eventsByCategoryPage/${category}.jpg)`,
          minHeight: '300px',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Typography sx={{ fontSize: '30px', fontWeight: 900, margin: '50px 0px' }}>
          <FormattedMessage id="app.eventsbycategorypage.heading" />
          <FormattedMessage id={`app.navigation.${category}`} />
        </Typography>
      </Grid>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          events?.map((event: IEventContract, index: number) => {
            return (
              <HomeEventBanner
                key={index}
                eventId={event.eventID}
                userId={userData?._id ? userData._id : ''}
                name={event.eventName}
                date={event.dateOfEvent}
                place={event.placeName}
                popular={index % 2 === 0}
                ticketsSold={event.numberOfTickets}
                imgSrc={event.eventImage}
                wideScreen={index % 2 === 0}
                userLoggedIn={userLoggedIn}
                userFavoritesEvent={userData?.favorite_events ? userData.favorite_events : []}
              />
            );
          })
        )}
        {error && <div>Něco se nepovedlo...</div>}
        {events?.length === 0 && <div>Žádné události v dané kategorii neexistují.</div>}
      </Grid>
    </Grid>
  );
};

export default EventsByCategory;
