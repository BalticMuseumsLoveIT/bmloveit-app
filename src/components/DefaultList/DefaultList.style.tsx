import styled, { css } from 'styled-components';

export interface DefaultListItemWrapperProps {
  isVisibleWhenCollapsed?: boolean;
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
  display: ${({ isMenuOpened, isVisibleWhenCollapsed }) =>
    isMenuOpened !== false || isVisibleWhenCollapsed ? 'flex' : 'none'};
  border-radius: ${({ isMenuOpened, isVisibleWhenCollapsed }) =>
    !isMenuOpened && isVisibleWhenCollapsed && '8px'};
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  padding: 20px 56px 16px 16px;
  background-color: ${({ theme, isVisibleWhenCollapsed }) =>
    isVisibleWhenCollapsed
      ? theme.colors.list.header.default.background
      : theme.colors.list.item.default.background};
  color: ${({ theme, isVisibleWhenCollapsed }) =>
    isVisibleWhenCollapsed
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

  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:hover,
  &:focus,
  &:visited {
    color: inherit;
  }

  &:hover {
    background-color: ${({ theme, isVisibleWhenCollapsed }) =>
      isVisibleWhenCollapsed
        ? theme.colors.list.header.hover.background
        : theme.colors.list.item.hover.background};
    color: ${({ theme, isVisibleWhenCollapsed }) =>
      isVisibleWhenCollapsed
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: inherit;
    text-decoration: inherit;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    flex-direction: inherit;

    &:hover,
    &:focus,
    &:visited {
      color: inherit;
    }
  }

  ${({ imageUrl }) => {
    if (imageUrl) {
      return css`
        padding-left: 76px;

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
`;

export const DefaultListItemInfo = styled.span`
  padding-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.list.info};
  font-family: ${({ theme }) => theme.fonts.paragraph.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.paragraph.fontWeight};
`;
