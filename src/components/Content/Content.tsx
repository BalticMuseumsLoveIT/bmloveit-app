import React from 'react';
import { observer } from 'mobx-react';
import StyledWrapper from './Content.style';

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
  state = { hasDescendantError: false };

  render() {
    let contentToRender: React.ReactNode;

    if (this.state.hasDescendantError) {
      contentToRender = <h1>Descendant Error</h1>;
    } else {
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
    }

    return <StyledWrapper>{contentToRender}</StyledWrapper>;
  }

  static getDerivedStateFromError = () => {
    return { hasDescendantError: true };
  };
}

export default Content;
