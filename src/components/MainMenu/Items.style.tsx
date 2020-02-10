import styled, { css } from 'styled-components';

interface ListProps {
  isSubmenu: boolean;
}

export const List = styled.ul<ListProps>`
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
          grid-auto-rows: 9.5em;
          grid-gap: 1em;
        `}
`;

interface ListItemProps {
  isSubmenu: boolean;
}

export const ListItem = styled.li<ListItemProps>`
  background: ${props => props.theme.colors.background.default};

  ${props =>
    props.isSubmenu
      ? css`
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
        `
      : css`
          text-align: center;
          border-radius: 0.25em;
          box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
        `}

  a,
  button {
    border: none;
    font-size: 1em;
    font-family: ${props => props.theme.fonts.subheader.fontFamily};
    font-weight: ${props => props.theme.fonts.subheader.fontWeight};
    color: ${props => props.theme.colors.text.header};

    background: none;
    cursor: pointer;
    text-decoration: none;

    ${props =>
      props.isSubmenu
        ? css`
            padding: 1.5em;
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
