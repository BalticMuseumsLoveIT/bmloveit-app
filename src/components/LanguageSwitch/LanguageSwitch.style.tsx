import { DefaultListItem } from 'components/DefaultList/DefaultListItem';
import { DefaultList } from 'components/DefaultList/DefaultList.style';
import styled from 'styled-components';
import { rem } from 'polished';

export const LanguageSwitchList = styled(DefaultList)`
  max-width: ${rem(360)};
`;

export const LanguageSwitchItem = styled(DefaultListItem)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.default};
`;
