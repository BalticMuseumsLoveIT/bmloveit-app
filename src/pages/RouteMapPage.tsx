import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import RouteMapPageStore from 'utils/store/routeMapPageStore';
import { ImageMap } from 'components/ImageMap/ImageMap';
import { getPrivateMediaURL } from 'utils/helpers';
import {
  FooterButton,
  FooterButtonsContainer,
} from 'components/Buttons/FooterButtons/FooterButtons.style';
import {
  ZoomGrid,
  ZoomGridFooter,
  ZoomGridHeader,
  ZoomGridMap,
} from 'pages/ItemPage.style';
import { Emphasize, Title } from 'components/Page/Page.style';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
// eslint-disable-next-line import/no-unresolved
import { StateProvider } from 'react-zoom-pan-pinch/dist/store/StateContext';

interface Props extends WithTranslation, RouteComponentProps<any> {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class RouteMapPage extends React.Component<Props> {
  routeMapPageStore = new RouteMapPageStore(true);
  gridMapRef = React.createRef<HTMLDivElement>();

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

  onZoomChange = (data: { scale: number }) => {
    this.routeMapPageStore.setScale(data.scale);
  };

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Route Map')}</title>
        </Helmet>
        <Content>
          <ZoomGrid>
            <ZoomGridHeader>
              <Title>{this.routeMapPageStore.routeNameFull}</Title>
            </ZoomGridHeader>
            <ZoomGridMap ref={this.gridMapRef}>
              {this.routeMapPageStore.routeMapImageURL ? (
                <TransformWrapper onZoomChange={this.onZoomChange}>
                  {({ setTransform }: StateProvider) => (
                    <TransformComponent>
                      <ImageMap
                        setTransform={setTransform}
                        gridMapRef={this.gridMapRef}
                        scale={this.routeMapPageStore.scale}
                        src={getPrivateMediaURL(
                          this.routeMapPageStore.routeMapImageURL,
                        )}
                        coordinates={this.routeMapPageStore.routeMapLocations}
                      />
                    </TransformComponent>
                  )}
                </TransformWrapper>
              ) : (
                <Emphasize>
                  <p>{this.props.t('error.noMap', 'No map was found')}</p>
                </Emphasize>
              )}
            </ZoomGridMap>
            <ZoomGridFooter>
              <FooterButtonsContainer>
                <FooterButton
                  as={Link}
                  to={`/area/${this.routeMapPageStore.routeAreaId}/routes`}
                >
                  {this.props.t('button.changeRoute.label', 'Change route')}
                </FooterButton>
                <FooterButton
                  as={Link}
                  to={`/route/${this.routeMapPageStore.routeId}/locations`}
                >
                  {this.props.t('button.viewList.label', 'View list')}
                </FooterButton>
                <FooterButton as={Link} to={`/qrcode`}>
                  {this.props.t('button.scanQR.label', 'Scan QR')}
                </FooterButton>
              </FooterButtonsContainer>
            </ZoomGridFooter>
          </ZoomGrid>
        </Content>
      </>
    );
  }
}

export default withTranslation('route-map-page')(RouteMapPage);
