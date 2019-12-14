import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import React from 'react';
import StyledWrapper from './Content.style';

export enum ContentState {
  PROCESSING,
  AVAILABLE,
}

interface Props {
  children: React.ReactNode;
  state?: ContentState;
}

class Content extends React.Component<Props> {
  node: React.ReactNode = null;

  render() {
    switch (this.props.state) {
      case ContentState.PROCESSING:
        this.node = <h1>Processing</h1>;
        break;
      case ContentState.AVAILABLE:
      default:
        this.node = this.props.children;
        break;
    }

    return (
      <ErrorBoundary>
        <StyledWrapper>{this.node}</StyledWrapper>
      </ErrorBoundary>
    );
  }
}

export default Content;
