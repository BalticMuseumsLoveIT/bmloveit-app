import styled, { css } from 'styled-components';

interface StepProps {
  description: string;
}

export const StepsContainer = styled.div`
  counter-reset: step;
  width: 70%;
  max-width: 205px;

  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Step = styled.div<StepProps>`
  counter-increment: step;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid red;
  border-radius: 50%;
  color: red;
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.fonts.paragraph.fontFamily};
  font-weight: bold;
  cursor: default;
  z-index: 1;
  position: relative;

  &:before {
    content: counter(step);
  }

  &:after {
    content: '${({ description }) => description}';
    position: absolute;
    width: 95px;
    top: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StepLine = styled.div`
  flex-grow: 1;

  &:before {
    content: '';
    margin-top: 15px;
    display: block;
    border-bottom: 2px dashed red;
  }
`;
