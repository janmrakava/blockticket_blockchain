/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
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
import { useEffect, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import cs from 'date-fns/locale/de';
import { RegisterLogo } from '../components/Register/RegisterLogo';
import { useSDK } from '@metamask/sdk-react';
import { createNewEvent, dateToUint64 } from '../utils/smartContractFunctions/EventContract';

export interface INewEvent {
  eventName: string;
  ticketPrice: number;
  dateOfTheEvent: Date;
  numberOfTicket: number;
  placeName: string;
  imageSrc?: string;
  description: string;
  category: string;
  popular: boolean;
}

const CreateEvent: React.FC = () => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [invalidMetamask, setInvalidMetamask] = useState<boolean>(false);
  const [succesfullCreateSnackBar, setSuccesfullCreateSnackBar] = useState<boolean>(false);
  const [account, setAccount] = useState<string>();
  const { sdk } = useSDK();
  const [newEventInfo, setNewEventInfo] = useState<INewEvent>({
    eventName: '',
    ticketPrice: 0,
    numberOfTicket: 0,
    dateOfTheEvent: new Date(),
    placeName: '',
    imageSrc: '/img/eventImages/nature.jpeg',
    description: '',
    category: '',
    popular: false
  });
  useEffect(() => {
    const connect = async (): Promise<void> => {
      try {
        const accounts = await sdk?.connect();
        setAccount(accounts?.[0]);
      } catch (err) {
        console.warn('failed to connect..', err);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    void connect();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value, name } = event.target;
    setNewEventInfo({ ...newEventInfo, [name]: value });
  };
  const handleCategoryChange = (event: SelectChangeEvent<string>): void => {
    const { value } = event.target;
    setNewEventInfo({ ...newEventInfo, category: value });
  };
  const handleDateChange = (value: Date | null): void => {
    if (value !== null) {
      const date = new Date(value);
      setNewEventInfo({ ...newEventInfo, dateOfTheEvent: date });
    }
  };

  const theme = useTheme();
  const showLogo = useMediaQuery(theme.breakpoints.down('md'));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCreateEvent = async (): Promise<void> => {
    try {
      const todayDate = new Date();

      if (todayDate > newEventInfo.dateOfTheEvent) {
        setShowSnackBar(true);
        setTimeout(() => {
          setShowSnackBar(false);
        }, 2500);
      } else {
        const dateUINT64 = dateToUint64(newEventInfo.dateOfTheEvent);
        if (account != null) {
          const response = await createNewEvent(dateUINT64, newEventInfo, account);
          setSuccesfullCreateSnackBar(true);
          setTimeout(() => {
            setSuccesfullCreateSnackBar(false);
          }, 2500);
          setNewEventInfo({
            eventName: '',
            ticketPrice: 0,
            numberOfTicket: 0,
            dateOfTheEvent: new Date(),
            placeName: '',
            imageSrc: '',
            description: '',
            category: '',
            popular: false
          });
        } else {
          setInvalidMetamask(true);
          setTimeout(() => {
            setInvalidMetamask(false);
          }, 2500);
        }

        // eslint-disable-next-line @typescript-eslint/await-thenable
      }
    } catch (error) {
      console.log('Event with this ID already exists', error);
    }
  };

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
                gap: '55px'
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {appLanguage === 'cs' ? 'Kategorie' : 'Category'}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newEventInfo.category}
                  onChange={handleCategoryChange}
                  sx={{ background: '#4B4958', color: '#80797B' }}
                  name="category">
                  <MenuItem value={'Music'}>{appLanguage === 'cs' ? 'Hudba' : 'Music'}</MenuItem>
                  <MenuItem value={'Sport'}>{appLanguage === 'cs' ? 'Sport' : 'Sport'}</MenuItem>
                  <MenuItem value={'Family'}>{appLanguage === 'cs' ? 'Rodiny' : 'Family'}</MenuItem>
                  <MenuItem value={'VIP'}>{appLanguage === 'cs' ? 'VIP' : 'VIP'}</MenuItem>
                  <MenuItem value={'Art'}>{appLanguage === 'cs' ? 'Kultura' : 'Art'}</MenuItem>
                </Select>
              </FormControl>
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
            </form>

            <Button
              variant="contained"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
      <Snackbar
        open={invalidMetamask}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.createevent.invalidmetamask`} />
        </Alert>
      </Snackbar>
      <Snackbar
        open={succesfullCreateSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.createevent.eventCreated`} />
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default CreateEvent;
