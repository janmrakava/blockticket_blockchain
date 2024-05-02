/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Alert, Box, Button, Grid, Snackbar, Typography } from '@mui/material';
import { useMyOneTicket } from './useMyOneTicket';
import SalePriceSetupBanner from '../../components/MyAllTickets/SalePriceSetupBanner';
import { FormattedMessage } from 'react-intl';

import ethToCzk from '../../ethtoczkprice/ethtoczkprice.json';
import { convertToEth } from '../../utils/smartContractFunctions/TicketContract';

/*
  
*/
const MyOneTicket: React.FC = () => {
  const {
    account,
    myTicket,
    isLoading,
    isError,
    handleSetTicketNotForSale,
    handleShowSnackBar,
    handleSetTicketForSale,
    renderDate,
    showSuccessSnackBar,
    showErrorSnackBar,
    showSetupPriceForSaleBanner
  } = useMyOneTicket();
  const convertedPrice = convertToEth(myTicket?.ticketPrice);
  const renderPriceInCzk = Number(convertedPrice) * ethToCzk.ethtoczkprice;
  return (
    <Grid
      container
      sx={{
        maxWidth: '1228px',
        margin: '0 auto',
        color: '#fff',
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '200px'
      }}>
      <Grid item xs={12} md={12} lg={12} sx={{ marginTop: '50px' }}>
        <Typography
          sx={{ fontSize: '30px', fontWeight: 900, padding: '20px', marginBottom: '-70px' }}>
          Moje vstupenka
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          marginTop: '70px',
          marginLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          justifyContent: 'space-between',
          boxShadow: '#80797B 0px 0px 0px 3px'
        }}>
        {isLoading && <div>Načítá se...</div>}
        {isError && <div>Něco se nepovedlo. </div>}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography sx={{ width: '50%' }}>ID Vstupenky </Typography>
          <Typography>{myTicket?.ticketID}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography sx={{ width: '50%' }}>Datum koupě </Typography>
          <Typography>{renderDate}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography sx={{ width: '50%' }}>Původní cena </Typography>
          <Typography>{myTicket?.originalPrice.toString()} CZK</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography sx={{ width: '50%' }}>Zaplacená částka </Typography>
          <Typography>{renderPriceInCzk.toFixed(0)} CZK</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography sx={{ width: '50%' }}>Vlastník vstupenky </Typography>
          <Typography>{myTicket?.ticketOwner}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography sx={{ width: '50%' }}>Platná vstupenka</Typography>
          <Typography sx={{ color: myTicket?.isValid ? 'green' : 'red', fontWeight: '900' }}>
            {myTicket?.isValid ? 'Ano' : 'Ne'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography sx={{ width: '50%' }}>Uplatněná vstupenka</Typography>
          <Typography>
            {myTicket?.isRedeemed
              ? 'Ano - Nejsou již možné žádné akce'
              : 'Ne - Je možné ji prodat, nebo vrátit'}
          </Typography>
        </Box>
        {myTicket?.forSale && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography sx={{ width: '50%' }}>Vstupenka je určena k prodeji za cenu: </Typography>
            <Typography>{myTicket?.salePrice.toString()} CZK</Typography>
          </Box>
        )}
        {!myTicket?.isRedeemed && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!myTicket?.forSale ? (
              <Button variant="contained" color="error" onClick={handleSetTicketForSale}>
                Prodat vstupenku
              </Button>
            ) : (
              <Button variant="contained" color="success" onClick={handleSetTicketNotForSale}>
                Zrušit prodej vstupenky
              </Button>
            )}
          </Box>
        )}
      </Grid>
      {showSetupPriceForSaleBanner && (
        <SalePriceSetupBanner
          userAddress={account}
          ticketID={myTicket.ticketID}
          ticketPrice={renderPriceInCzk.toFixed(0)}
          handleShowSnackBar={handleShowSnackBar}
        />
      )}
      <Snackbar
        open={showSuccessSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.myticket.success`} />
        </Alert>
      </Snackbar>
      <Snackbar
        open={showErrorSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.myticket.error`} />
        </Alert>
      </Snackbar>
    </Grid>
  );
};
export default MyOneTicket;
