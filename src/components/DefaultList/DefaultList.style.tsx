import {
  defaultBoxShadow,
  DefaultFontSize,
  ParagraphFontStyle,
  SubtitleFontStyle,
} from 'components/Page/Page.style';
import SVG from 'react-inlinesvg';
import styled, { css } from 'styled-components';
import { em } from 'polished';

export interface DefaultListItemWrapperProps {
  isHeader?: boolean;
  isMenuOpened?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  imageUrl?: string;
  hasIcon?: boolean;
  hasThumbnail?: boolean;
}

export const DefaultList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1em auto;
  width: 100%;
  box-shadow: ${defaultBoxShadow};
  border-radius: 0.5em;
  overflow: hidden;
`;

export const DefaultListItemWrapper = styled.li<DefaultListItemWrapperProps>`
  width: 100%;

  ${DefaultFontSize};

  position: relative;
  box-sizing: border-box;

  display: ${({ isMenuOpened, isHeader }) =>
    isMenuOpened !== false || isHeader ? 'grid' : 'none'};

  grid-template-columns: auto 1fr auto;
  align-items: center;

  list-style: none;

  &:not(:last-child) {
    border-bottom: ${({ theme, isMenuOpened }) =>
      (typeof isMenuOpened === 'undefined' || isMenuOpened) &&
      `1px solid ${theme.colors.background.app}`};
  }

  border-radius: ${({ isMenuOpened, isHeader }) =>
    !isMenuOpened && isHeader && '0.5em'};

  background-color: ${({ theme, isHeader }) =>
    isHeader
      ? theme.colors.list.header.default.background
      : theme.colors.list.item.default.background};

  color: ${({ theme, isHeader }) =>
    isHeader
      ? theme.colors.list.header.default.text
      : theme.colors.list.item.default.text};

  cursor: ${({ isDisabled }) => (isDisabled === true ? 'default' : 'pointer')};

  &:hover {
    background-color: ${({ theme, isHeader }) =>
      isHeader
        ? theme.colors.list.header.hover.background
        : theme.colors.list.item.hover.background};
    color: ${({ theme, isHeader }) =>
      isHeader
        ? theme.colors.list.header.hover.text
        : theme.colors.list.item.hover.text};
  }

  & > span {
    grid-column: 2 / span 1;
    display: block;
    padding: 1em;

    font-size: 1em;
    line-height: 1.5;

    ${SubtitleFontStyle};
  }

  & > a {
    grid-column: 2 / span 1;
    box-sizing: border-box;
    padding: 1em;
    min-width: 100%;
    z-index: 1;

    font-size: 1em;
    line-height: 1.5;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    text-decoration: none;
    ${SubtitleFontStyle};
    color: ${({ theme, isHeader }) =>
      isHeader
        ? theme.colors.list.header.default.text
        : theme.colors.list.item.default.text};

    ${({ hasIcon }) =>
      hasIcon &&
      css`
        margin-right: -${em(48)};
        padding-right: ${em(64)};
      `}

    ${({ hasThumbnail }) =>
      hasThumbnail &&
      css`
        margin-left: -${em(80)};
        padding-left: ${em(96)};
      `}
    
    &:hover,
    &:focus,
    &:visited {
      color: inherit;
    }
  }
`;

export const ActionIcon = styled(SVG)`
  display: block;
  grid-column: 3 / span 1;

  font-size: 1em;

  width: ${em(32)};
  height: ${em(32)};
  padding: 1em 1em 1em 0;

  fill: ${({ theme }) => theme.colors.icon.normal};

  ${DefaultListItemWrapper}:hover & {
    fill: ${({ theme }) => theme.colors.icon.hover};
  }
`;

const ThumbnailStyle = css`
  display: block;
  grid-column: 1 / span 1;

  font-size: 1em;

  width: ${em(64)};
  height: ${em(64)};
  margin: 1em 0 1em 1em;
`;

export const Thumbnail = styled.img`
  ${ThumbnailStyle}
`;

export const ThumbnailPlaceholder = styled(SVG)`
  ${ThumbnailStyle};
  box-sizing: border-box;
  padding: 1em;
  border-radius: 0.25em;
  background-color: ${({ theme }) => theme.colors.background.placeholder};
  fill: ${({ theme }) => theme.colors.list.item.default.text};
`;

export const DefaultListItemInfo = styled.span`
  font-size: 0.875em;
  color: ${({ theme }) => theme.colors.list.info};
  ${ParagraphFontStyle}
`;
