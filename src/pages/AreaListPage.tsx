import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import AreaPageStore from 'utils/store/areaListPageStore';
import { getTranslatedString } from 'utils/helpers';
import {
  DefaultList,
  DefaultListItemInfo,
} from 'components/DefaultList/DefaultList.style';
import Steps from 'components/Steps/Steps';
import { DefaultListItem } from 'components/DefaultList/DefaultListItem';
import { Title, Subtitle } from 'components/Page/Page.style';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps, Redirect } from 'react-router-dom';
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
      this.areaListPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.areaListPageStore.unmount();
  }

  render() {
    if (
      this.areaListPageStore.skipAreaList &&
      !Number.isNaN(this.areaListPageStore.firstAreaId)
    ) {
      return (
        <Redirect to={`/area/${this.areaListPageStore.firstAreaId}/routes`} />
      );
    }

    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Area')}</title>
        </Helmet>
        <Content>
          <Title>{this.props.t('content.title', 'Area list')}</Title>
          <Subtitle>
            <ItemHtmlParser
              html={this.props.t(
                'content.description',
                'Short information about what we choose and why. Info about places',
              )}
            />
          </Subtitle>
          <Steps currentStepNumber={0} />
          <DefaultList>
            {this.areaListPageStore.areaData.map(area => (
              <DefaultListItem key={area.id}>
                <Link to={`/area/${area.id}/routes`}>
                  {getTranslatedString(
                    area.name_full,
                    area.name_full_translation,
                  )}
                  <DefaultListItemInfo>
                    {this.props.t('counter.routes', 'Routes: {{routes}}', {
                      routes: this.areaListPageStore.routesAmount(area.id),
                    })}
                  </DefaultListItemInfo>
                </Link>
              </DefaultListItem>
            ))}
          </DefaultList>
        </Content>
      </>
    );
  }
}

export default withTranslation('area-list-page')(AreaListPage);
