import {
  StepState,
  StepsContainer,
  Step,
  StepLine,
} from 'components/Steps/Steps.style';
import React from 'react';

const steps = [{ description: 'Select place' }, { description: 'Select tour' }];

interface StepsProps {
  currentStepNumber: number;
}

const Steps = ({ currentStepNumber }: StepsProps) => {
  return (
    <StepsContainer>
      {steps.map((step, index) => {
        const stepState =
          index === currentStepNumber
            ? StepState.IN_PROGRESS
            : index < currentStepNumber
            ? StepState.DONE
            : StepState.DEFAULT;

        return (
          <React.Fragment key={index}>
            {index !== 0 && (
              <StepLine isActive={stepState !== StepState.DEFAULT} />
            )}
            <Step description={step.description} state={stepState} />
          </React.Fragment>
        );
      })}
    </StepsContainer>
  );
};

export default Steps;
