import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FooterLink = styled(({ isDisabled, ...rest }) => (
  <Link {...rest} />
))`
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
