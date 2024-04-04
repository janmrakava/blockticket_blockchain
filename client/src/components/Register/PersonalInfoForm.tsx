/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import cs from 'date-fns/locale/de';
import { FormattedMessage } from 'react-intl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

enum Role {
  Admin = 'Admin',
  User = 'User'
}
const PersonalForm: React.FC<IPersonalInfoProps> = ({
  firstName,
  lastName,
  email,
  dateOfBirth,
  gender,
  role,
  handleChange,
  handleDateChange,
  handleNext
}) => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
      <Box>
        <Typography>
          <FormattedMessage id="app.registerpage.personal" />
        </Typography>
        <form style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            label={appLanguage === 'cs' ? 'Křestní jméno' : 'First name'}
            variant="filled"
            value={firstName}
            name="firstName"
            onChange={handleChange}
            sx={{ background: '#4B4958', borderRadius: '5px' }}
            InputProps={{
              style: { color: '#80797B' }
            }}
            fullWidth
          />
          <TextField
            label={appLanguage === 'cs' ? 'Příjmení' : 'Last name'}
            variant="filled"
            value={lastName}
            name="lastName"
            onChange={handleChange}
            sx={{ background: '#4B4958', borderRadius: '5px' }}
            InputProps={{
              style: { color: '#80797B' }
            }}
            fullWidth
          />
          <TextField
            label="E-mail"
            variant="filled"
            value={email}
            name="email"
            onChange={handleChange}
            sx={{ background: '#4B4958', borderRadius: '5px' }}
            InputProps={{
              style: { color: '#80797B' }
            }}
            fullWidth
          />
          <DatePicker
            label={appLanguage === 'cs' ? 'Datum narození' : 'Date of birth'}
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={handleDateChange}
            sx={{
              width: '100%',
              background: '#4B4958',
              borderRadius: '5px',
              '& .MuiInputLabel-root.Mui-focused': { color: '#979797' },
              '& .MuiOutlinedInput-root': {
                height: '55px',
                color: '#80797B'
              }
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {appLanguage === 'cs' ? 'Pohlaví' : 'Gender'}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              onChange={handleChange}
              sx={{ background: '#4B4958', color: '#80797B' }}
              name="gender">
              <MenuItem value={'Male'}>{appLanguage === 'cs' ? 'Muž' : 'Man'}</MenuItem>
              <MenuItem value={'Female'}>{appLanguage === 'cs' ? 'Žena' : 'Woman'}</MenuItem>
              <MenuItem value={'Not specified'}>
                {appLanguage === 'cs' ? 'Neuvádět' : 'Do not specify'}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {appLanguage === 'cs' ? 'Role' : 'Role'}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              onChange={handleChange}
              defaultValue={Role.User}
              sx={{ background: '#4B4958', color: '#80797B' }}
              name="role">
              <MenuItem value={Role.User}>{appLanguage === 'cs' ? 'Uživatel' : 'User'}</MenuItem>
              <MenuItem value={Role.Admin}>{appLanguage === 'cs' ? 'Admin' : 'Admin'}</MenuItem>
            </Select>
          </FormControl>
        </form>
      </Box>
      <Button variant="contained" onClick={handleNext} sx={{ float: 'right', marginTop: '20px' }}>
        <ArrowBackIcon sx={{ transform: 'rotate(180deg)' }} />
      </Button>
    </LocalizationProvider>
  );
};

export const PersonalInfoForm = memo(PersonalForm);
