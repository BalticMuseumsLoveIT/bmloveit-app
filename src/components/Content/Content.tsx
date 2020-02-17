import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { UiStore } from 'utils/store/uiStore';
import {
  LayoutGridContent,
  LayoutGridContentProps,
} from 'components/Layout/Layout.style';
import { LinearIndicator } from 'components/LinearIndicator/LinearIndicator';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { DefaultTheme, ThemeProps, withTheme } from 'styled-components';

export enum ContentState {
  PROCESSING,
  AVAILABLE,
}

interface Props extends LayoutGridContentProps, ThemeProps<DefaultTheme> {
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
    const { backgroundImage, backgroundColor } = this.props;

    switch (this.uiStore.contentState) {
      case ContentState.PROCESSING:
        this.node = <LinearIndicator />;
        break;
      case ContentState.AVAILABLE:
      default:
        this.node = this.props.children;
        break;
    }

    return (
      <LayoutGridContent
        backgroundImage={backgroundImage}
        backgroundColor={backgroundColor}
      >
        <ErrorBoundary>{this.node}</ErrorBoundary>
      </LayoutGridContent>
    );
  }
}

export default withTheme(Content);
