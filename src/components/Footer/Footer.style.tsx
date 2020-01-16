import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
`;

interface FooterLinkProps {
  disabled?: boolean;
}

export const FooterButton = styled.button`
  font-size: 1em;
  line-height: 1;
  background: white;
  color: royalblue;
  outline: none;
  display: inline-block;
  padding: 0.5em;
  margin-right: 0.5em;
  border: 1px solid thistle;
  border-radius: 3px;
  text-decoration: none;

  ${({ disabled }: FooterLinkProps) =>
    disabled &&
    `
    cursor: default;
    border-color: lightgrey;
    color: gray;
  `}

  &:hover {
    background: ${({ disabled }: FooterLinkProps) =>
      disabled ? 'inherit' : 'paleturquoise'};
  }

  &:last-child {
    margin-right: 0;
  }
`;

export default StyledWrapper;
