import { StepsContainer, Step, StepLine } from 'components/Steps/Steps.style';
import React from 'react';

const Steps = () => {
  return (
    <StepsContainer>
      <Step description="Select place" />
      <StepLine />
      <Step description="Select tour" />
    </StepsContainer>
  );
};

export default Steps;
