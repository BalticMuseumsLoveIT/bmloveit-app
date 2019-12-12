import Content from 'components/Content/Content';
import LocationTile from 'components/LocationTile/LocationTile';
import { RoutesStore } from 'utils/store/routesStore';
import React from 'react';
import Helmet from 'react-helmet';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {
  routesStore: RoutesStore;
}

@inject('routesStore')
@observer
class RoutePage extends React.Component<Props> {
  render() {
    const id = parseInt(this.props.match.params.id);
    const route = this.props.routesStore.getRoute(id);
    const locations = route ? route.locations_data : [];

    let locationTiles: React.ReactNode;
    if (locations.length > 0) {
      locationTiles = locations.map(item => {
        return (
          <LocationTile key={item.id} location={item}>
            {item.name_full}
          </LocationTile>
        );
      });
    }

    return (
      <>
        <Helmet>
          <title>{route ? route.name_full : 'Route'}</title>
        </Helmet>
        <Content>
          {locations.length > 0 ? locationTiles : <div>Lack of locations</div>}
        </Content>
      </>
    );
  }
}

export default RoutePage;
