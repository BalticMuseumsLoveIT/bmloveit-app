import { DefaultListItem } from 'components/DefaultList/DefaultListItem';
import styled from 'styled-components';

export const LanguageSwitchItem = styled(DefaultListItem)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.default};
`;
