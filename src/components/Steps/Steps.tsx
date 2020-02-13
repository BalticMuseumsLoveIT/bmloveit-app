import {
  StepState,
  StepsContainer,
  Step,
  StepLine,
} from 'components/Steps/Steps.style';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface StepsProps {
  currentStepNumber: number;
}

const Steps = ({ currentStepNumber }: StepsProps) => {
  const { t, ready } = useTranslation('app');

  const steps = [
    { description: t('step.first', 'Select place') },
    { description: t('step.second', 'Select tour') },
  ];

  return ready ? (
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
  ) : null;
};

export default Steps;
