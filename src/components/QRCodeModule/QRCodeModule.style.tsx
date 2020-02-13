import { defaultBoxShadow, DefaultFontSize } from 'components/Page/Page.style';
import { AppButton } from 'components/Buttons/AppButton.style';
import styled from 'styled-components';
import QrReader from 'react-qr-reader';

interface QRCodeMessageProps {
  isError: boolean;
}

export const QRCodeModule = styled(QrReader)`
  width: 70%;
  max-width: 280px;
  margin: 30px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${defaultBoxShadow};

  & > section {
    & > div:first-of-type {
      border: 24px solid rgba(0, 0, 0, 0.3) !important;
      box-shadow: ${({ theme }) =>
        `${theme.colors.background.alternative} 0px 0px 0px 2px inset !important`};
    }
  }
`;

export const QRCodeModulePlaceholder = styled.img`
  display: block;
  width: 70%;
  max-width: 280px;
  margin: 30px auto;
`;

export const QRCodeMessage = styled.div<QRCodeMessageProps>`
  font-family: ${({ theme }) => theme.fonts.paragraph.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.paragraph.fontWeight};
  color: ${({ isError, theme }) =>
    isError === true ? '#B40000' : theme.colors.text.paragraph};
  text-align: center;
  line-height: 1.4;

  ${DefaultFontSize}
`;

export const QRCodeScanButton = styled(AppButton)`
  svg {
    display: block;
    width: 24px;
    height: 24px;
    margin-right: 7px;
    fill: ${({ theme, isDisabled }) =>
      isDisabled
        ? theme.colors.button.primary.disabled.text
        : theme.colors.button.primary.default.text};
  }

  &:hover {
    svg {
      fill: ${({ theme, isDisabled }) =>
        isDisabled
          ? theme.colors.button.primary.disabled.text
          : theme.colors.button.primary.hover.text};
    }
  }

  &:focus {
    svg {
      fill: ${({ theme, isDisabled }) =>
        isDisabled
          ? theme.colors.button.primary.disabled.text
          : theme.colors.button.primary.focus.text};
    }
  }
`;
