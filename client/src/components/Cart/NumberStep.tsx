/* eslint-disable react/prop-types */
import { memo } from 'react';
import { TypographyStep } from './styled';

const StepNumber: React.FC<INumberStepProps> = ({ active, number }) => {
  return (
    <TypographyStep $active={active} sx={{ fontWeight: 800, fontSize: '20px' }}>
      {number}
    </TypographyStep>
  );
};

export const NumberStep = memo(StepNumber);
