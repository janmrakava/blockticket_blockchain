/* eslint-disable react/prop-types */
import { Alert, Box, IconButton, Snackbar, Typography } from '@mui/material';
import { EventInfoBoxText, PegiContainer } from '../../pages/OneEvent/styled';

import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { ImageIconSizeBigger } from '../../styles/styles';
import Favorite from '../../../public/icons_imgs/Favorites.png';
import InFavorite from '../../../public/icons_imgs/InFavorite.png';
import { convertToDate, countDate } from '../../utils/function';

interface IEventInfoProps {
  eventName: string;
  eventID: string;
  placeName: string;
  dateOfEvent: bigint;
  ticketPrice: number;
  userId: string;
  userLoggedIn: boolean;
}

const EventInfo: React.FC<IEventInfoProps> = ({
  eventName,
  dateOfEvent,
  ticketPrice,
  placeName,
  userLoggedIn
}) => {
  const convertedDate = convertToDate(dateOfEvent);
  const newDate = countDate(convertedDate);

  const [inFavorite, setInFavorite] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const handleFavorite = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.stopPropagation();
    setInFavorite((prev) => !prev);
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
    }, 1000);
  };

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
        {eventName}
      </Typography>
      <EventInfoBoxText>
        <img src="/icons_imgs/Location.png" style={{ height: '25px' }} />
        <Typography>{placeName}</Typography>
      </EventInfoBoxText>
      <EventInfoBoxText>
        <img src="/icons_imgs/Calendar.png" style={{ height: '25px' }} />
        <Typography>{newDate}</Typography>
      </EventInfoBoxText>
      <EventInfoBoxText>
        <img src="/icons_imgs/Time.png" style={{ height: '25px' }} />
        <Typography>
          {convertedDate.getHours()}:{convertedDate.getMinutes()}
        </Typography>
      </EventInfoBoxText>
      <EventInfoBoxText>
        <Typography>
          <FormattedMessage id="app.oneeveent.pricestarts" />
          <br />
          <span style={{ fontWeight: 600 }}>{ticketPrice.toString()} CZK</span>
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
