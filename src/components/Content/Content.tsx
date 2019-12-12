import React from 'react';
import { observer } from 'mobx-react';
import StyledWrapper from './Content.style';

export enum ContentState {
  NOT_LOADED,
  LOADING,
  LOADED,
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
      case ContentState.NOT_LOADED:
        contentToRender = null;
        break;
      case ContentState.LOADING:
        contentToRender = <h1>LOADING</h1>;
        break;
      case ContentState.LOADED:
      default:
        // If content state is loaded or undefined
        contentToRender = this.props.children;
        break;
      case ContentState.ERROR:
        contentToRender = <h1>ERROR</h1>;
        break;
    }

    return <StyledWrapper>{contentToRender}</StyledWrapper>;
  }
}

export default Content;
