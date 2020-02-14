import { ButtonProps, ThemeType } from 'utils/interfaces';
import styled, { css } from 'styled-components';
import { darken, em, fluidRange, lighten } from 'polished';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { Field } from 'formik';

export const fluidRangeMinMax = {
  minScreen: em(320),
  maxScreen: em(640),
};

export const defaultBoxShadow = '0 3px 6px #2a2c3e33';

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

export const SmallerFontSize = css`
  ${fluidRange(
    {
      prop: 'font-size',
      fromSize: em(10),
      toSize: em(14),
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
  color: ${props => props.theme.colors.text.header};
  text-align: center;
  margin: 1em 0;
  ${TitleFontStyle}
  ${HeaderFontSize}
`;

export const TitleWithUnderline = styled(Title)`
  text-align: left;
  padding-bottom: 1em;
  position: relative;

  &::after {
    display: block;
    content: '';
    background: ${({ theme }) => theme.colors.background.alternative};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1em;
    height: ${em(2)};
  }
`;

export const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text.header};
  text-align: center;
  ${SubtitleFontStyle}
  ${DefaultFontSize}
`;

export const Emphasize = styled.div`
  color: ${props => props.theme.colors.text.header};
  text-align: center;

  ${AlternativeFontStyle}
  ${DefaultFontSize}
`;

export const Description = styled.div`
  color: ${props => props.theme.colors.text.paragraph};

  line-height: 1.4;

  ${ParagraphFontStyle}
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
  min-height: ${em(240)};

  ${NegativeGridPadding}

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

export const CloseButton = styled.button<ButtonProps>`
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  background: transparent;
  display: block;

  font-size: 1em;
  padding: 1em;
`;

export const CloseButtonIcon = styled(SVG)`
  display: block;
  width: 1.5em;
  height: 1.5em;

  path {
    transition: fill 0.25s ease;

    fill: ${({ theme }) => theme.colors.icon.normal};

    ${CloseButton}:hover & {
      fill: ${({ theme }) => theme.colors.icon.hover};
    }
  }
`;

export const Fieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  ${SmallerFontSize}
`;

export const Legend = styled.p`
  font-size: 1em;
  margin: 1em 0;

  ${SubtitleFontStyle}
`;

export const FormImage = styled.img`
  display: block;
  width: 100%;
  margin: 1em 0;
  border-radius: ${em(10)};
`;

export const RadioInput = styled(Field)`
  display: block;
  font-size: 1em;
  margin: 1em;
`;

export const RadioLabel = styled.label`
  font-size: 1em;
  padding: 1em 1em 1em 0;
  flex-grow: 1;

  ${SubtitleFontStyle}
`;

export const FormValidation = styled.p`
  ${SubtitleFontStyle};

  text-align: center;
`;
