/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react/prop-types */
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { type RootState } from '../../pages/store';
import { ImageIconSizeBigger } from '../../styles/styles';
import { useState } from 'react';
import { countTickets } from '../../utils/function';
import { FormattedMessage } from 'react-intl';
import PopularBanner from '../EventBanners/PopularBanner';
import { countDate } from '../../utils/dateFunctions';
import { useNavigate } from 'react-router-dom';

export interface ITicketType {
  _id: string;
  category: string[];
  description: {
    cs: string;
    en: string;
  };
  quantity: number;
  sold: number;
}

interface IEventCategoryProps {
  eventId: string;
  name: {
    cs: string;
    en: string;
  };
  imageSrc: string;
  isWide: boolean;
  popular: boolean;
  date: string;
  place: string;
  ticketsTypes: ITicketType[];
  userLoggedIn: boolean;
}

const EventBannerCategory: React.FC<IEventCategoryProps> = ({
  eventId,
  name,
  isWide,
  imageSrc,
  popular,
  date,
  place,
  ticketsTypes,
  userLoggedIn
}) => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);
  const [inFavorite, setInFavorite] = useState<boolean>(false);
  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setInFavorite((prev) => !prev);
  };

  const sumSold = (): number => {
    const totalSold = ticketsTypes.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.sold;
    }, 0);

    return totalSold;
  };

  const totalSold = sumSold();
  const renderTotalSold = countTickets(totalSold);

  const renderDate = countDate(date);

  const navigate = useNavigate();

  const handleNavigate = (): void => {
    navigate(`/event/${eventId}`);
  };
  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={isWide ? 7 : 4}
      onClick={handleNavigate}
      sx={{
        backgroundImage: `url(${imageSrc})`,
        height: '400px',
        cursor: 'pointer',
        backgroundSize: 'cover',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
          <img src="/icons_imgs/Ticket.png" alt="Image of Ticket" style={{ width: '30px' }} />
          <Box>
            <Typography sx={{ fontSize: '12px', fontWeight: 800 }}>
              <FormattedMessage id="app.eventbanner.ticketssold" />
            </Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: 800 }}>{renderTotalSold}</Typography>
          </Box>
        </Box>
        <Box>
          {userLoggedIn &&
            (!inFavorite ? (
              <IconButton
                onClick={(event) => {
                  handleFavorite(event);
                }}
              >
                <ImageIconSizeBigger
                  src="/icons_imgs/Favorites.png"
                  alt="Favorite Icon"
                  sx={{ marginRight: '20px' }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={(event) => {
                  handleFavorite(event);
                }}
              >
                <ImageIconSizeBigger
                  src="/icons_imgs/InFavorite.png"
                  alt="Favorite Icon"
                  sx={{ marginRight: '20px' }}
                />
              </IconButton>
            ))}
        </Box>
      </Box>

      <Box>
        {popular && <PopularBanner />}
        <Typography sx={{ fontSize: '25px', fontWeight: 900 }}>
          {appLanguage === 'cs' ? name.cs : name.en}
        </Typography>
        <Typography sx={{ fontSize: '16px' }}>{renderDate}</Typography>
        <Typography sx={{ fontSize: '16px' }}>{place}</Typography>
      </Box>
    </Grid>
  );
};

export default EventBannerCategory;
