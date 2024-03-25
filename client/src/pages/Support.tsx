import { FormattedMessage } from 'react-intl';
import UserSettingsMenu from '../components/UserSettings/UserSettingsMenu';
import { SupportGrid } from '../styles/supportStyles';
import SupportBanner from '../components/Support/SupportBanner';
import { Box, Grid } from '@mui/material';

const Support: React.FC = () => {
  const supportSections = [
    'ordertickets',
    'paymentdelivery',
    'cancelledevents',
    'myaccount',
    'ticketfast',
    'tickettransfer',
    'resale',
    'duplicates',
    'giftcards',
    'collectortickets',
    'accesibletickets'
  ];

  const supportBanners = supportSections.map((section, index) => {
    return <SupportBanner text={section} key={index} />;
  });

  return (
    <Grid container sx={{ maxWidth: '1228px', margin: '0 auto' }}>
      <UserSettingsMenu active="support" />
      <SupportGrid container>
        <Box sx={{ margin: { xs: '20px auto', lg: '20px 0' } }}>
          <h1>
            <FormattedMessage id="app.support.heading" />
          </h1>
        </Box>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'space-between', lg: 'space-between' },
            gap: '84px'
          }}>
          {supportBanners}
        </Grid>
      </SupportGrid>
    </Grid>
  );
};

export default Support;
