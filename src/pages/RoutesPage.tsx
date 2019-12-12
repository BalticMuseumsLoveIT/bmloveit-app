import RouteTile from 'components/RouteTile/RouteTile';
import Content, { ContentState } from 'components/Content/Content';
import { RoutesStore } from 'utils/store/routesStore';
import { groupObjectsByKey } from 'utils/helpers';
import { RouteInterface } from 'utils/interfaces';
import RoutesTile from 'components/RoutesTile/RoutesTile';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';

interface CategorizedRoutesTilesListProps {
  routes: Array<RouteInterface>;
}

const CategorizedRoutesTilesList = ({
  routes,
}: CategorizedRoutesTilesListProps) => {
  const groupedRoutes = groupObjectsByKey(routes, 'type');

  const tiles = groupedRoutes.map(groupedRoute => {
    const [categoryName, routesArray] = groupedRoute;

    return (
      <RoutesTile key={categoryName} title={categoryName}>
        {routesArray.map((item: RouteInterface) => (
          <RouteTile key={item.id} route={item} />
        ))}
      </RoutesTile>
    );
  });

  return <>{tiles}</>;
};

interface Props {
  routesStore: RoutesStore;
}

@inject('routesStore')
@observer
class RoutesPage extends React.Component<Props> {
  @observable contentState: ContentState = ContentState.NOT_LOADED;

  @action setContentState(contentState: ContentState) {
    this.contentState = contentState;
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Available Routes</title>
        </Helmet>
        <Content state={this.contentState}>
          <CategorizedRoutesTilesList routes={this.props.routesStore.routes} />
        </Content>
      </>
    );
  }

  componentDidMount = async () => {
    try {
      this.setContentState(ContentState.LOADING);
      await this.props.routesStore.loadRoutes();
      this.setContentState(ContentState.LOADED);
    } catch (error) {
      this.setContentState(ContentState.ERROR);
    }
  };
}

export default RoutesPage;
