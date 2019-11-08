import Api from 'utils/api';
import RouteTile from 'components/RouteTile/RouteTile';
import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';

interface Props {}

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
        <Helmet>
          <title>Available Routes</title>
        </Helmet>
        <Content>
          {availableRoutesTiles ? (
            availableRoutesTiles
          ) : (
            <div>AvailableRoutesPage Spinner</div>
          )}
        </Content>
      </>
    );
  }

  async componentDidMount(): Promise<void> {
    try {
      const availableRoutes = await Api.getAvailableRoutes();

      this.setState({ availableRoutes });
    } catch (error) {}
  }
}

export default AvailableRoutesPage;
