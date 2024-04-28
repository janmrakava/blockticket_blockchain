/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CircularProgress, Grid } from '@mui/material';
import UserSettingsMenu from '../../components/UserSettings/UserSettingsMenu';
import { FormattedMessage } from 'react-intl';
import { type ITicketFromContract, useMyTickets } from '../../customHooks/useMyTickets';
import NothingToShowBanner from '../../components/FavoritesPage/NoFavoriteEvents';
import MyTicketBanner from '../../components/MyAllTickets/TicketBanner';

const MyTickets: React.FC = () => {
  const { account, myTickets, isLoading, isError } = useMyTickets();
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
      <Grid item xs={12} md={12} lg={12} sx={{}}>
        {isLoading && <CircularProgress />}
        {isError && <div>Něco se nepovedlo...</div>}
        {myTickets?.length === 0 && <NothingToShowBanner text="notickets" />}
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{ display: 'flex', flexDirection: 'column', gap: '50px', marginTop: '20px' }}>
          {myTickets?.map((ticket: ITicketFromContract, index: number) => {
            return (
              <MyTicketBanner
                key={index}
                account={account}
                ticketID={ticket.ticketID}
                purchasedDate={ticket.purchasedDate}
                forSale={ticket.forSale}
                isValid={ticket.isValid}
                ticketOwner={ticket.ticketOwner}
                salePrice={ticket.salePrice}
                originalPrice={ticket.originalPrice}
                isRedeemed={ticket.isRedeemed}
                ticketPrice={ticket.ticketPrice}
              />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyTickets;
