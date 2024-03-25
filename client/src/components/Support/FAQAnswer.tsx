import { Box, Grow } from '@mui/material';

/* eslint-disable react/prop-types */
interface IFAQAnswerProps {
  text: string;
  isAnswerVisible: boolean;
}
const FAQAnswer: React.FC<IFAQAnswerProps> = ({ text, isAnswerVisible }) => {
  const renderTypographyElements = (): JSX.Element => {
    return <>{text}</>;
  };
  return (
    <Box sx={{ display: isAnswerVisible ? 'flex' : 'none', marginLeft: '20px' }}>
      <Grow
        in={isAnswerVisible}
        style={{ transformOrigin: '0 0 0' }}
        {...(isAnswerVisible ? { timeout: 1000 } : { timeout: 1000 })}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {renderTypographyElements()}
        </Box>
      </Grow>
    </Box>
  );
};
export default FAQAnswer;
