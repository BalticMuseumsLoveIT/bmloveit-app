import RouteTile from 'components/RouteTile/RouteTile';
import Content from 'components/Content/Content';
import { RoutesStore } from 'utils/store/routesStore';
import { groupObjectsByKey } from 'utils/helpers';
import { RouteInterface } from 'utils/interfaces';
import RoutesTile from 'components/RoutesTile/RoutesTile';
import { ContentState, ContentStore } from 'utils/store/contentStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

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
  contentStore: ContentStore;
}

@inject('routesStore', 'contentStore')
@observer
class RoutesPage extends React.Component<Props> {
  contentStore = this.props.contentStore;
  routesStore = this.props.routesStore;

  constructor(props: Props) {
    super(props);
    this.contentStore.setContentState(ContentState.NOT_LOADED);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Available Routes</title>
        </Helmet>
        <Content state={this.contentStore.contentState}>
          <CategorizedRoutesTilesList routes={this.routesStore.routes} />
        </Content>
      </>
    );
  }

  componentDidMount = async () => {
    try {
      this.contentStore.setContentState(ContentState.LOADING);
      await this.routesStore.loadRoutes();
      this.contentStore.setContentState(ContentState.LOADED);
    } catch (error) {
      this.contentStore.setContentState(ContentState.ERROR);
    }
  };
}

export default RoutesPage;
