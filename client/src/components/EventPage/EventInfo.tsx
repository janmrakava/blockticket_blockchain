/* eslint-disable react/prop-types */
import { Alert, Box, IconButton, Snackbar, Typography } from '@mui/material';
import { EventInfoBoxText, PegiContainer } from '../OneEvent/styled';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { addToFavorites } from '../../api/users/user';
import { ImageIconSizeBigger } from '../../styles/styles';
import Favorite from '../../../public/icons_imgs/Favorites.png';
import InFavorite from '../../../public/icons_imgs/InFavorite.png';

interface IEventInfoProps {
  eventId: string;
  artist: string;
  city: string;
  location: string;
  date: string;
  userId: string;
  userFavoriteEvents: string[];
  userLoggedIn: boolean;
  prices: Array<{
    prices: any;
    CZK: number;
    EUR: number;
    USD: number;
  }>;
}

const EventInfo: React.FC<IEventInfoProps> = ({
  artist,
  city,
  location,
  date,
  prices,
  userId,
  eventId,
  userLoggedIn,
  userFavoriteEvents
}) => {
  const dateObject = new Date(date);

  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  const currency = appLanguage === 'cs' ? 'CZK' : 'EUR';

  const price = prices[0].prices[currency];

  const [inFavorite, setInFavorite] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const handleFavorite = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.stopPropagation();
    setInFavorite((prev) => !prev);
    setShowSnackBar(true);
    await addToFavorites(userId, eventId);
    setTimeout(() => {
      setShowSnackBar(false);
    }, 1000);
  };

  useEffect(() => {
    const favorite = userFavoriteEvents.includes(eventId);
    setInFavorite(favorite);
  }, []);

  return (
    <Box
      sx={{
        background: '#4B4958',
        borderRadius: '20px',
        maxWidth: '900px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
      <Typography
        sx={{ fontSize: '50px', fontWeight: 'bold', fontFamily: 'Lexend', letterSpacing: '8.5px' }}>
        {artist}
      </Typography>
      <EventInfoBoxText>
        <img src="/icons_imgs/Location.png" style={{ height: '25px' }} />
        <Typography>
          {city}, {location}
        </Typography>
      </EventInfoBoxText>
      <EventInfoBoxText>
        <img src="/icons_imgs/Calendar.png" style={{ height: '25px' }} />
        <Typography>
          {day}.{month}.{year}
        </Typography>
      </EventInfoBoxText>
      <EventInfoBoxText>
        <img src="/icons_imgs/Time.png" style={{ height: '25px' }} />
        <Typography>
          {hours}:{minutes}
        </Typography>
      </EventInfoBoxText>
      <EventInfoBoxText>
        <Typography>
          <FormattedMessage id="app.oneeveent.pricestarts" />
          <br />
          <span style={{ fontWeight: 600 }}>
            {price} {currency}
          </span>
        </Typography>
      </EventInfoBoxText>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PegiContainer>
          <p>18+ | CZ</p>
        </PegiContainer>
        {userLoggedIn &&
          (!inFavorite ? (
            <IconButton
              onClick={(event) => {
                void handleFavorite(event);
              }}>
              <ImageIconSizeBigger
                src={Favorite}
                alt="Favorite Icon"
                sx={{ marginRight: '20px' }}
              />
            </IconButton>
          ) : (
            <IconButton
              onClick={(event) => {
                void handleFavorite(event);
              }}>
              <ImageIconSizeBigger
                src={InFavorite}
                alt="Favorite Icon"
                sx={{ marginRight: '20px' }}
              />
            </IconButton>
          ))}
      </Box>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage
            id={inFavorite ? 'app.favorite.addtofavorite' : 'app.favorite.removetofavorite'}
          />
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventInfo;
