import Content, { ContentState } from 'components/Content/Content';
import { RoutesStore } from 'utils/store/routesStore';
import { CategorizedRoutesTilesList } from 'components/CategorizedRoutesTilesList/CategorizedRoutesTilesList';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { UiStore } from '../utils/store/uiStore';

interface Props {
  routesStore: RoutesStore;
  uiStore: UiStore;
}

@inject('routesStore', 'uiStore')
@observer
class RoutesPage extends React.Component<Props> {
  routesStore = this.props.routesStore;
  uiStore = this.props.uiStore;

  render() {
    return (
      <>
        <Helmet>
          <title>Available Routes</title>
        </Helmet>
        <Content>
          <CategorizedRoutesTilesList routes={this.routesStore.routes} />
        </Content>
      </>
    );
  }

  componentDidMount = async () => {
    try {
      this.uiStore.setContentState(ContentState.PROCESSING);
      await this.routesStore.loadRoutes();
    } catch (e) {
    } finally {
      this.uiStore.setContentState(ContentState.AVAILABLE);
    }
  };
}

export default RoutesPage;
