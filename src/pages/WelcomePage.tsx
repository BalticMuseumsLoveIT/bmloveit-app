import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import { SiteStore } from 'utils/store/siteStore';
import WelcomePageStore from 'utils/store/welcomePageStore';
import Footer from 'components/Footer/Footer';
import { AppButton } from 'components/Buttons/AppButton.style';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps {
  uiStore: UiStore;
  siteStore: SiteStore;
}

@inject('uiStore', 'siteStore')
@observer
class WelcomePage extends React.Component<Props> {
  welcomePageStore = new WelcomePageStore(true);
  siteStore = this.props.siteStore;

  async componentDidMount(): Promise<void> {
    this.welcomePageStore.setTReady(this.props.tReady);

    await this.welcomePageStore.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.welcomePageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.welcomePageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Homepage')}</title>
        </Helmet>
        <Content>
          <div>
            <p>Site Image: {this.siteStore.image}</p>
            <p>Site Logo: {this.siteStore.logo}</p>
          </div>
          <h1>{this.siteStore.title}</h1>
          <ItemHtmlParser html={this.siteStore.description} />
          <Footer>
            <AppButton as={Link} to="/area">
              {this.props.t('buttonStart.label', 'Start sightseeing')}
            </AppButton>
          </Footer>
        </Content>
      </>
    );
  }
}

export default withTranslation('welcome-page')(WelcomePage);
