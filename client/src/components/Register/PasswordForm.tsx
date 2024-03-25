/* eslint-disable react/prop-types */
import {
  Box,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  InputLabel,
  Button
} from '@mui/material';

import { memo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FormPassword: React.FC<IPasswordFormProps> = ({
  password,
  passwordAgain,
  phoneNumber,
  handleChange,
  isPasswordLengthValid,
  isPasswordContainSpecial,
  isPasswordContainCapital,
  isPasswordContainNumber,
  handleBack,
  handleNext
}) => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  return (
    <Box>
      <Typography>
        <FormattedMessage id="app.registerpage.password" />
      </Typography>
      <form style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <FormControl sx={{ background: '#4B4958', borderRadius: '5px' }}>
          <InputLabel htmlFor="filled-adornment-password">
            {appLanguage === 'cs' ? 'Heslo' : 'Password'}
          </InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleChange}
            sx={{ background: '#4B4958', borderRadius: '5px', width: '100%' }}
            inputProps={{
              style: { color: '#80797B' }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box>
          <Typography sx={{ fontSize: '18px', fontWeight: 800 }}>
            <FormattedMessage id="app.registerpage.passwordrules" />
          </Typography>
          <ul style={{ marginLeft: '30px' }}>
            <li
              style={{
                margin: '5px 0px'
              }}
            >
              <FormattedMessage id="app.registerpage.passwordlength" />
              <img
                src={
                  isPasswordLengthValid ? '/register_page/correct.png' : '/register_page/wrong.png'
                }
                style={{ width: '20px', marginLeft: '20px' }}
                alt="Unfulfilled condition "
              />
            </li>
            <li style={{ margin: '5px 0px' }}>
              <FormattedMessage id="app.registerpage.passwordbigletter" />
              <img
                src={
                  isPasswordContainCapital
                    ? '/register_page/correct.png'
                    : '/register_page/wrong.png'
                }
                style={{ width: '20px', marginLeft: '20px' }}
                alt="Unfulfilled condition "
              />
            </li>
            <li style={{ margin: '5px 0px' }}>
              <FormattedMessage id="app.registerpage.passwordspecialsymbol" />
              <img
                src={
                  isPasswordContainSpecial
                    ? '/register_page/correct.png'
                    : '/register_page/wrong.png'
                }
                style={{ width: '20px', marginLeft: '20px' }}
                alt="Unfulfilled condition "
              />
            </li>
            <li style={{ margin: '5px 0px' }}>
              <FormattedMessage id="app.registerpage.passwordnumber" />
              <img
                src={
                  isPasswordContainNumber
                    ? '/register_page/correct.png'
                    : '/register_page/wrong.png'
                }
                style={{ width: '20px', marginLeft: '20px' }}
                alt="Unfulfilled condition "
              />
            </li>
          </ul>
        </Box>
        <FormControl sx={{ background: '#4B4958', borderRadius: '5px' }}>
          <InputLabel htmlFor="filled-adornment-password">
            {appLanguage === 'cs' ? 'Heslo znovu' : 'Password again'}
          </InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="passwordAgain"
            value={passwordAgain}
            onChange={handleChange}
            sx={{ background: '#4B4958', borderRadius: '5px', width: '100%' }}
            inputProps={{
              style: { color: '#80797B' }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <TextField
          label={appLanguage === 'cs' ? 'Telefonní číslo' : 'Phone number'}
          variant="filled"
          value={phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
          sx={{ background: '#4B4958', borderRadius: '5px' }}
          InputProps={{
            style: { color: '#80797B' },
            startAdornment: (
              <InputAdornment position="start">
                {phoneNumber.startsWith('+420') && (
                  <img src="/register_page/cz.png" alt="Czech Flag" style={{ width: '30px' }} />
                )}
                {phoneNumber.startsWith('+421') && (
                  <img src="/register_page/sk.png" alt="Slovak Flag" style={{ width: '30px' }} />
                )}
                {phoneNumber.startsWith('+44') && (
                  <img
                    src="/register_page/gb.png"
                    alt="Great Britain Flag"
                    style={{ width: '30px' }}
                  />
                )}
                {phoneNumber.startsWith('+1') && (
                  <img src="/register_page/us.png" alt="USA Flag" style={{ width: '30px' }} />
                )}
              </InputAdornment>
            )
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

export const PasswordForm = memo(FormPassword);
