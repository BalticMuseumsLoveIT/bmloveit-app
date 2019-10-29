import * as React from 'react';
import { Link } from 'react-router-dom';
import StyledWrapper, { StyledLink } from './styles';

interface Props {
  route: {
    id: number;
    name: string;
  };
}

class RouteTile extends React.Component<Props> {
  public render(): React.ReactNode {
    const { id, name } = this.props.route;
    return (
      <StyledWrapper>
        <StyledLink as={Link} to={`/routes/${id}`}>
          {name}
        </StyledLink>
      </StyledWrapper>
    );
  }
}

export default RouteTile;
