import Api from 'utils/api';
import RouteTile from 'components/RouteTile/RouteTile';
import Content from 'components/Content/Content';
import { RoutesStore } from 'utils/store/routesStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

interface Props {
  routesStore: RoutesStore;
}

@inject('routesStore')
@observer
class RoutesPage extends React.Component<Props> {
  render() {
    let routeTiles;
    if (this.props.routesStore.getRoutes().length > 0) {
      routeTiles = this.props.routesStore.getRoutes().map(item => {
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
    if (this.props.routesStore.getRoutes().length === 0) {
      try {
        const routes = await Api.getRoutes();
        this.props.routesStore.setRoutes(routes);
      } catch (error) {}
    }
  }
}

export default RoutesPage;
