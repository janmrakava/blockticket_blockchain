import { Box, Button, TextField, Typography } from '@mui/material';
import React, { type FormEvent } from 'react';
import { type RootState } from '../../pages/store';
import { useSelector } from 'react-redux';
import { updateTicketPrice } from '../../utils/smartContractFunctions/EventContract';

interface IUpdateTicketPriceProps {
  userAddress: string | undefined;
  eventID: string | undefined;
  newTicketPrice: number;
  ticketPrice: number | undefined;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowTicketPriceBanner: () => void;
  handleShowErrorSnackBar: () => void;
  handleShowSuccessSnackBar: () => void;
}

const UpdateTicketPrice: React.FC<IUpdateTicketPriceProps> = ({
  userAddress,
  eventID,
  newTicketPrice,
  ticketPrice,
  handleChange,
  handleShowTicketPriceBanner,
  handleShowSuccessSnackBar,
  handleShowErrorSnackBar
}) => {
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (eventID != null && userAddress != null) {
      const response = await updateTicketPrice(eventID, newTicketPrice, userAddress);
      handleShowTicketPriceBanner();
      console.log(response);
      handleShowSuccessSnackBar();
    } else {
      handleShowErrorSnackBar();
    }
  };

  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '400px',
        height: '300px',
        borderRadius: '30px',
        padding: '20px',
        background: '#131021',
        filter: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        border: '1px solid #80797b'
      }}>
      <Typography sx={{ fontSize: '20px', fontWeight: '800' }}>
        {appLanguage === 'cs' ? ' Úprava ceny vstupenky' : 'Ticket price adjustment'}
      </Typography>
      <form
        style={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '29px'
        }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit}>
        <TextField
          label={appLanguage === 'cs' ? 'Nová cena vstupenky' : 'New Ticket Price'}
          variant="filled"
          value={newTicketPrice}
          placeholder={ticketPrice?.toString()}
          name="eventName"
          type="number"
          onChange={handleChange}
          sx={{ background: '#4B4958', borderRadius: '5px' }}
          InputProps={{
            style: { color: '#80797B' }
          }}
          fullWidth
        />
        <Button type="submit" variant="contained">
          {appLanguage === 'cs' ? 'Nastavit cenu' : 'Set price'}
        </Button>
      </form>
    </Box>
  );
};

export default UpdateTicketPrice;
