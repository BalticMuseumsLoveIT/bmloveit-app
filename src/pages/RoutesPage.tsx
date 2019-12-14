import Content, { ContentState } from 'components/Content/Content';
import { RoutesStore } from 'utils/store/routesStore';
import { CategorizedRoutesTilesList } from 'components/CategorizedRoutesTilesList/CategorizedRoutesTilesList';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';

interface Props {
  routesStore: RoutesStore;
}

@inject('routesStore')
@observer
class RoutesPage extends React.Component<Props> {
  routesStore = this.props.routesStore;

  @observable
  contentState = ContentState.PROCESSING;

  @action
  setContentState(contentState: ContentState) {
    this.contentState = contentState;
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Available Routes</title>
        </Helmet>
        <Content state={this.contentState}>
          <CategorizedRoutesTilesList routes={this.routesStore.routes} />
        </Content>
      </>
    );
  }

  componentDidMount = async () => {
    try {
      await this.routesStore.loadRoutes();
    } catch (e) {
    } finally {
      this.setContentState(ContentState.AVAILABLE);
    }
  };
}

export default RoutesPage;
