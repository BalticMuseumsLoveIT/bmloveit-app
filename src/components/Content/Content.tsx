import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { UiStore } from 'utils/store/uiStore';
import { LayoutGridContent } from 'components/Layout/Layout.style';
import React from 'react';
import { inject, observer } from 'mobx-react';

export enum ContentState {
  PROCESSING,
  AVAILABLE,
}

interface Props {
  children: React.ReactNode;
}

interface InjectedProps extends Props {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class Content extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps;
  }

  node: React.ReactNode = null;
  uiStore = this.injected.uiStore;

  render() {
    switch (this.uiStore.contentState) {
      case ContentState.PROCESSING:
        this.node = <h1>Processing</h1>;
        break;
      case ContentState.AVAILABLE:
      default:
        this.node = this.props.children;
        break;
    }

    return (
      <LayoutGridContent>
        <ErrorBoundary>{this.node}</ErrorBoundary>
      </LayoutGridContent>
    );
  }
}

export default Content;
