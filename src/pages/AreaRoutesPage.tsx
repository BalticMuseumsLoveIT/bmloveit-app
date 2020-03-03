import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import AreaRoutesPageStore from 'utils/store/areaRoutesPageStore';
import { RoutesGroup } from 'components/RoutesGroup/RoutesGroup';
import Steps from 'components/Steps/Steps';
import { Title, Subtitle } from 'components/Page/Page.style';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps<any> {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class AreaRoutesPage extends React.Component<Props> {
  areaRoutesPageStore = new AreaRoutesPageStore(true);

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.areaRoutesPageStore.setTReady(this.props.tReady);

    await this.areaRoutesPageStore.loadData(Number.parseInt(id));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.areaRoutesPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.areaRoutesPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Routes')}</title>
        </Helmet>
        <Content>
          <Title>{this.props.t('content.title', 'Routes list')}</Title>
          <Subtitle>
            <ItemHtmlParser
              html={this.props.t(
                'content.description',
                'Short information about what we choose and why. Info about routes',
              )}
            />
          </Subtitle>
          <Steps currentStepNumber={1} />
          {this.areaRoutesPageStore.routeTypes.map(type => {
            const routes = this.areaRoutesPageStore.routesByType(type.id);

            return routes.length ? (
              <RoutesGroup
                key={type.id}
                type={type}
                routes={routes}
                attractions={this.areaRoutesPageStore.attractionsByRoute}
                doesAnyRouteContainImage={
                  this.areaRoutesPageStore.doesAnyRouteContainImage
                }
              />
            ) : null;
          })}
        </Content>
      </>
    );
  }
}

export default withTranslation('area-routes-page')(AreaRoutesPage);
