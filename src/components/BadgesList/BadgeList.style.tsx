import styled from 'styled-components';

export const BadgeList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

export const BadgeListItem = styled.li`
  width: 4em;
  height: 4em;
  margin-right: 0.25em;
`;

export const Badge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: cornsilk;
  border-radius: 50%;
`;

export const BadgeIcon = styled.img`
  max-width: 80%;
  max-height: 80%;
`;
