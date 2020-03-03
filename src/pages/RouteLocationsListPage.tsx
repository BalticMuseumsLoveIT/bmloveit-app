import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import RouteLocationsListPageStore from 'utils/store/routeLocationsListPageStore';
import {
  getPrivateMediaURL,
  getResource,
  getTranslatedString,
} from 'utils/helpers';
import {
  FooterButton,
  FooterButtonsContainer,
} from 'components/Buttons/FooterButtons/FooterButtons.style';
import {
  DefaultList,
  DefaultListItemInfo,
  Thumbnail,
  ThumbnailPlaceholder,
} from 'components/DefaultList/DefaultList.style';
import { DefaultListItem } from 'components/DefaultList/DefaultListItem';
import { Subtitle, Title } from 'components/Page/Page.style';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { LayoutGridFooter } from 'components/Layout/Layout.style';
import { ResourceTypeName } from 'utils/interfaces';
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

    const doesAnyLocationContainImage = this.routeLocationsListPageStore
      .doesAnyLocationContainImage;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Route locations')}</title>
        </Helmet>
        <Content>
          <Title>{this.props.t('content.title', 'Locations list')}</Title>
          <Subtitle>
            <ItemHtmlParser
              html={this.props.t(
                'content.description',
                'Short information about what we choose and why. Info about locations',
              )}
            />
          </Subtitle>
          <DefaultList>
            {this.routeLocationsListPageStore.locationsData.map(location => {
              const attractions = this.routeLocationsListPageStore.screensAmount(
                location.id,
              );

              const firstScreenId = this.routeLocationsListPageStore.firstScreenId(
                location.id,
              );

              const iconResource = getResource(location, ResourceTypeName.Icon);
              const iconURL = iconResource
                ? getPrivateMediaURL(iconResource.file_url)
                : '';

              return (
                <DefaultListItem
                  key={location.id}
                  isDisabled={isNaN(firstScreenId)}
                  hasThumbnail={doesAnyLocationContainImage}
                >
                  {doesAnyLocationContainImage &&
                    (iconURL ? (
                      <Thumbnail src={iconURL} />
                    ) : (
                      <ThumbnailPlaceholder src="/images/default-list-placeholder.svg" />
                    ))}
                  <Link
                    to={isNaN(firstScreenId) ? '#' : `/item/${firstScreenId}`}
                  >
                    {getTranslatedString(
                      location.name_full,
                      location.name_full_translation,
                    )}
                    <DefaultListItemInfo>
                      {this.props.t(
                        'counter.attractions',
                        'Attractions: {{attractions}}',
                        { attractions },
                      )}
                    </DefaultListItemInfo>
                  </Link>
                </DefaultListItem>
              );
            })}
          </DefaultList>
        </Content>
        <LayoutGridFooter useDefaultPadding={true}>
          <FooterButtonsContainer>
            <FooterButton
              as={Link}
              to={`/area/${this.routeLocationsListPageStore.areaId}/routes`}
            >
              {this.props.t('button.changeRoute.label', 'Change route')}
            </FooterButton>
            <FooterButton
              as={Link}
              to={`/route/${this.routeLocationsListPageStore.routeId}/map`}
            >
              {this.props.t('button.viewMap.label', 'View map')}
            </FooterButton>
            <FooterButton as={Link} to={`/qrcode`}>
              {this.props.t('button.scanQR.label', 'Scan QR')}
            </FooterButton>
          </FooterButtonsContainer>
        </LayoutGridFooter>
      </>
    );
  }
}

export default withTranslation('route-locations-list-page')(
  RouteLocationsListPage,
);
