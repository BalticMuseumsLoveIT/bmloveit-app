import { ButtonProps } from 'utils/interfaces';
import {
  defaultBoxShadow,
  DefaultFontSize,
  SubtitleFontStyle,
} from 'components/Page/Page.style';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { rem } from 'polished';

export const Icon = styled(SVG)`
  display: block;
  width: 1.5em;
  height: 1.5em;
  margin: 1em;

  path.person {
    fill: ${({ theme: { colors } }) => colors.icon.normal};
  }
`;

export const Label = styled.span`
  display: block;

  ${SubtitleFontStyle};
  margin: 1.25em 1em 1.25em 0;

  text-align: left;
  line-height: 1.5;
`;

export const Wrapper = styled.span`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

interface LoginButtonProps extends ButtonProps {
  iconUrl?: string;
}

const LoginButton = styled.button<LoginButtonProps>`
  box-sizing: border-box;

  ${DefaultFontSize};

  width: 100%;
  max-width: ${rem(360)};

  display: block;
  margin: 1em auto;
  padding: 0;

  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.secondary.disabled.text
      : theme.colors.button.secondary.default.text};

  background-color: ${({ theme, isDisabled }) =>
    isDisabled
      ? theme.colors.button.secondary.disabled.background
      : theme.colors.button.secondary.default.background};

  border: none;
  border-radius: 0.5em;

  box-shadow: ${defaultBoxShadow};

  cursor: ${({ isDisabled }) => (isDisabled ? `default` : 'pointer')};
  outline: none;

  &::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.secondary.disabled.background
        : theme.colors.button.secondary.hover.background};
    color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.secondary.disabled.text
        : theme.colors.button.secondary.hover.text};
  }

  &:focus {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.secondary.disabled.background
        : theme.colors.button.secondary.focus.background};
    color: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.secondary.disabled.text
        : theme.colors.button.secondary.focus.text};
  }
`;

export default LoginButton;
