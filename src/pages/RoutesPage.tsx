import Api from 'utils/api';
import RouteTile from 'components/RouteTile/RouteTile';
import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';

interface Props {}

interface State {
  routes: Array<any>;
}

class RoutesPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      routes: [],
    };
  }

  render(): React.ReactNode {
    let routeTiles;
    if (this.state.routes.length > 0) {
      routeTiles = this.state.routes.map(item => {
        return <RouteTile key={item.id} route={item} />;
      });
    }

    return (
      <>
        <Helmet>
          <title>Available Routes</title>
        </Helmet>
        <Content>
          {routeTiles ? routeTiles : <div>RoutesPage Spinner</div>}
        </Content>
      </>
    );
  }

  async componentDidMount(): Promise<void> {
    try {
      const routes = await Api.getRoutes();
      this.setState({ routes });
    } catch (error) {}
  }
}

export default RoutesPage;
