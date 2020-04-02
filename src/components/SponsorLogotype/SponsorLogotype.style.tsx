import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  height: 4em;
  padding: 0.5em 0;
`;

export const Anchor = styled.a`
  display: inline-block;
  position: relative;

  margin-right: 1em;

  &:first-child {
    margin-left: 1em;
  }
`;

export const Image = styled.img`
  display: block;
  object-fit: scale-down;

  max-height: 4em;
  max-width: 100%;
  min-width: 0;
`;
