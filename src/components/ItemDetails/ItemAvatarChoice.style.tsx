import styled from 'styled-components';
import React from 'react';

export const AvatarList = styled.div`
  margin: 1em 0;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AvatarButton = styled(({ isSelected, ...rest }) => (
  <button {...rest} />
))`
  font-size: 1em;
  display: inline-block;
  padding: 0.5em;
  margin-right: 0.5em;
  border: 1px solid
    ${props => (props.isSelected ? 'royalblue' : 'cornflowerblue')};
  background: ${props => (props.isSelected ? 'royalblue' : 'cornflowerblue')};
  color: white;
  border-radius: 3px;
  ${props => props.isSelected && `box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.2)`};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    border-color: royalblue;
    background-color: royalblue;
  }

  &:focus {
    outline: none;
  }

  &:last-child {
    margin-right: 0;
  }
`;
