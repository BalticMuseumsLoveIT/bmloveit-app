import { ButtonProps } from 'utils/interfaces';
import { DefaultFontSize, LinkStyle } from 'components/Page/Page.style';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.header};
  display: flex;
  align-items: center;

  ${DefaultFontSize}
`;

export const InfoMessage = styled.p`
  font-size: 1em;
  line-height: 150%;
  margin: 1em;
  flex-grow: 1;
  font-family: ${props => props.theme.fonts.paragraph.fontFamily};
  font-weight: ${props => props.theme.fonts.paragraph.fontWeight};

  a {
    ${LinkStyle}
  }
`;

export const CloseButton = styled.button<ButtonProps>`
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  background: transparent;
  display: block;

  font-size: 1em;
  padding: 1em;
`;

export const CloseButtonIcon = styled(SVG)`
  display: block;
  width: 1.5em;
  height: 1.5em;

  path {
    transition: fill 0.25s ease;

    fill: ${({ theme }) => theme.colors.icon.normal};

    ${CloseButton}:hover & {
      fill: ${({ theme }) => theme.colors.icon.hover};
    }
  }
`;
