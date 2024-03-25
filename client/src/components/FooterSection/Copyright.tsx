import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { FormattedMessage } from 'react-intl';
import { FooterCopyrightTypography } from '../../styles/styles';

const Copyright: React.FC = () => {
  return (
    <>
      <FooterCopyrightTypography>
        <CopyrightIcon sx={{ color: '#4b4958 !important' }} />
        <FormattedMessage id="app.footer.copyright" />
      </FooterCopyrightTypography>
    </>
  );
};

export default Copyright;
