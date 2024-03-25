/* eslint-disable react/prop-types */
import { Box, Button, TextField, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';
import { FormattedMessage } from 'react-intl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddressForm: React.FC<IAddressFormProps> = ({
  country,
  city,
  street,
  streetNumber,
  zipCode,
  handleChange,
  handleBack,
  handleNext
}) => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  return (
    <Box>
      <Typography>
        <FormattedMessage id="app.registerpage.address" />
      </Typography>
      <form style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TextField
          label={appLanguage === 'cs' ? 'Země' : 'Country'}
          variant="filled"
          value={country}
          name="country"
          onChange={handleChange}
          sx={{ background: '#4B4958', borderRadius: '5px' }}
          InputProps={{
            style: { color: '#80797B' }
          }}
          fullWidth
        />
        <TextField
          label={appLanguage === 'cs' ? 'Město' : 'City'}
          variant="filled"
          value={city}
          name="city"
          onChange={handleChange}
          sx={{ background: '#4B4958', borderRadius: '5px' }}
          InputProps={{
            style: { color: '#80797B' }
          }}
          fullWidth
        />
        <TextField
          label={appLanguage === 'cs' ? 'Ulice' : 'Street name'}
          variant="filled"
          value={street}
          name="street"
          onChange={handleChange}
          sx={{ background: '#4B4958', borderRadius: '5px' }}
          InputProps={{
            style: { color: '#80797B' }
          }}
          fullWidth
        />
        <TextField
          label={appLanguage === 'cs' ? 'PSČ' : 'ZIP'}
          variant="filled"
          value={zipCode}
          name="zipCode"
          onChange={handleChange}
          sx={{ background: '#4B4958', borderRadius: '5px' }}
          InputProps={{
            style: { color: '#80797B' }
          }}
          fullWidth
        />
        <TextField
          label={appLanguage === 'cs' ? 'Číslo domu' : 'Street number'}
          variant="filled"
          value={streetNumber}
          name="streetNumber"
          onChange={handleChange}
          sx={{ background: '#4B4958', borderRadius: '5px' }}
          InputProps={{
            style: { color: '#80797B' }
          }}
          fullWidth
        />
      </form>
      <Box>
        <Button variant="contained" onClick={handleBack} sx={{ float: 'left', marginTop: '20px' }}>
          <ArrowBackIcon />
        </Button>
        <Button variant="contained" onClick={handleNext} sx={{ float: 'right', marginTop: '20px' }}>
          <ArrowBackIcon sx={{ transform: 'rotate(180deg)' }} />
        </Button>
      </Box>
    </Box>
  );
};

export const AddressInfoForm = memo(AddressForm);
