/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { memo } from 'react';

const IndicatorStep: React.FC<IStepIndicatorProps> = ({ active }) => {
  const stepsArray = [0, 1, 2, 3];
  const renderSteps = stepsArray.map((index) => {
    return (
      <img
        src={active === index ? '/register_page/active.png' : '/register_page/nonactive.png'}
        alt="Step indicator"
        style={{ width: '24px', height: '24px' }}
        key={index}
      />
    );
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px'
      }}>
      {renderSteps}
    </Box>
  );
};

export const StepIndicator = memo(IndicatorStep);
