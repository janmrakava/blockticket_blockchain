/* eslint-disable react/prop-types */
import { Alert, Box, IconButton, Snackbar, Typography } from '@mui/material';
import { type IEventProps } from './MobileEventBanner';
import { countDate, countTickets } from '../../utils/function';
import {
  BoxFlexCenterSpaceBetween,
  BoxFlexRowCenter,
  ExtendedBoxFontSize,
  ImageIconSizeBigger,
  MobileEventBannerGrid,
  SearchResultBox,
  TypographyBold,
  TypographyBoldFontSize,
  TypographyMedium
} from '../../styles/styles';
import { FormattedMessage } from 'react-intl';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import Tickets from '../../../public/icons_imgs/Ticket.png';
import Favorite from '../../../public/icons_imgs/Favorites.png';
import InFavorite from '../../../public/icons_imgs/InFavorite.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToFavorites } from '../../api/users/user';

const SearchResultBanner: React.FC<IEventProps> = ({
  eventId,
  userId,
  userFavoritesEvent,
  name,
  date,
  place,
  ticketsSold,
  imgSrc,
  userLoggedIn
}) => {
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
    const favorite = eventId in userFavoritesEvent;
    setInFavorite(favorite);
  }, []);

  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    navigate(`/event/${id}`);
  };

  const newDate = countDate(date);
  const ticketSoldUpdated = countTickets(ticketsSold);
  return (
    <MobileEventBannerGrid
      item
      xs={10}
      md={5}
      lg={2.5}
      sx={{ backgroundImage: `url(${imgSrc})`, width: '343', height: '500px', cursor: 'pointer' }}
      onClick={() => {
        handleClick(eventId);
      }}>
      <BoxFlexCenterSpaceBetween>
        <BoxFlexRowCenter>
          <IconButton>
            <ImageIconSizeBigger src={Tickets} alt="Image of ticket" />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
            <TypographyBold>
              <FormattedMessage id="app.eventbanner.ticketssold" />
            </TypographyBold>
            <TypographyBold>{ticketSoldUpdated}</TypographyBold>
          </Box>
        </BoxFlexRowCenter>
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
      </BoxFlexCenterSpaceBetween>

      <SearchResultBox>
        <TypographyBoldFontSize>{name}</TypographyBoldFontSize>
        <TypographyMedium>{newDate}</TypographyMedium>
        <ExtendedBoxFontSize>
          <PlaceOutlinedIcon />
          <Typography>{place}</Typography>
        </ExtendedBoxFontSize>
      </SearchResultBox>
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
    </MobileEventBannerGrid>
  );
};

export default SearchResultBanner;
