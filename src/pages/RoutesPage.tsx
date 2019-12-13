import Content, { ContentState } from 'components/Content/Content';
import { RoutesStore } from 'utils/store/routesStore';
import { PageStore } from 'utils/store/pageStore';
import { CategorizedRoutesTilesList } from 'components/CategorizedRoutesTilesList/CategorizedRoutesTilesList';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

interface Props {
  routesStore: RoutesStore;
  pageStore: PageStore;
}

@inject('pageStore', 'routesStore')
@observer
class RoutesPage extends React.Component<Props> {
  pageStore = this.props.pageStore;
  routesStore = this.props.routesStore;

  constructor(props: Props) {
    super(props);
    this.pageStore.setContentState(ContentState.UNAVAILABLE);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Available Routes</title>
        </Helmet>
        <Content state={this.pageStore.contentState}>
          <CategorizedRoutesTilesList routes={this.routesStore.routes} />
        </Content>
      </>
    );
  }

  componentDidMount = async () => {
    try {
      this.pageStore.setContentState(ContentState.LOADING);
      await this.routesStore.loadRoutes();
      this.pageStore.setContentState(ContentState.AVAILABLE);
    } catch (error) {
      this.pageStore.setContentState(ContentState.ERROR);
    }
  };
}

export default RoutesPage;
