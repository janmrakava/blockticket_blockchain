import { Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { BoxFlexRow, FooterLink } from '../../styles/styles';

const FooterUrl: React.FC = () => {
  return (
    <BoxFlexRow
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography>
        <FooterLink to="/privacy">
          <FormattedMessage id="app.footer.privacy" />
          <span>&nbsp;|&nbsp;</span>
        </FooterLink>
        <FooterLink to="/condition">
          <FormattedMessage id="app.footer.condition" />
          <span>&nbsp;|&nbsp;</span>
        </FooterLink>
        <FooterLink to="/faq">
          <FormattedMessage id="app.footer.faq" />
          <span>&nbsp;|&nbsp;</span>
        </FooterLink>
        <FooterLink to="/cookies">
          <FormattedMessage id="app.footer.cookies" />
          <span>&nbsp;|&nbsp;</span>
        </FooterLink>
        <FooterLink to="/cookiemanage">
          <FormattedMessage id="app.footer.cookiemanage" />
          <span>&nbsp;|&nbsp;</span>
        </FooterLink>
      </Typography>
    </BoxFlexRow>
  );
};

export default FooterUrl;
