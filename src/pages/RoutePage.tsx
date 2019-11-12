import Api from 'utils/api';
import Content from 'components/Content/Content';
import React from 'react';
import Helmet from 'react-helmet';

interface Props {
  match: Record<string, any>;
}

interface State {
  route: {
    id: number;
    name: string;
    name_full: string;
    description: string;
    type: number;
    active: boolean;
    areas: Array<number>;
    locations: Array<number>;
    name_translation: Array<string>;
    name_full_translation: Array<string>;
    description_translation: Array<string>;
  } | null;
  message: string;
}

class RoutePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      route: null,
      message: 'RoutePage Spinner',
    };
  }

  render(): React.ReactNode {
    const { route } = this.state;

    return (
      <>
        <Helmet>
          <title>{route ? route.name_full : 'Route'}</title>
        </Helmet>
        <Content>
          {route ? route.name_full : <div>{this.state.message}</div>}
        </Content>
      </>
    );
  }

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    try {
      const route = await Api.getAvailableRoute(id);

      this.setState({ route });
    } catch (error) {
      this.setState({ message: 'error' });
    }
  }
}

export default RoutePage;
