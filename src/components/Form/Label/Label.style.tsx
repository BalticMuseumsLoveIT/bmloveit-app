import {
  AlternativeFontStyle,
  SmallerFontSize,
} from 'components/Page/Page.style';
import styled from 'styled-components';
import { em } from 'polished';

const Label = styled.label`
  ${SmallerFontSize};
  ${AlternativeFontStyle};
  color: ${({ theme }) => theme.colors.form.label};
  display: block;
  margin-bottom: ${em(8, 14)};
`;

export default Label;
