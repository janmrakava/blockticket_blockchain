/* eslint-disable react/prop-types */
import { Grid, Typography } from '@mui/material';
import { convertToDate } from '../../utils/function';
import { useNavigate } from 'react-router-dom';

interface IMyEventProps {
  eventName: string;
  eventID: string;
  dateOfEvent: any;
  placeName: string;
  eventImage: string;
}

const MyEvent: React.FC<IMyEventProps> = ({
  eventID,
  eventName,
  dateOfEvent,
  placeName,
  eventImage
}) => {
  const convertedDate = convertToDate(dateOfEvent);
  const renderDate = `${convertedDate.getDate()}.${
    convertedDate.getMonth() + 1
  }.${convertedDate.getFullYear()}`;
  console.log(renderDate);

  const navigate = useNavigate();
  const handleClickEvent = (eventID: string): void => {
    navigate(`/myeventpage/${eventID}`);
  };
  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={3}
      sx={{
        backgroundImage: `url(${eventImage})`,
        height: '400px',
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
      onClick={() => {
        handleClickEvent(eventID);
      }}>
      <Typography sx={{ fontSize: '20px', fontWeight: '800' }}>{eventName}</Typography>
      <Typography>{placeName}</Typography>
      <Typography>{renderDate}</Typography>
    </Grid>
  );
};

export default MyEvent;
