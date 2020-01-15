import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
`;

interface FooterLinkProps {
  isDisabled?: boolean;
}

export const FooterLink = styled(Link).attrs<FooterLinkProps>(
  ({ isDisabled }) => ({
    isDisabled: isDisabled || false,
  }),
)<FooterLinkProps>`
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

  ${props =>
    props.isDisabled &&
    `
    cursor: default;
    border-color: lightgrey;
    color: gray;
  `}

  &:hover {
    background: ${props => (props.isDisabled ? 'inherit' : 'paleturquoise')};
  }

  &:last-child {
    margin-right: 0;
  }
`;

export default StyledWrapper;
