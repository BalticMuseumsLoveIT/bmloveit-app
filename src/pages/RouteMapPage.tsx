import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import RouteMapPageStore from 'utils/store/routeMapPageStore';
import Footer from 'components/Footer/Footer';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps<any> {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class RouteMapPage extends React.Component<Props> {
  routeMapPageStore = new RouteMapPageStore(true);

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.routeMapPageStore.setTReady(this.props.tReady);

    await this.routeMapPageStore.loadData(Number.parseInt(id));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.routeMapPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.routeMapPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Route Map')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'Route map')}</h1>
          <h2>{this.routeMapPageStore.routeTitle}</h2>
          <div>Map Component</div>
          <Footer>
            <Link to={`/area/${this.routeMapPageStore.routeAreaId}/routes`}>
              {this.props.t('button.changeRoute.label', 'Change route')}
            </Link>
            <Link to={`/route/${this.routeMapPageStore.routeId}/locations`}>
              {this.props.t('button.viewList.label', 'View list')}
            </Link>
            <Link to={`/qrcode`}>
              {this.props.t('button.scanQR.label', 'Scan QR')}
            </Link>
          </Footer>
        </Content>
      </>
    );
  }
}

export default withTranslation('route-map-page')(RouteMapPage);
