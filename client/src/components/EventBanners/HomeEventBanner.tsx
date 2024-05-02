/* eslint-disable react/prop-types */
import { Alert, Box, IconButton, Snackbar, Typography } from '@mui/material';
import PopularBanner from './PopularBanner';
import {
  BoxFlexCenterSpaceBetween,
  BoxFlexRowCenter,
  ExtendedBoxFontSize,
  ImageIconSizeBigger,
  MobileEventBannerGrid,
  TypographyBold,
  TypographyExtraBold,
  TypographyMedium
} from '../../styles/styles';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import Tickets from '../../../public/icons_imgs/Ticket.png';
import Favorite from '../../../public/icons_imgs/Favorites.png';
import InFavorite from '../../../public/icons_imgs/InFavorite.png';

/* import FavoritesDark from '../../../public/icons_imgs/FavoritesDark.png';
 */
import { FormattedMessage } from 'react-intl';
import { convertToDate, countDate } from '../../utils/function';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IEventProps {
  eventId: string;
  userId: string;
  name: string;
  date: bigint;
  place: string;
  category_of_event?: string;
  popular?: boolean;
  ticketsSold: number;
  numberOfTickets: number;
  imgSrc: string;
  wideScreen?: boolean;
  userLoggedIn: boolean;
}

const HomeEventBanner: React.FC<IEventProps> = ({
  eventId,
  name,
  date,
  place,
  popular,
  ticketsSold,
  imgSrc,
  wideScreen,
  userLoggedIn,
  numberOfTickets
}) => {
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

  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    navigate(`/event/${id}`);
  };
  const convertedDate = convertToDate(date);

  const newDate = countDate(convertedDate);

  return (
    <MobileEventBannerGrid
      item
      xs={10}
      sm={5}
      md={5}
      lg={wideScreen === true ? 6 : 4}
      sx={{ backgroundImage: `url(${imgSrc})`, height: '400px', cursor: 'pointer' }}
      onClick={() => {
        handleClick(eventId);
      }}>
      <BoxFlexCenterSpaceBetween>
        <BoxFlexRowCenter>
          <ImageIconSizeBigger src={Tickets} alt="Image of ticket" />
          <Box sx={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
            <TypographyBold>
              <FormattedMessage id="app.eventbanner.ticketssold" />
            </TypographyBold>
            {ticketsSold === numberOfTickets ? (
              <Typography>VYPRODÁNO</Typography>
            ) : (
              <TypographyBold>{ticketsSold.toString()}</TypographyBold>
            )}
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

      <Box sx={{ marginTop: '0px', margin: '20px' }}>
        {(popular ?? false) && <PopularBanner />}
        <TypographyExtraBold>{name}</TypographyExtraBold>
        <TypographyMedium>{newDate}</TypographyMedium>
        <ExtendedBoxFontSize>
          <PlaceOutlinedIcon />
          <Typography>{place}</Typography>
        </ExtendedBoxFontSize>
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
    </MobileEventBannerGrid>
  );
};

export default HomeEventBanner;
