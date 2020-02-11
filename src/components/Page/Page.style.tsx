import styled from 'styled-components';
import { em } from 'polished';

export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.header.fontFamily};
  font-weight: ${props => props.theme.fonts.header.fontWeight};
  font-size: ${em(24)};
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-family: ${props => props.theme.fonts.subheader.fontFamily};
  font-weight: ${props => props.theme.fonts.subheader.fontWeight};
  font-size: ${em(16)};
  text-align: center;
`;

export const Emphasize = styled.div`
  font-family: ${props => props.theme.fonts.alternative.fontFamily};
  font-weight: ${props => props.theme.fonts.alternative.fontWeight};
  text-align: center;
`;

export const Description = styled.div``;

export const ButtonLink = styled.button`
  font-size: 1em;
  border: 0;
  background: none;
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: inline;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
