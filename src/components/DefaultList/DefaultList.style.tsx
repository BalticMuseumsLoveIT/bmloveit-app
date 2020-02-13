import { defaultBoxShadow } from 'components/Page/Page.style';
import styled, { css } from 'styled-components';

export interface DefaultListItemWrapperProps {
  isHeader?: boolean;
  isMenuOpened?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  imageUrl?: string;
}

export const DefaultList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 25px auto;
`;

export const DefaultListItemWrapper = styled.li<DefaultListItemWrapperProps>`
  box-sizing: border-box;
  display: ${({ isMenuOpened, isHeader }) =>
    isMenuOpened !== false || isHeader ? 'flex' : 'none'};
  border-radius: ${({ isMenuOpened, isHeader }) =>
    !isMenuOpened && isHeader && '8px'};
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  padding: ${({ isHeader }) => isHeader === true && '0 16px'};
  background-color: ${({ theme, isHeader }) =>
    isHeader
      ? theme.colors.list.header.default.background
      : theme.colors.list.item.default.background};
  color: ${({ theme, isHeader }) =>
    isHeader
      ? theme.colors.list.header.default.text
      : theme.colors.list.item.default.text};
  width: 88%;
  max-width: 360px;
  min-height: 72px;
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.background.app}`};
  position: relative;
  text-decoration: none;
  font-size: 16px;
  cursor: ${({ isDisabled }) => (isDisabled === true ? 'default' : 'pointer')};
  box-shadow: ${({ isHeader, isMenuOpened }) =>
    isHeader === true && isMenuOpened === false && defaultBoxShadow};

  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: ${defaultBoxShadow};
  }

  &:hover,
  &:focus,
  &:visited {
    color: inherit;
  }

  &:hover {
    background-color: ${({ theme, isHeader }) =>
      isHeader
        ? theme.colors.list.header.hover.background
        : theme.colors.list.item.hover.background};
    color: ${({ theme, isHeader }) =>
      isHeader
        ? theme.colors.list.header.hover.text
        : theme.colors.list.item.hover.text};

    svg {
      path {
        fill: ${({ theme }) => theme.colors.list.item.hover.text};
      }
    }
  }

  svg {
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    right: 18px;
    fill: ${({ theme }) => theme.colors.list.item.default.text};
  }

  & > a {
    box-sizing: inherit;
    z-index: 1;
    width: 100%;
    padding: 20px 56px 16px 16px;
    text-decoration: inherit;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    flex-direction: inherit;
    color: ${({ theme, isHeader }) =>
      isHeader
        ? theme.colors.list.header.default.text
        : theme.colors.list.item.default.text};

    &:hover,
    &:focus,
    &:visited {
      color: inherit;
    }

    ${({ imageUrl }) => {
      if (imageUrl) {
        return css`
          padding-left: calc(18px + 40px + 5%);

          &:before {
            content: '';
            background: url('${imageUrl}') center center no-repeat;
            background-size: cover;
            width: 40px;
            height: 40px;
            position: absolute;
            left: 18px;
            border-radius: 4px;
          }
      `;
      }
    }}
  }
`;

export const DefaultListItemInfo = styled.span`
  padding-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.list.info};
  font-family: ${({ theme }) => theme.fonts.paragraph.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.paragraph.fontWeight};
`;
