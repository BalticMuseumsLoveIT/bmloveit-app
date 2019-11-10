import Api from 'utils/api';
import Content from 'components/Content/Content';
import { LocationInterface } from 'utils/@types/interfaces';
import React from 'react';
import Helmet from 'react-helmet';

interface Props {
  match: Record<string, any>;
}

interface State {
  location: LocationInterface | null;
  message: string;
}

class LocationPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      location: null,
      message: 'LocationPage Spinner',
    };
  }

  render(): React.ReactNode {
    const { location, message } = this.state;

    return (
      <>
        <Helmet>
          <title>{location ? location.name_full : 'Location'}</title>
        </Helmet>
        <Content>{location ? location.name_full : message}</Content>
      </>
    );
  }

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    try {
      const location = await Api.getLocation(id);
      this.setState({ location });
    } catch (error) {
      this.setState({ message: 'error' });
    }
  }
}

export default LocationPage;
