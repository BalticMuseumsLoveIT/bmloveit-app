import React from 'react';
import RouteTile from '../components/RouteTile';
import tempResponse from '../tempResponse.json';

interface State {
  availableRoutes: Array<any>;
}

class AvailableRoutesPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      availableRoutes: [],
    };
  }

  render(): React.ReactNode {
    let availableRoutesTiles;
    if (this.state.availableRoutes.length > 0) {
      availableRoutesTiles = this.state.availableRoutes.map(item => {
        return <RouteTile key={item.id} route={item} />;
      });
    }

    return (
      <>
        {this.state.availableRoutes.length > 0 ? (
          availableRoutesTiles
        ) : (
          <div>AvailableRoutesPage</div>
        )}
      </>
    );
  }

  componentDidMount(): void {
    this.setState({
      availableRoutes: tempResponse,
    });
  }
}

export default AvailableRoutesPage;
