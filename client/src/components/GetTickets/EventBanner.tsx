/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material';
import { memo } from 'react';
import { countDate, countTime } from '../../utils/dateFunctions';
import { EventInfoBoxText } from '../OneEvent/styled';

const GetTicketsEventBanner: React.FC<EventBannerProps> = ({
  eventImg,
  eventName,
  date,
  place,
  city
}) => {
  const formatDate = countDate(date);
  const formatTime = countTime(date);
  return (
    <>
      <Grid item xs={12} md={6} lg={6}>
        <Box
          sx={{
            maxWidth: '600px',
            maxHeight: '400px',
            padding: '0px !important'
          }}
        >
          <img src={eventImg} alt="Image of event" style={{ width: '100%', height: '100%' }} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        lg={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          fontFamily: 'Lexend',
          fontWeight: 400
        }}
      >
        <Typography variant="h3" fontWeight={600}>
          {eventName}
        </Typography>
        <EventInfoBoxText>
          <img src="/icons_imgs/Location.png" style={{ height: '25px' }} />
          <Typography>
            {city}, {place}
          </Typography>
        </EventInfoBoxText>
        <EventInfoBoxText>
          <img src="/icons_imgs/Calendar.png" style={{ height: '25px' }} />
          <Typography>{formatDate}</Typography>
        </EventInfoBoxText>
        <EventInfoBoxText>
          <img src="/icons_imgs/Time.png" style={{ height: '25px' }} />
          <Typography>{formatTime}</Typography>
        </EventInfoBoxText>
      </Grid>
    </>
  );
};

export const EventBanner = memo(GetTicketsEventBanner);
