import React from 'react';
import StyledWrapper from './Content.style';

interface Props {
  children: React.ReactNode;
}

class Content extends React.Component<Props> {
  public render(): React.ReactNode {
    return <StyledWrapper>{this.props.children}</StyledWrapper>;
  }
}

export default Content;
