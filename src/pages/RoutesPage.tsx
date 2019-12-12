import RouteTile from 'components/RouteTile/RouteTile';
import Content, { ContentState } from 'components/Content/Content';
import { RoutesStore } from 'utils/store/routesStore';
import { groupObjectsByKey } from 'utils/helpers';
import { RouteInterface } from 'utils/interfaces';
import RoutesTile from 'components/RoutesTile/RoutesTile';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

interface Props {
  routesStore: RoutesStore;
}

interface State {
  contentState: ContentState;
}

@inject('routesStore')
@observer
class RoutesPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      contentState: ContentState.LOADED,
    };
  }

  render() {
    const routes = this.props.routesStore.routes;

    let routesTiles: React.ReactNode;
    if (routes.length > 0) {
      routesTiles = this.generateCategorizedRoutesTilesList(routes);
    }

    return (
      <>
        <Helmet>
          <title>Available Routes</title>
        </Helmet>
        <Content initialState={this.state.contentState}>
          {routesTiles ? routesTiles : <div>RoutesPage Spinner</div>}
        </Content>
      </>
    );
  }

  generateCategorizedRoutesTilesList = (
    routes: Array<RouteInterface>,
  ): React.ReactNode => {
    const groupedRoutes = groupObjectsByKey(routes, 'type');

    return groupedRoutes.map(groupedRoute => {
      const [categoryName, routesArray] = groupedRoute;

      return (
        <RoutesTile key={categoryName} title={categoryName}>
          {routesArray.map((item: RouteInterface) => (
            <RouteTile key={item.id} route={item} />
          ))}
        </RoutesTile>
      );
    });
  };

  componentDidMount = async () => {
    const { routesStore } = this.props;

    if (routesStore.isRoutesEmpty === true) {
      try {
        this.setState({ contentState: ContentState.PROCESSING });
        await routesStore.loadRoutes();
        this.setState({ contentState: ContentState.LOADED });
      } catch (error) {
        this.setState({ contentState: ContentState.ERROR });
      }
    }
  };
}

export default RoutesPage;
