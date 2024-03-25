/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CircularProgress, Grid } from '@mui/material';
import UserSettingsMenu from '../components/UserSettings/UserSettingsMenu';
import { useFavorites } from '../customHooks/useFavorites';
import NoFavoritesEvents from '../components/FavoritesPage/NoFavoriteEvents';

const Favorites: React.FC = () => {
  const { favoriteEventsRender, userDataLoading, userDataError } = useFavorites();

  return (
    <Grid
      container
      sx={{
        maxWidth: '1228px',
        margin: '0 auto',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center'
      }}>
      <UserSettingsMenu active="favorites" />
      {userDataError && <div>Něco se nepovedlo</div>}
      {userDataLoading ? (
        <CircularProgress />
      ) : (
        <>
          {favoriteEventsRender && favoriteEventsRender.length > 0 ? (
            <Grid
              container
              spacing={0}
              gap={3}
              marginTop={5}
              marginBottom={5}
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: '50vh' }}>
              {favoriteEventsRender}
            </Grid>
          ) : (
            <NoFavoritesEvents />
          )}
        </>
      )}
    </Grid>
  );
};

export default Favorites;
