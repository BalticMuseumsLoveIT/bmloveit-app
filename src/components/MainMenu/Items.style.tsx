import {
  defaultBoxShadow,
  DefaultFontSize,
  SubtitleFontStyle,
} from 'components/Page/Page.style';
import SVG from 'react-inlinesvg';
import styled, { css } from 'styled-components';
import { em } from 'polished';

interface ListProps {
  isSubmenu: boolean;
}

export const List = styled.ul<ListProps>`
  margin: 0 auto;
  padding: 0;
  max-width: ${em(360)};

  ${props =>
    props.isSubmenu
      ? css`
          margin-bottom: 2.5em;
        `
      : css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        `}
`;

interface ListItemProps {
  isSubmenu: boolean;
}

export const ListItem = styled.li<ListItemProps>`
  box-sizing: border-box;
  background: ${props => props.theme.colors.list.item.default.background};

  &:hover {
    background: ${props => props.theme.colors.list.item.hover.background};
  }

  list-style: none;

  ${props =>
    props.isSubmenu
      ? css`
          position: relative;
          border: 1px solid ${props => props.theme.colors.list.border};

          // Chrome is not supporting button with display grid at the moment
          display: grid;
          grid-template-columns: 3.5em 1fr 3.5em;
          padding: 0;

          &:first-child {
            background: ${props =>
              props.theme.colors.list.header.default.background};

            &:hover {
              background: ${props =>
                props.theme.colors.list.item.hover.background};
            }

            border-top-left-radius: 0.5em;
            border-top-right-radius: 0.5em;
          }

          &:last-child {
            border-bottom-left-radius: 0.5em;
            border-bottom-right-radius: 0.5em;
          }

          &:not(:last-child) {
            border-bottom: none;
          }
        `
      : css`
          position: relative;
          border-radius: 0.5em;
          box-shadow: ${defaultBoxShadow};
          width: 49%;
          margin-top: 2%;

          &:nth-child(-n + 2) {
            margin-top: 0;
          }

          box-sizing: border-box;
          min-width: 3em;

          &:after {
            content: '';
            display: block;
            padding-bottom: 100%;
          }
        `};

  a,
  button {
    box-sizing: border-box;
    border: none;
    ${DefaultFontSize};
    ${SubtitleFontStyle};
    color: ${props => props.theme.colors.text.header};

    background: none;
    cursor: pointer;
    outline: none;
    text-decoration: none;

    ${props =>
      props.isSubmenu
        ? css`
            display: flex;
            align-items: center;
            grid-column: 2 / span 1;
            text-align: left;
            line-height: 1.5;
            padding: 1em 3.5em;
            margin: 0 -3.5em;
            z-index: 1;
          `
        : css`
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;

            border: 0;
            padding: 0.25em;
          `}
  }
`;

const Icon = styled(SVG)`
  display: block;
  width: 1.5em;
  height: 1.5em;
  padding: 1em;
  fill: ${({ theme }) => theme.colors.icon.normal};
`;

export const NextIcon = styled(Icon)`
  grid-column: 3 / span 1;
`;

export const BackIcon = styled(Icon)`
  transform: rotate(180deg);
  grid-column: 1 / span 1;
`;
