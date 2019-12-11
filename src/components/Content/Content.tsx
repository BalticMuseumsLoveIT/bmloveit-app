import React from 'react';
import StyledWrapper from './Content.style';

interface Props {
  children: React.ReactNode;
  isProcessing?: boolean;
}

interface State {
  hasError: boolean;
}

class Content extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  render() {
    let contentToRender = this.props.children;

    if (this.state.hasError === true) {
      contentToRender = <h1>ERROR</h1>;
    } else if (this.props.isProcessing === true) {
      contentToRender = <h1>PROCESSING</h1>;
    }

    return <StyledWrapper>{contentToRender}</StyledWrapper>;
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
}

export default Content;
