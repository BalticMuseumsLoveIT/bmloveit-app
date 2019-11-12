import React from 'react';
import { Link } from 'react-router-dom';
import StyledWrapper from './MenuItem.style';

interface Props {
  to: string;
  onClick: any;
}

class MenuItem extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <StyledWrapper as={Link} {...this.props}>
        {this.props.children}
      </StyledWrapper>
    );
  }
}

export default MenuItem;
