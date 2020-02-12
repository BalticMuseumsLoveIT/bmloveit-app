import { ThemeType } from 'utils/interfaces';
import styled, { css } from 'styled-components';
import { darken, em, fluidRange, lighten } from 'polished';
import { Link } from 'react-router-dom';

export const fluidRangeMinMax = {
  minScreen: em(320),
  maxScreen: em(640),
};

export const DefaultFontSize = css`
  ${fluidRange(
    {
      prop: 'font-size',
      fromSize: em(12),
      toSize: em(16),
    },
    ...Object.values(fluidRangeMinMax),
  )}
`;

export const HeaderFontSize = css`
  ${fluidRange(
    {
      prop: 'font-size',
      fromSize: em(18),
      toSize: em(24),
    },
    ...Object.values(fluidRangeMinMax),
  )}
`;

export const TitleFontStyle = css`
  font-family: ${props => props.theme.fonts.header.fontFamily};
  font-weight: ${props => props.theme.fonts.header.fontWeight};
`;

export const SubtitleFontStyle = css`
  font-family: ${props => props.theme.fonts.subheader.fontFamily};
  font-weight: ${props => props.theme.fonts.subheader.fontWeight};
`;

export const AlternativeFontStyle = css`
  font-family: ${props => props.theme.fonts.alternative.fontFamily};
  font-weight: ${props => props.theme.fonts.alternative.fontWeight};
`;

export const ParagraphFontStyle = css`
  font-family: ${props => props.theme.fonts.paragraph.fontFamily};
  font-weight: ${props => props.theme.fonts.paragraph.fontWeight};
`;

export const DefaultGridPaddingRage = {
  fromSize: em(12),
  toSize: em(16),
};

export const DefaultGridPadding = css`
  ${fluidRange(
    [
      {
        prop: 'padding-left',
        ...DefaultGridPaddingRage,
      },
      {
        prop: 'padding-right',
        ...DefaultGridPaddingRage,
      },
    ],
    ...Object.values(fluidRangeMinMax),
  )}
`;

export const NegativeGridPaddingRange = {
  fromSize: `-${DefaultGridPaddingRage.fromSize}`,
  toSize: `-${DefaultGridPaddingRage.toSize}`,
};

export const NegativeGridPadding = css`
  ${fluidRange(
    [
      {
        prop: 'margin-left',
        ...NegativeGridPaddingRange,
      },
      {
        prop: 'margin-right',
        ...NegativeGridPaddingRange,
      },
    ],
    ...Object.values(fluidRangeMinMax),
  )}
`;

export const Title = styled.h1`
  ${TitleFontStyle}
  color: ${props => props.theme.colors.text.header};
  text-align: center;
  margin: 1em 0;
  ${HeaderFontSize}
`;

export const Subtitle = styled.h2`
  ${SubtitleFontStyle}
  color: ${props => props.theme.colors.text.header};
  text-align: center;
  ${DefaultFontSize}
`;

export const Emphasize = styled.div`
  ${AlternativeFontStyle}
  color: ${props => props.theme.colors.text.header};
  text-align: center;

  ${DefaultFontSize}
`;

export const Description = styled.div`
  ${ParagraphFontStyle}
  color: ${props => props.theme.colors.text.paragraph};

  line-height: 1.4;

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

export interface HeaderImageProps {
  image?: string;
}

export const HeaderImage = styled.div<HeaderImageProps>`
  ${NegativeGridPadding};

  min-height: ${em(240)};

  ${({ image, theme }) =>
    image
      ? css`
          background-image: url(${image});
          background-size: cover;
        `
      : css`
          background-color: ${theme.colors.background.placeholder};
        `}
`;
