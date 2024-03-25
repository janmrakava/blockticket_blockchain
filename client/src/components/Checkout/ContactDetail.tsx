/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';

const ContactDetail: React.FC<IContactDetailProps> = ({
  firstName,
  lastName,
  email,
  telNumber
}) => {
  return (
    <Box
      sx={{
        padding: '20px',
        paddingTop: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <p>
          <FormattedMessage id="app.checkoutpage.name" />
        </p>
        <p>
          <FormattedMessage id="app.checkoutpage.email" />
        </p>
        <p>
          <FormattedMessage id="app.checkoutpage.telnumber" />
        </p>
      </Box>
      <Box>
        <p>
          {firstName} {lastName}
        </p>
        <p>{email}</p>
        <p>{telNumber}</p>
      </Box>
    </Box>
  );
};

export const DetailContact = memo(ContactDetail);
