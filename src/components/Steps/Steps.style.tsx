import styled, { css } from 'styled-components';

export enum StepState {
  DONE,
  IN_PROGRESS,
  DEFAULT,
}

interface StepProps {
  description: string;
  state: StepState;
}

interface StepLineProps {
  isActive: boolean;
}

export const StepsContainer = styled.div`
  counter-reset: step;
  width: 70%;
  max-width: 205px;
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  margin: 50px auto;
`;

export const Step = styled.div<StepProps>`
  counter-increment: step;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ state, theme }) =>
    `2px solid ${
      state !== StepState.DEFAULT
        ? theme.colors.background.alternative
        : theme.colors.text.paragraph
    }`};
  border-radius: 50%;
  background-color: ${({ state, theme }) =>
    state === StepState.DONE
      ? theme.colors.background.alternative
      : 'transparent'};

  ${({ state, theme }) => {
    switch (state) {
      case StepState.DONE:
        return css`
          color: #fff;
        `;
      case StepState.IN_PROGRESS:
        return css`
          color: ${theme.colors.background.alternative};
        `;
      default:
        return css`
          color: ${theme.colors.text.paragraph};
        `;
    }
  }}
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.fonts.paragraph.fontFamily};
  font-weight: bold;
  cursor: default;
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
    color: ${({ state, theme }) =>
      state !== StepState.DEFAULT
        ? theme.colors.background.alternative
        : theme.fonts.paragraph.fontFamily};
  }
`;

export const StepLine = styled.div<StepLineProps>`
  flex-grow: 1;

  &:before {
    content: '';
    margin-top: 15px;
    display: block;
    border-bottom: ${({ isActive, theme }) =>
      `2px dashed ${
        isActive === true
          ? theme.colors.background.alternative
          : theme.colors.text.paragraph
      }`};
  }
`;
