import * as React from 'react';
import { Link } from 'react-router-dom';
import StyledWrapper, { StyledLink } from './RouteTile.style';

interface Props {
  route: {
    id: number;
    name_full: string;
  };
}

class RouteTile extends React.Component<Props> {
  public render(): React.ReactNode {
    const { id, name_full } = this.props.route;
    return (
      <StyledWrapper>
        <StyledLink as={Link} to={`/routes/${id}`}>
          {name_full}
        </StyledLink>
      </StyledWrapper>
    );
  }
}

export default RouteTile;
