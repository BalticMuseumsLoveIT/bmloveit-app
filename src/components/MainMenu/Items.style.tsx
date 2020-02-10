import styled, { css } from 'styled-components';

interface ListProps {
  isSubmenu: boolean;
}

export const List = styled.ul<ListProps>`
  box-sizing: border-box;
  font-size: 1em;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  width: 100%;

  ${props =>
    props.isSubmenu
      ? css`
          margin-bottom: 2.5em;
        `
      : css`
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: 11.5em;
          grid-gap: 1em;
        `}
`;

interface ListItemProps {
  isSubmenu: boolean;
}

export const ListItem = styled.li<ListItemProps>`
  box-sizing: border-box;
  background: ${props => props.theme.colors.background.default};

  ${props =>
    props.isSubmenu
      ? css`
          position: relative;
          border: 1px solid ${props => props.theme.colors.background.app};

          &:first-child {
            background: ${props => props.theme.colors.background.app};
            border-top-left-radius: 0.5em;
            border-top-right-radius: 0.5em;
          }

          &:last-child {
            border-bottom-left-radius: 0.5em;
            border-bottom-right-radius: 0.5em;
          }

          &:not(:first-child):after {
            position: absolute;
            right: 1em;
            top: 50%;
            content: url('/images/chevron_right-24px.svg');
            transform: translateY(-50%);
            display: block;
            width: 1.5em;
            height: 1.5em;
          }

          &:first-child:before {
            position: absolute;
            left: 1em;
            top: 50%;
            content: url('/images/chevron_right-24px.svg');
            transform: translateY(-50%) rotate(180deg);
            display: block;
            width: 1.5em;
            height: 1.5em;
          }
        `
      : css`
          text-align: center;
          border-radius: 0.5em;
          box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
        `}

  a,
  button {
    box-sizing: border-box;
    border: none;
    font-size: 1em;
    font-family: ${props => props.theme.fonts.subheader.fontFamily};
    font-weight: ${props => props.theme.fonts.subheader.fontWeight};
    color: ${props => props.theme.colors.text.header};

    background: none;
    cursor: pointer;
    outline: none;
    text-decoration: none;

    ${props =>
      props.isSubmenu
        ? css`
            padding: 1.5em 3.5em;
            display: block;
            width: 100%;
            text-align: left;
          `
        : css`
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
