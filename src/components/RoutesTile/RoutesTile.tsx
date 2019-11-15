import * as React from 'react';
import StyledWrapper from './RoutesTile.style';

interface Props {
  title: string;
}

class RoutesTile extends React.Component<Props> {
  public render() {
    return (
      <StyledWrapper>
        <p>{this.props.title}</p>
        {this.props.children}
      </StyledWrapper>
    );
  }
}

export default RoutesTile;
