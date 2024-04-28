/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/prop-types */
import { Box, Button, Typography } from '@mui/material';
import { convertRetardedDate } from '../../utils/function';
import {
  cancelTicketForSale,
  setTicketForSale
} from '../../utils/smartContractFunctions/TicketContract';

interface ITicketBannerProps {
  ticketID: string;
  account: string;
  purchasedDate: bigint;
  forSale: boolean;
  isValid: boolean;
  ticketOwner: string;
  salePrice: number;
  originalPrice: number;
  isRedeemed: boolean;
  ticketPrice: number;
}

const MyTicketBanner: React.FC<ITicketBannerProps> = ({
  ticketID,
  account,
  purchasedDate,
  forSale,
  isValid,
  ticketOwner,
  salePrice,
  originalPrice,
  isRedeemed,
  ticketPrice
}) => {
  const convertedDate = convertRetardedDate(purchasedDate);
  const renderDate = `${convertedDate.getDate()}.${
    convertedDate.getMonth() + 1
  }.${convertedDate.getFullYear()}`;

  const handleSetTicketForSale = async (): Promise<void> => {
    const response = await setTicketForSale(ticketID, 499, account);
    console.log(response);
  };
  const handleSetTicketNotForSale = async (): Promise<void> => {
    const response = await cancelTicketForSale(ticketID, account);
    console.log(response);
  };
  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '#80797B 0px 0px 0px 3px'
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ width: '50%' }}>ID Vstupenky </Typography>
        <Typography>{ticketID}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ width: '50%' }}>Datum koupě </Typography>
        <Typography>{renderDate}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ width: '50%' }}>Původní cena </Typography>
        <Typography>{originalPrice.toString()} CZK</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ width: '50%' }}>Zaplacená částka </Typography>
        <Typography>{ticketPrice.toString()} CZK</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ width: '50%' }}>Vlastník vstupenky </Typography>
        <Typography>{ticketOwner}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ width: '50%' }}>Platná vstupenka</Typography>
        <Typography sx={{ color: isValid ? 'green' : 'red', fontWeight: '900' }}>
          {isValid ? 'Ano' : 'Ne'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ width: '50%' }}>Uplatněná vstupenka</Typography>
        <Typography>
          {isRedeemed
            ? 'Ano - Nejsou již možné žádné akce'
            : 'Ne - Je možné ji prodat, nebo vrátit'}
        </Typography>
      </Box>
      {forSale && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography sx={{ width: '50%' }}>Vstupenka je určena k prodeji za cenu: </Typography>
          <Typography>{salePrice.toString()} CZK</Typography>
        </Box>
      )}
      {!isRedeemed && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {!forSale ? (
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
    </Box>
  );
};

export default MyTicketBanner;
