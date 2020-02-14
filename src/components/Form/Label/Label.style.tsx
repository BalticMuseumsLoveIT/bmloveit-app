import styled from 'styled-components';

const Label = styled.label`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.alternative.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.alternative.fontWeight};
  color: ${({ theme }) => theme.colors.form.label};
  display: block;
  margin-bottom: 6px;
`;

export default Label;
