/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import BuyMoreBanner from '../../components/Banners/BuyMoreBanner';
import FavoriteBanner from '../../components/Banners/FavoriteBanner';
import MobileAppBanner from '../../components/Banners/MobileAppBanner';
import Hero from '../../components/HeroSection/Hero';

import { useHome } from './useHome';
import { getAllEventsFromContract } from '../../utils/smartContractFunctions/EventContract';
import { CircularProgress, Grid } from '@mui/material';
import HomeEventBanner from '../../components/EventBanners/HomeEventBanner';
export interface IEventContract {
  dateOfEvent: bigint;
  eventCategory: string;
  eventDescription: string;
  eventID: string;
  eventImage: string;
  eventName: string;
  eventOwner: string;
  numberOfTickets: number;
  placeName: string;
  ticketPrice: number;
}

const Home: React.FC = () => {
  const { activeButton, handleChangeActiveButton, userData, userLoggedIn } = useHome();
  const [events, setEvents] = useState<IEventContract[]>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      try {
        const response = await getAllEventsFromContract();
        setEvents(response);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchEvents();
  }, []);

  return (
    <>
      <Hero selectedType={activeButton} handleChange={handleChangeActiveButton} />
      <Grid
        container
        spacing={0}
        gap={3}
        marginTop={5}
        marginBottom={5}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '50vh' }}>
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
      <FavoriteBanner />
      <MobileAppBanner />
      <BuyMoreBanner />
    </>
  );
};

export default Home;
