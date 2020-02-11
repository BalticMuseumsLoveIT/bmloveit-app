import styled from 'styled-components';

export interface DefaultListItemProps {
  isVisibleWhenCollapsed?: boolean;
  isMenuOpened?: boolean;
  isActive?: boolean;
}

export const DefaultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const DefaultListItem = styled.li<DefaultListItemProps>`
  box-sizing: border-box;
  display: ${({ isMenuOpened, isVisibleWhenCollapsed }) =>
    isMenuOpened !== false || isVisibleWhenCollapsed ? 'flex' : 'none'};
  border-radius: ${({ isMenuOpened, isVisibleWhenCollapsed }) =>
    !isMenuOpened && isVisibleWhenCollapsed && '8px'};
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  padding: 20px 16px 16px 16px;
  background-color: ${({ theme, isVisibleWhenCollapsed }) =>
    isVisibleWhenCollapsed
      ? theme.colors.background.menu
      : theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.anchor.link};
  width: 88%;
  max-width: 360px;
  min-height: 72px;
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.background.app}`};
  position: relative;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;

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
    background-color: ${({ theme }) => theme.colors.background.menu};
  }

  &:after {
    content: url('/images/chevron_right-24px.svg');
    content: ${({ isMenuOpened, isVisibleWhenCollapsed }) =>
      isVisibleWhenCollapsed
        ? isMenuOpened
          ? `url('/images/expand_less-24px.svg')`
          : `url('/images/expand_more-24px.svg')`
        : `url('/images/chevron_right-24px.svg')`};
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    right: 18px;
  }
`;

export const DefaultListItemInfo = styled.span`
  padding-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.paragraph};
  font-family: ${({ theme }) => theme.fonts.paragraph.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.paragraph.fontWeight};
`;
