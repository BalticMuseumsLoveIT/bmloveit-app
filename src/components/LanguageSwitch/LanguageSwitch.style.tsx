import { DefaultListItem } from 'components/DefaultList/DefaultList.style';
import styled from 'styled-components';

export const LanguageSwitchItem = styled(DefaultListItem)`
  padding: 24px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.default};

  &:after {
    content: ${({ isMenuOpened, isVisibleWhenCollapsed }) =>
      !isMenuOpened && isVisibleWhenCollapsed
        ? `url('/images/unfold_more-24px.svg')`
        : `url('/images/chevron_right-24px.svg')`};
  }
`;
