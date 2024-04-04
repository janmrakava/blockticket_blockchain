import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { type RootState } from './store';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import cs from 'date-fns/locale/de';
import { RegisterLogo } from '../components/Register/RegisterLogo';

interface INewEvent {
  eventName: string;
  ticketPrice: number;
  dateOfTheEvent: Date;
  numberOfTicket: number;
  placeName: string;
  placeAddress: string;
  imageSrc?: string;
  description: string;
  category: string;
  popular: boolean;
}

const CreateEvent: React.FC = () => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [newEventInfo, setnewEventInfo] = useState<INewEvent>({
    eventName: '',
    ticketPrice: 0,
    numberOfTicket: 0,
    dateOfTheEvent: new Date(),
    placeName: '',
    placeAddress: '',
    imageSrc: '',
    description: '',
    category: '',
    popular: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value, name } = event.target;
    setnewEventInfo({ ...newEventInfo, [name]: value });
  };
  const handleDateChange = (value: Date | null): void => {
    if (value !== null) {
      const date = new Date(value);
      setnewEventInfo({ ...newEventInfo, dateOfTheEvent: date });
    }
  };
  const handleCreateEvent = (): void => {
    const todayDate = new Date();
    if (todayDate > newEventInfo.dateOfTheEvent) {
      setShowSnackBar(true);
      setTimeout(() => {
        setShowSnackBar(false);
      }, 2500);
    } else {
      console.log('New Event Created! ', newEventInfo);
    }
  };

  const theme = useTheme();

  const showLogo = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
      <Grid
        container
        sx={{
          color: '#fff',
          padding: '20px',
          maxWidth: '1228px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          gap: '70px',
          justifyContent: 'center'
        }}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: '23px', fontWeight: 800, padding: '20px', marginBottom: '-70px' }}>
            <FormattedMessage id="app.createevent.heading" />
          </Typography>
        </Grid>
        <Box sx={{ width: { xs: '100%', md: '45%', lg: '45%' } }}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: '20px',
              textAlign: 'center'
            }}>
            {showLogo && (
              <Box>
                <RegisterLogo />
                <Typography sx={{ fontSize: '15px', marginTop: '20px' }}>
                  <FormattedMessage id="app.registerpage.text" />
                </Typography>
              </Box>
            )}
            {!showLogo && <img src="/createEvent.jpg" style={{ width: '100%' }} />}
          </Grid>
        </Box>
        <Box
          sx={{
            width: { xs: '100%', md: '45%', lg: '45%' }
          }}>
          <Grid item xs={12} md={12} lg={12}>
            <form
              style={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '29px'
              }}>
              <TextField
                label={appLanguage === 'cs' ? 'Název události' : 'Event name'}
                variant="filled"
                value={newEventInfo.eventName}
                name="eventName"
                onChange={handleChange}
                sx={{ background: '#4B4958', borderRadius: '5px' }}
                InputProps={{
                  style: { color: '#80797B' }
                }}
                fullWidth
              />
              <TextareaAutosize
                placeholder={appLanguage === 'cs' ? 'Popis události' : 'Description of the event'}
                value={newEventInfo.description}
                name="description"
                onChange={handleChange}
                style={{
                  background: '#4B4958',
                  borderRadius: '5px',
                  border: 'none',
                  minHeight: '50px',
                  color: '#80797B',
                  padding: '10px'
                }}
              />
              <TextField
                label={
                  appLanguage === 'cs'
                    ? 'Kategorie (Music, Art, Sport, Family, VIP) '
                    : 'Category (Music, Art, Sport, Family, VIP)'
                }
                variant="filled"
                value={newEventInfo.category}
                name="category"
                onChange={handleChange}
                sx={{ background: '#4B4958', borderRadius: '5px' }}
                InputProps={{
                  style: { color: '#80797B' }
                }}
                fullWidth
              />
              <DatePicker
                label={appLanguage === 'cs' ? 'Datum události' : 'Date of the event'}
                name="dateOfBirth"
                value={newEventInfo.dateOfTheEvent}
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
              <TextField
                label={appLanguage === 'cs' ? 'Cena vstupenky' : 'Price of the ticket'}
                variant="filled"
                value={newEventInfo.ticketPrice}
                name="ticketPrice"
                onChange={handleChange}
                sx={{ background: '#4B4958', borderRadius: '5px' }}
                InputProps={{
                  style: { color: '#80797B' }
                }}
                fullWidth
              />
              <TextField
                label={appLanguage === 'cs' ? 'Počet vstupenek' : 'Number of tickets'}
                variant="filled"
                value={newEventInfo.numberOfTicket}
                name="numberOfTicket"
                onChange={handleChange}
                sx={{ background: '#4B4958', borderRadius: '5px' }}
                InputProps={{
                  style: { color: '#80797B' }
                }}
                fullWidth
              />
              <TextField
                label={appLanguage === 'cs' ? 'Název místa' : 'Name of the place'}
                variant="filled"
                value={newEventInfo.placeName}
                name="placeName"
                onChange={handleChange}
                sx={{ background: '#4B4958', borderRadius: '5px' }}
                InputProps={{
                  style: { color: '#80797B' }
                }}
                fullWidth
              />
              <TextField
                label={appLanguage === 'cs' ? 'Adresa místa konání' : 'Address of the venue'}
                variant="filled"
                value={newEventInfo.placeAddress}
                name="placeAddress"
                onChange={handleChange}
                sx={{ background: '#4B4958', borderRadius: '5px' }}
                InputProps={{
                  style: { color: '#80797B' }
                }}
                fullWidth
              />
              <TextField
                label={appLanguage === 'cs' ? 'Volitelný obrázek' : 'Optional image'}
                variant="filled"
                value={newEventInfo.imageSrc}
                name="imageSrc"
                onChange={handleChange}
                sx={{ background: '#4B4958', borderRadius: '5px' }}
                InputProps={{
                  style: { color: '#80797B' }
                }}
                fullWidth
              />
            </form>
            <Button
              variant="contained"
              onClick={handleCreateEvent}
              sx={{ width: '100%', marginTop: '20px' }}>
              <FormattedMessage id="app.createevent.buttontext" />
            </Button>
          </Grid>
        </Box>
      </Grid>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.createevent.baddate`} />
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default CreateEvent;
