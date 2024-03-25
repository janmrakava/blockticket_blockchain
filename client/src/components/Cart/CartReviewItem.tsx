/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../pages/store';
import { countDate } from '../../utils/dateFunctions';
import { removeFromCart } from '../../features/cartSlice';
import { FormattedMessage } from 'react-intl';

const CartItemReview: React.FC<ICartReviewItem> = ({
  eventId,
  ticketType,
  quantity,
  imageSrc,
  name,
  nameOfPlace,
  date,
  prices,
  ticketName
}) => {
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  const dispatch = useDispatch();

  const handleDelete = (): void => {
    dispatch(removeFromCart({ eventId, ticketType }));
  };

  const countPrices = (): number => {
    if (appLanguage === 'cs') {
      const price = prices.CZK * quantity;
      return price;
    } else {
      const price = prices.EUR * quantity;
      return price;
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'row',
        gap: '50px'
      }}
    >
      <Box
        sx={{
          width: { xs: '40%', md: '20%', lg: '10%' }
        }}
      >
        <img src={imageSrc} alt="Image of artist" style={{ maxHeight: '80px' }} />
      </Box>
      <Box sx={{ width: { xs: '60%', md: '80%', lg: '90%' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: { xs: '15px', md: '16px', lg: '18px' }, fontWeight: 800 }}>
            {appLanguage === 'cs' ? name.cs : name.en}
          </Typography>
          <CloseIcon onClick={handleDelete} sx={{ cursor: 'pointer' }} />
        </Box>
        <Typography sx={{ fontSize: { xs: '12px', md: '13px', lg: '15px' }, fontWeight: 400 }}>
          {countDate(date)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: { xs: '12px', md: '13px', lg: '15px' }, fontWeight: 400 }}>
            {nameOfPlace}
          </Typography>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: '12px', md: '15px', lg: '20px' } }}>
            {countPrices()} {appLanguage === 'cs' ? 'CZK' : 'EUR'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#80797B' }}>
            {appLanguage === 'cs' ? ticketName.cs : ticketName.en}
          </Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#80797B' }}>
            <FormattedMessage id="app.cartpage.quantity" /> {quantity}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItemReview;
