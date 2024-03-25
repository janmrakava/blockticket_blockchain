/* eslint-disable react/prop-types */
import { Alert, Box, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';
import { countDate, countTickets } from '../../utils/function';
import { useNavigate } from 'react-router-dom';
import Favorite from '../../../public/icons_imgs/Favorites.png';
import InFavorite from '../../../public/icons_imgs/InFavorite.png';
import Tickets from '../../../public/icons_imgs/Ticket.png';

import { ImageIconSizeBigger, TypographyBold } from '../../styles/styles';
import { useEffect, useState } from 'react';
import { addToFavorites } from '../../api/users/user';
import { FormattedMessage } from 'react-intl';
import { type Event } from '../../utils/interfaces';

interface IFavoriteBannerProps {
  eventId: string;
  name: {
    cs: string;
    en: string;
  };
  dateOfTheEvent: Date;
  image: string;
  place: string;
  userId: string;
  userFavoriteEvents: Event[];
  userLoggedIn: boolean;
  ticketsSold: number;
}

const FavoriteEventBanner: React.FC<IFavoriteBannerProps> = ({
  eventId,
  name,
  dateOfTheEvent,
  image,
  place,
  userId,
  userFavoriteEvents,
  userLoggedIn,
  ticketsSold
}) => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  const navigate = useNavigate();
  const handleNavigate = (): void => {
    navigate(`/event/${eventId}`);
  };
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

  const ticketsSoldUpdated = countTickets(ticketsSold);

  useEffect(() => {
    const isEventInFavorites = userFavoriteEvents.some((event) => event._id === eventId);
    setInFavorite(isEventInFavorites);
  }, [userFavoriteEvents]);

  const dateRender = countDate(dateOfTheEvent);
  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={5}
      sx={{
        backgroundImage: `url(${image})`,
        height: '400px',
        cursor: 'pointer',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px'
      }}
      onClick={handleNavigate}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
          <ImageIconSizeBigger src={Tickets} alt="Image of ticket" />
          <Box>
            <TypographyBold>
              <FormattedMessage id="app.eventbanner.ticketssold" />
            </TypographyBold>
            <Typography>{ticketsSoldUpdated}</Typography>
          </Box>
        </Box>
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
      <Box>
        <Typography sx={{ fontSize: '36px', fontWeight: 900 }}>
          {appLanguage === 'cs' ? name.cs : name.en}
        </Typography>
        <Typography sx={{ fontSize: '25px' }}>{dateRender}</Typography>
        <Typography sx={{ fontSize: '25px' }}>{place}</Typography>
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
    </Grid>
  );
};

export default FavoriteEventBanner;
