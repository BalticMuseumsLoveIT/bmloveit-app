import { DefaultListItem } from 'components/DefaultList/DefaultListItem';
import { DefaultList } from 'components/DefaultList/DefaultList.style';
import styled from 'styled-components';
import { em } from 'polished';

export const LanguageSwitchList = styled(DefaultList)`
  max-width: ${em(360)};
`;

export const LanguageSwitchItem = styled(DefaultListItem)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.default};
`;
