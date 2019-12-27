import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import AreaPageStore from 'utils/store/areaListPageStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class AreaListPage extends React.Component<Props> {
  areaListPageStore = new AreaPageStore(true);

  async componentDidMount(): Promise<void> {
    this.areaListPageStore.setTReady(this.props.tReady);

    await this.areaListPageStore.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      // Inform state about translation status
      this.areaListPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    // Reset `<Content />` state
    this.areaListPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Area')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'Area list')}</h1>
          {this.areaListPageStore.areaData.map(area => {
            return (
              <p key={area.id}>
                <Link to={`/area/${area.id}`}>{area.name_full}</Link>
                <br />
                Routes: {this.areaListPageStore.routesAmount(area.id)}
                <br />
                Languages: {this.areaListPageStore.languagesAmount(area.id)}
              </p>
            );
          })}
        </Content>
      </>
    );
  }
}

export default withTranslation('area-list-page')(AreaListPage);
