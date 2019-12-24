import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import HomePageStore from 'utils/store/homePageStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class HomePage extends React.Component<Props> {
  homePageStore = new HomePageStore(true);

  async componentDidMount(): Promise<void> {
    await this.homePageStore.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      // Inform state about translation status
      this.homePageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    // Reset `<Content />` state
    this.homePageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Homepage')}</title>
        </Helmet>
        <Content>
          <h1>{this.homePageStore.siteTitle}</h1>
          <div>{this.homePageStore.siteDescription}</div>
        </Content>
      </>
    );
  }
}

export default withTranslation('home-page')(HomePage);
