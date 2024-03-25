import { Box, Button, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/* eslint-disable react/prop-types */
interface IFAQQuestionProps {
  text: string;
  isAnswerVisible: boolean;
  handleShowAnswer: () => void;
}
const FAQQuestion: React.FC<IFAQQuestionProps> = ({ text, isAnswerVisible, handleShowAnswer }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '20px'
      }}
    >
      <h3>{text}</h3>
      <Button onClick={handleShowAnswer}>
        <Typography
          sx={{
            transform: isAnswerVisible ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '0.3s ease'
          }}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </Typography>
      </Button>
    </Box>
  );
};
export default FAQQuestion;
