import { Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';

interface INothingToShowProps {
  text: string;
}
// eslint-disable-next-line react/prop-types
const NothingToShowBanner: React.FC<INothingToShowProps> = ({ text }) => {
  return (
    <Grid
      item
      xs={12}
      md={12}
      lg={12}
      sx={{ textAlign: 'center', marginTop: '100px', marginBottom: '100px' }}>
      <h1>
        <FormattedMessage id={`app.favoritespage.${text}`} />
      </h1>
    </Grid>
  );
};

export default NothingToShowBanner;
