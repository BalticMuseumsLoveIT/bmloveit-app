import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  height: 4em;
  padding: 0.5em 0;
`;

export const Image = styled.img`
  display: inline-block;
  object-fit: scale-down;
  margin-right: 1em;

  max-height: 100%;
  max-width: 100%;
  min-width: 0;

  &:first-child {
    margin-left: 1em;
  }
`;
