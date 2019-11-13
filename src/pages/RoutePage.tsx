import Api from 'utils/api';
import Content from 'components/Content/Content';
import LocationTile from 'components/LocationTile/LocationTile';
import { RoutesStore } from 'utils/store/routesStore';
import React from 'react';
import Helmet from 'react-helmet';
import { observer, inject } from 'mobx-react';

interface Props {
  routesStore: RoutesStore;
  match: Record<string, any>;
}

interface State {
  message: string;
}

@inject('routesStore')
@observer
class RoutePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      message: 'RoutePage Spinner',
    };
  }

  render() {
    const {
      params: { id },
    } = this.props.match;
    const route = this.props.routesStore.getRoute(id);
    const locations = this.props.routesStore.getLocationsForRoute(parseInt(id));

    let locationTiles: React.ReactNode;
    if (locations.length > 0) {
      locationTiles = locations.map(item => {
        return (
          <LocationTile key={item.id} location={item} routeId={id}>
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
          {locations.length > 0 ? (
            locationTiles
          ) : (
            <div>{this.state.message}</div>
          )}
        </Content>
      </>
    );
  }

  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;

    try {
      const locations = await Api.getLocationsForRoute(id);
      this.props.routesStore.setLocations(locations);
    } catch (error) {
      this.setState({ message: 'error' });
    }
  }
}

export default RoutePage;
