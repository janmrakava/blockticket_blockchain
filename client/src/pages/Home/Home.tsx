/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import BuyMoreBanner from '../../components/Banners/BuyMoreBanner';
import FavoriteBanner from '../../components/Banners/FavoriteBanner';
import MobileAppBanner from '../../components/Banners/MobileAppBanner';
import Hero from '../../components/HeroSection/Hero';

import { useHome } from './useHome';
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
  soldTickets: number;
}

const Home: React.FC = () => {
  const {
    activeButton,
    handleChangeActiveButton,
    userData,
    userLoggedIn,
    events,
    error,
    isLoading
  } = useHome();
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
                ticketsSold={event.soldTickets}
                numberOfTickets={event.numberOfTickets}
                imgSrc={event.eventImage}
                wideScreen={index % 2 === 0}
                userLoggedIn={userLoggedIn}
              />
            );
          })
        )}
        {error && <div style={{ color: '#fff', fontSize: '36px' }}>Něco se nepovedlo...</div>}
        {events?.length === 0 && (
          <div style={{ color: '#fff', fontSize: '36px' }}>
            Žádné eventy daté kategorie neexistují.
          </div>
        )}
      </Grid>
      <FavoriteBanner />
      <MobileAppBanner />
      <BuyMoreBanner />
    </>
  );
};

export default Home;
