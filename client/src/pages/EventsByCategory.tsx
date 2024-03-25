import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useEventsByCategory } from '../customHooks/useEventsByCategory';

import EventBannerCategory, {
  type ITicketType
} from '../components/EventsByCategory/EventBannerCategory';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

interface IEventCategory {
  name: {
    cs: string;
    en: string;
  };
  image: string;
  popular: boolean;
  address_id: {
    name_of_place: string;
  };
  date_of_the_event: string;
  _id: string;
  ticket_types: ITicketType[];
}

const EventsByCategory: React.FC = () => {
  const { category } = useParams();

  const { eventsData, eventsByCatagoryIsLoading, eventsByCategoryError } = useEventsByCategory();

  const cookies = new Cookies();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = cookies.get('authToken');
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

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
        {Boolean(eventsByCatagoryIsLoading) && <CircularProgress />}
        {Boolean(eventsByCategoryError) && <Box>Něco se pokazilo</Box>}
        {eventsData?.map((item: IEventCategory, index: number) => {
          return (
            <EventBannerCategory
              eventId={item._id}
              name={item.name}
              key={index}
              isWide={index % 2 === 0}
              imageSrc={item.image}
              userLoggedIn={userLoggedIn}
              popular={item.popular}
              date={item.date_of_the_event}
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              place={item.address_id ? item.address_id.name_of_place : 'Unknown Place'}
              ticketsTypes={item.ticket_types}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default EventsByCategory;
