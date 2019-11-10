import Api from 'utils/api';
import Content from 'components/Content/Content';
import LocationTile from 'components/LocationTile/LocationTile';
import { RouteInterface, LocationInterface } from 'utils/@types/interfaces';
import React from 'react';
import Helmet from 'react-helmet';

interface Props {
  match: Record<string, any>;
}

interface State {
  route: RouteInterface | null;
  locations: Array<LocationInterface>;
  message: string;
}

class RoutePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      route: null,
      locations: [],
      message: 'RoutePage Spinner',
    };
  }

  render(): React.ReactNode {
    const { route, locations } = this.state;

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
          {route && route.locations.length > 0 ? (
            locationTiles
          ) : (
            <div>{this.state.message}</div>
          )}
        </Content>
      </>
    );
  }

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    try {
      const route = await Api.getRoute(id);
      const locations = await Api.getLocationsForRoute(route.id);
      this.setState({ route, locations });
    } catch (error) {
      this.setState({ message: 'error' });
    }
  }
}

export default RoutePage;
