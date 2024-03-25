/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CircularProgress, Grid, Typography } from '@mui/material';
import BuyMoreBanner from '../components/Banners/BuyMoreBanner';
import FavoriteBanner from '../components/Banners/FavoriteBanner';
import FindEventsBanner from '../components/Banners/FindEventsBanner';
import MobileAppBanner from '../components/Banners/MobileAppBanner';
import Hero from '../components/HeroSection/Hero';

import { useHome } from '../customHooks/useHome';
import { FormattedMessage } from 'react-intl';

export interface ICityObj {
  city: string;
  countryShortcut: string;
}

const Home: React.FC = () => {
  const {
    activeButton,
    handleChangeActiveButton,
    citiesObj,
    uniqueCitiesIsLoading,
    eventsByCategoryError,
    eventsByCatagoryIsLoading,
    eventsByCityCategoryTimeIsLoading,
    choosedCity,
    handleCityChange,
    chooseEventType,
    handleEventTypeChange,
    choosedTime,
    handleTimeTypeChange,
    eventBanners,
    searchResults
  } = useHome();

  if (eventsByCategoryError instanceof Error) {
    return <p>Error: {eventsByCategoryError.message}</p>;
  }

  return (
    <>
      <Hero selectedType={activeButton} handleChange={handleChangeActiveButton} />
      {eventsByCatagoryIsLoading && <CircularProgress />}
      {!eventsByCatagoryIsLoading && (
        <Grid
          container
          spacing={0}
          gap={3}
          marginTop={5}
          marginBottom={5}
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '50vh' }}>
          {eventBanners}
        </Grid>
      )}
      <FavoriteBanner />

      {uniqueCitiesIsLoading ? (
        <CircularProgress />
      ) : (
        <FindEventsBanner
          cities={citiesObj}
          choosedCity={choosedCity}
          handleCityChange={handleCityChange}
          choosedEventType={chooseEventType}
          handleEventTypeChange={handleEventTypeChange}
          choosedTime={choosedTime}
          handleTimeTypeChange={handleTimeTypeChange}
        />
      )}

      <Grid
        container
        spacing={0}
        gap={3}
        marginTop={5}
        marginBottom={5}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '50vh' }}>
        {eventsByCityCategoryTimeIsLoading && <CircularProgress />}
        {searchResults.length === 0 ? (
          <Typography
            sx={{
              fontSize: { lg: '36px', xs: '26px' },
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
            <FormattedMessage id="app.searchresults.notfound" />
          </Typography>
        ) : (
          searchResults
        )}
      </Grid>
      <MobileAppBanner />
      <BuyMoreBanner />
    </>
  );
};

export default Home;
