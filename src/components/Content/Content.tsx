import React from 'react';
import StyledWrapper from './styles';

interface Props {
  children: React.ReactNode;
}

class Content extends React.Component<Props> {
  public render(): React.ReactNode {
    return <StyledWrapper>{this.props.children}</StyledWrapper>;
  }
}

export default Content;
