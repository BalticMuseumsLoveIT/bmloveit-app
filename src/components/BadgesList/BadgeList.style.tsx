import styled, { createGlobalStyle } from 'styled-components';
import { darken, desaturate, em } from 'polished';

export const TooltipStyle = createGlobalStyle`
  .badge-tooltip {
    opacity: 1 !important;
    font-size: 1em !important;
  
    .rc-tooltip-arrow {
      border-top-color: ${({ theme }) =>
        theme.colors.background.alternative} !important;
    }
    
    .rc-tooltip-inner {
      font-size: ${em(15)};
      font-family: ${props => props.theme.fonts.paragraph.fontFamily};
      font-weight: ${props => props.theme.fonts.paragraph.fontWeight};
      color: ${({ theme }) => theme.colors.text.alternative};
      background-color: ${({ theme }) => theme.colors.background.alternative};
      min-height: unset;
    }
  } 
`;

export const BadgeList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
`;

export const BadgeListItem = styled.li`
  position: relative;
  box-sizing: border-box;
  width: 10%;
  min-width: 3em;
  margin-right: 2%;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const Badge = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ theme }) => desaturate(0.1, darken(0.04, theme.colors.background.app))};
`;

export const BadgeIcon = styled.img`
  max-width: 80%;
  max-height: 80%;
  min-width: 40%;
  min-height: 40%;
`;
