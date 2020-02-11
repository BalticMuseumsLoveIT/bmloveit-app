import styled, { css } from 'styled-components';
import { darken, em, fluidRange, lighten } from 'polished';
import { Link } from 'react-router-dom';
import { ThemeType } from 'utils/interfaces';

export const DefaultFontSize = css`
  ${fluidRange(
    {
      prop: 'font-size',
      fromSize: em(12),
      toSize: em(16),
    },
    em(320),
    em(640),
  )}
`;

export const DefaultGridPadding = css`
  ${fluidRange(
    {
      prop: 'padding-left',
      fromSize: em(12),
      toSize: em(16),
    },
    em(320),
    em(640),
  )}

  ${fluidRange(
    {
      prop: 'padding-right',
      fromSize: em(12),
      toSize: em(16),
    },
    em(320),
    em(640),
  )}
`;

export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.header.fontFamily};
  font-weight: ${props => props.theme.fonts.header.fontWeight};
  color: ${props => props.theme.colors.text.header};
  text-align: center;
  ${fluidRange(
    {
      prop: 'font-size',
      fromSize: em(18),
      toSize: em(24),
    },
    em(320),
    em(640),
  )}
`;

export const Subtitle = styled.h2`
  font-family: ${props => props.theme.fonts.subheader.fontFamily};
  font-weight: ${props => props.theme.fonts.subheader.fontWeight};
  color: ${props => props.theme.colors.text.header};
  text-align: center;
  ${DefaultFontSize}
`;

export const Emphasize = styled.div`
  font-family: ${props => props.theme.fonts.alternative.fontFamily};
  font-weight: ${props => props.theme.fonts.alternative.fontWeight};
  color: ${props => props.theme.colors.text.header};
  text-align: center;

  ${DefaultFontSize}
`;

export const Description = styled.div`
  color: ${props => props.theme.colors.text.paragraph};

  ${DefaultFontSize}
`;

export const LinkStyle = css`
  color: ${props => props.theme.colors.text.anchor.link};

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.text.anchor.hover};
  }

  &:active {
    color: ${props => props.theme.colors.text.anchor.active};
  }
`;

export const StyledLink = styled(Link)`
  ${LinkStyle}
`;

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

  ${LinkStyle}
`;

export const PlaceholderBackground = css`
  transition: background-color 0.25s ease;
  background: ${({ theme }) => theme.colors.background.placeholder};

  &:hover {
    background: ${({ theme }) => {
      switch (theme.type) {
        case ThemeType.LIGHT:
          return css`
            ${darken(0.02, theme.colors.background.placeholder)}
          `;
        case ThemeType.DARK:
          return css`
            ${lighten(0.05, theme.colors.background.placeholder)}
          `;
      }
    }};
  }
`;
