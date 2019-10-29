import React from 'react';
import RouteTile from '../components/RouteTile/RouteTile';
import tempResponse from '../tempResponse.json';
import Content from '../components/Content/Content';

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
      <Content>
        {this.state.availableRoutes.length > 0 ? (
          availableRoutesTiles
        ) : (
          <div>AvailableRoutesPage</div>
        )}
      </Content>
    );
  }

  componentDidMount(): void {
    this.setState({
      availableRoutes: tempResponse,
    });
  }
}

export default AvailableRoutesPage;
