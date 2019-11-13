import Api from 'utils/api';
import Content from 'components/Content/Content';
import LocationFooter from 'components/LocationFooter/LocationFooter';
import { RoutesStore } from 'utils/store/routesStore';
import { getPrevArrayElement, getNextArrayElement } from 'utils/helpers';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

interface Props {
  match: Record<string, any>;
  routesStore: RoutesStore;
}

interface State {
  message: string;
  isMounted: boolean;
}

@inject('routesStore')
@observer
class LocationPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.getPrevAndNextLocationUrl = this.getPrevAndNextLocationUrl.bind(this);

    this.state = {
      message: 'LocationPage Spinner',
      isMounted: false,
    };
  }

  render() {
    const { message, isMounted } = this.state;

    if (isMounted === false) {
      return null;
    }

    const location = this.props.routesStore.getLocation(
      parseInt(this.props.match.params.id),
    );

    return (
      <>
        <Helmet>
          <title>{location ? location.name_full : 'Location'}</title>
        </Helmet>
        <Content>{location ? location.name_full : message}</Content>
        {location && <LocationFooter {...this.getPrevAndNextLocationUrl()} />}
      </>
    );
  }

  async componentDidMount() {
    if (this.props.routesStore.getRoutes().length === 0) {
      const {
        params: { routeId },
      } = this.props.match;

      try {
        const routes = await Api.getRoutes();
        this.props.routesStore.setRoutes(routes);

        const locations = await Api.getLocationsForRoute(routeId);
        this.props.routesStore.setLocations(locations);
      } catch (error) {}
    }

    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  getPrevAndNextLocationUrl(): { [key: string]: string | undefined } {
    const {
      params: { routeId, id },
    } = this.props.match;

    const location = this.props.routesStore.getLocation(parseInt(id));
    const locations = this.props.routesStore
      .getLocationsForRoute(parseInt(routeId))
      .map(item => item.id);

    const prev = getPrevArrayElement(locations, location!.id);
    const next = getNextArrayElement(locations, location!.id);

    return {
      prev: prev && `/routes/${routeId}/locations/${prev}`,
      next: next && `/routes/${routeId}/locations/${next}`,
    };
  }
}

export default LocationPage;
