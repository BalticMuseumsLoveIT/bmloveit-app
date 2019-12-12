import React from 'react';
import StyledWrapper from './Content.style';

export enum ContentState {
  LOADED,
  PROCESSING,
  ERROR,
}

interface Props {
  children: React.ReactNode;
  initialState?: ContentState;
}

interface State {
  state: ContentState;
}

class Content extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      state: this.props.initialState || ContentState.LOADED,
    };
  }

  render() {
    let contentToRender: React.ReactNode;

    switch (this.state.state) {
      case ContentState.LOADED:
        contentToRender = this.props.children;
        break;
      case ContentState.PROCESSING:
        contentToRender = <h1>PROCESSING</h1>;
        break;
      default:
        contentToRender = <h1>ERROR</h1>;
    }

    return <StyledWrapper>{contentToRender}</StyledWrapper>;
  }

  static getDerivedStateFromProps = (props: Props, state: State) => {
    if (
      props.initialState !== undefined &&
      state.state !== props.initialState
    ) {
      return { state: props.initialState };
    }

    return null;
  };

  static getDerivedStateFromError = () => {
    return { state: ContentState.ERROR };
  };
}

export default Content;
