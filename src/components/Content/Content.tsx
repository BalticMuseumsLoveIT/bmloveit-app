import React from 'react';
import { observer } from 'mobx-react';
import StyledWrapper from './Content.style';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export enum ContentState {
  UNAVAILABLE,
  LOADING,
  AVAILABLE,
  ERROR,
}

interface Props {
  children: React.ReactNode;
  state?: ContentState;
}

@observer
class Content extends React.Component<Props> {
  render() {
    let contentToRender: React.ReactNode;

    switch (this.props.state) {
      case ContentState.ERROR:
        contentToRender = <h1>Error</h1>;
        break;
      case ContentState.UNAVAILABLE:
        contentToRender = null;
        break;
      case ContentState.LOADING:
        contentToRender = <h1>LOADING</h1>;
        break;
      case ContentState.AVAILABLE:
      default:
        contentToRender = this.props.children;
        break;
    }

    return (
      <ErrorBoundary>
        <StyledWrapper>{contentToRender}</StyledWrapper>
      </ErrorBoundary>
    );
  }
}

export default Content;
