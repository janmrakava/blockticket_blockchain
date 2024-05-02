/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, TextField, Typography } from '@mui/material';
import React, { useState, type FormEvent } from 'react';
import { type RootState } from '../../pages/store';
import { useSelector } from 'react-redux';
import { setTicketForSale } from '../../utils/smartContractFunctions/TicketContract';
import { SalePriceContainer } from './styled';

interface ISalePriceSetupBannerProps {
  userAddress: string | undefined;
  ticketID: string | undefined;
  ticketPrice: string;
  handleShowSnackBar: (value: boolean) => void;
}

const SalePriceSetupBanner: React.FC<ISalePriceSetupBannerProps> = ({
  userAddress,
  ticketID,
  ticketPrice,
  handleShowSnackBar
}) => {
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      if (userAddress && ticketID) {
        const response = await setTicketForSale(ticketID, newTicketPrice, userAddress);
        handleShowSnackBar(true);
        console.log(response);
      }
    } catch (error) {
      handleShowSnackBar(false);
    }
  };
  const [newTicketPrice, setNewTicketPrice] = useState<number>(Number(ticketPrice));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setNewTicketPrice(Number(value));
  };
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  return (
    <SalePriceContainer>
      <Typography sx={{ fontSize: '20px', fontWeight: '800' }}>
        {appLanguage === 'cs' ? 'Nastavení ceny pro prodej' : 'Setting the price for sale'}
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
          label={appLanguage === 'cs' ? 'Cena vstupenky' : 'Ticket Price'}
          variant="filled"
          value={newTicketPrice}
          placeholder={ticketPrice.toString()}
          defaultValue={ticketPrice.toString()}
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
          {appLanguage === 'cs' ? 'Nastavit vstupenku pro prodej' : 'Set up a ticket for sale'}
        </Button>
      </form>
    </SalePriceContainer>
  );
};

export default SalePriceSetupBanner;
