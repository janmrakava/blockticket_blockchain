import { Box, Typography } from '@mui/material';

/* eslint-disable react/prop-types */
interface IPreviousOrderItemProps {
  id: string;
  date: string;
  price: number | string;
  numberOfTickets: number | string;
  state: string;
  method: string;
}

const PreviousOrderItem: React.FC<IPreviousOrderItemProps> = ({
  id,
  date,
  price,
  numberOfTickets,
  state,
  method
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '30px'
      }}>
      <Typography>{id}</Typography>
      <Typography>{date}</Typography>
      <Typography>{price} CZK</Typography>
      <Typography>{numberOfTickets}</Typography>
      <Typography>{state}</Typography>
      <Typography>{method}</Typography>
    </Box>
  );
};

export default PreviousOrderItem;
