import styled from 'styled-components';

interface LoginButtonProps {
  iconUrl: string;
  isDisabled?: boolean;
}

const LoginButton = styled.button<LoginButtonProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 88%;
  max-width: 326px;
  padding: 24px;
  background-color: #ffffff;
  color: ${({ theme }) => theme.colors.text.paragraph};
  font-family: ${({ theme }) => theme.fonts.subheader.fontFamily};
  font-weight: ${({ theme }) => theme.fonts.subheader.fontWeight};
  font-size: 16px;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  cursor: ${({ isDisabled }) => (isDisabled ? `default` : 'pointer')};

  &:before {
    content: ${({ iconUrl }) => (iconUrl ? `url(${iconUrl})` : '')};
    width: 24px;
    height: 24px;
    margin-right: 24px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.default};
  }
`;

export default LoginButton;
