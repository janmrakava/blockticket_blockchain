/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CircularProgress, Grid } from '@mui/material';
import UserSettingsMenu from '../components/UserSettings/UserSettingsMenu';
import { FormattedMessage } from 'react-intl';
import { useMyTickets } from '../customHooks/useMyTickets';
import NothingToShowBanner from '../components/FavoritesPage/NoFavoriteEvents';

const MyTickets: React.FC = () => {
  const { renderTickets, ticketsDataLoading, ticketsDataError } = useMyTickets();

  return (
    <Grid
      container
      sx={{ maxWidth: '1228px', margin: '0 auto', color: '#fff', marginBottom: '50px' }}>
      <UserSettingsMenu active="mytickets" />
      <Grid item xs={12} md={12} lg={12} sx={{ marginTop: '50px' }}>
        <h1>
          <FormattedMessage id="app.mytickets.heading" />
        </h1>
      </Grid>
      {ticketsDataError && <div>Něco se nepovedlo</div>}

      {ticketsDataLoading ? (
        <CircularProgress />
      ) : (
        <>
          {!renderTickets || renderTickets.length === 0 ? (
            <NothingToShowBanner text="notickets" />
          ) : (
            <Grid
              container
              spacing={0}
              gap={3}
              marginTop={5}
              marginBottom={5}
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: '50vh' }}>
              {renderTickets}
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default MyTickets;
