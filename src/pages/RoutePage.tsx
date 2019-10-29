import React from 'react';

interface Props {
  match: Record<string, any>;
}

class RoutePage extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      params: { id },
    } = this.props.match;

    return <div>{`Route: ${id}`}</div>;
  }
}

export default RoutePage;
