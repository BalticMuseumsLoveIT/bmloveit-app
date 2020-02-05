import Content from 'components/Content/Content';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import AboutPageStore from 'utils/store/aboutPageStore';
import { SiteStore } from 'utils/store/siteStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface AboutPageProps extends WithTranslation {
  siteStore: SiteStore;
}

@inject('siteStore')
@observer
class HomePage extends React.Component<AboutPageProps> {
  aboutPageStore = new AboutPageStore(true);
  siteStore = this.props.siteStore;

  async componentDidMount(): Promise<void> {
    this.aboutPageStore.setTReady(this.props.tReady);

    await this.aboutPageStore.loadData();
  }

  componentDidUpdate(prevProps: AboutPageProps) {
    if (prevProps.tReady !== this.props.tReady) {
      this.aboutPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.aboutPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'About')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'About')}</h1>
          <ItemHtmlParser html={this.siteStore.about} />
        </Content>
      </>
    );
  }
}

export default withTranslation('about-page')(HomePage);
