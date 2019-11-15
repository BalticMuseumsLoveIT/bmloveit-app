import Api from 'utils/api';
import RouteTile from 'components/RouteTile/RouteTile';
import Content from 'components/Content/Content';
import { RoutesStore } from 'utils/store/routesStore';
import { groupObjectsByKey } from 'utils/helpers';
import { RouteInterface } from 'utils/@types/interfaces';
import RoutesTile from 'components/RoutesTile/RoutesTile';
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
    const routes = this.props.routesStore.getRoutes();
    let routesTiles;
    if (routes.length > 0) {
      const groupedRoutes = groupObjectsByKey(routes, 'type');

      routesTiles = groupedRoutes.map(groupedRoute => {
        const [categoryName, routesArray] = groupedRoute;

        return (
          <RoutesTile key={categoryName} title={categoryName}>
            {routesArray.map((item: RouteInterface) => (
              <RouteTile key={item.id} route={item} />
            ))}
          </RoutesTile>
        );
      });
    }

    return (
      <>
        <Helmet>
          <title>Available Routes</title>
        </Helmet>
        <Content>
          {routesTiles ? routesTiles : <div>RoutesPage Spinner</div>}
        </Content>
      </>
    );
  }

  async componentDidMount() {
    if (this.props.routesStore.getRoutes().length === 0) {
      try {
        const routes = await Api.getRoutes();
        this.props.routesStore.setRoutes(routes);
      } catch (error) {}
    }
  }
}

export default RoutesPage;
