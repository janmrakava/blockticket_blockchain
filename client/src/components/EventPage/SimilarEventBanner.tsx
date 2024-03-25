import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
interface ISimilarEventProps {
  artist: string;
  image: string;
  id: string;
}

const SimilarEventBanner: React.FC<ISimilarEventProps> = ({ artist, image, id }) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(`/event/${id}`);
  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        height: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: '20px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          marginBottom: '20px',
          paddingLeft: '10px',
          width: '310px',
          background: '#131021',
          borderRadius: '10px'
        }}
      >
        <h1>{artist}</h1>
      </Box>
    </Box>
  );
};

export default SimilarEventBanner;
