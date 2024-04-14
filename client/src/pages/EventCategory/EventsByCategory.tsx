/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CircularProgress, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { getEventsByCategory } from '../../utils/smartContractFunctions/EventContract';
import HomeEventBanner from '../../components/EventBanners/HomeEventBanner';
import { type IEventContract } from '../Home/Home';
import { getUserInfo, type IUserData } from '../../api/users/user';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  userId: string;
}

const EventsByCategory: React.FC = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>();
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get('authToken');

    const getUserData = async (userId: string): Promise<IUserData> => {
      const data = await getUserInfo(userId);
      return data;
    };

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (token) {
      setUserLoggedIn(true);
      const decodedToken = jwtDecode<DecodedToken>(token);

      getUserData(decodedToken.userId)
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error('Error when loading user data', error);
        });
    }
  }, []);

  const [events, setEvents] = useState<IEventContract[]>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { category } = useParams();

  useEffect(() => {
    const fetchEventsByCategory = async (): Promise<void> => {
      try {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!category) {
          setError(true);
        } else {
          const fixCategory = category.charAt(0).toUpperCase() + category.slice(1);
          const response = await getEventsByCategory(fixCategory);
          setEvents(response);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchEventsByCategory();
  }, [category]);

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
          events?.map((event, index) => {
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
      </Grid>
    </Grid>
  );
};

export default EventsByCategory;
