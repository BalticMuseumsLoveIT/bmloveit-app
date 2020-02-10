import styled from 'styled-components';

// props for LanguageSwitcher
interface DefaultListItemProps {
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
  display: ${({ isMenuOpened, isActive }) =>
    isMenuOpened || isActive ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.background.default};
  width: 88%;
  max-width: 360px;
  height: 72px;
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.background.app}`};
  position: relative;
  border-radius: ${({ isMenuOpened }) => !isMenuOpened && '8px'};

  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:hover {
    cursor: pointer;
  }

  &:after {
    content: ${({ isMenuOpened, isActive }) =>
      !isMenuOpened && isActive
        ? `url('/images/unfold_more-24px.svg')`
        : `url('/images/chevron_right-24px.svg')`};
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    right: 18px;
  }
`;
