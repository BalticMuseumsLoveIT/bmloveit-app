import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import RouteLocationsListPageStore from 'utils/store/routeLocationsListPageStore';
import Footer from 'components/Footer/Footer';
import { FooterLink } from 'components/Footer/Footer.style';
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
class RouteLocationsListPage extends React.Component<Props> {
  routeLocationsListPageStore = new RouteLocationsListPageStore(true);

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.routeLocationsListPageStore.setTReady(this.props.tReady);

    await this.routeLocationsListPageStore.loadData(Number.parseInt(id));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.routeLocationsListPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.routeLocationsListPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Route locations')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'Locations list')}</h1>
          {this.routeLocationsListPageStore.locationsData.map(location => {
            const attractions = this.routeLocationsListPageStore.screensAmount(
              location.id,
            );

            const firstScreenId = this.routeLocationsListPageStore.firstScreenId(
              location.id,
            );

            return (
              <p key={location.id}>
                {isNaN(firstScreenId) ? (
                  <span>{location.name_full}</span>
                ) : (
                  <Link to={`/item/${firstScreenId}`}>
                    {location.name_full}
                  </Link>
                )}
                <br />
                Attractions: {attractions}
              </p>
            );
          })}
          <Footer>
            <FooterLink
              as={Link}
              to={`/area/${this.routeLocationsListPageStore.areaId}/routes`}
            >
              {this.props.t('button.changeRoute.label', 'Change route')}
            </FooterLink>
            <FooterLink
              as={Link}
              to={`/route/${this.routeLocationsListPageStore.routeId}/map`}
            >
              {this.props.t('button.viewMap.label', 'View map')}
            </FooterLink>
            <FooterLink as={Link} to={`/qrcode`}>
              {this.props.t('button.scanQR.label', 'Scan QR')}
            </FooterLink>
          </Footer>
        </Content>
      </>
    );
  }
}

export default withTranslation('route-locations-list-page')(
  RouteLocationsListPage,
);
