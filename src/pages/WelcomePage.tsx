import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import WelcomePageStore from 'utils/store/welcomePageStore';
import Footer from 'components/Footer/Footer';
import { FooterButton } from 'components/Footer/Footer.style';
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
class WelcomePage extends React.Component<Props> {
  welcomePageStore = new WelcomePageStore(true);

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
            <p>Site Image: {this.welcomePageStore.siteImage}</p>
            <p>Site Logo: {this.welcomePageStore.siteLogo}</p>
          </div>
          <h1>{this.welcomePageStore.siteTitle}</h1>
          <div>{this.welcomePageStore.siteDescription}</div>
          <Footer>
            <FooterButton as={Link} to="/area">
              {this.props.t('buttonStart.label', 'Start sightseeing')}
            </FooterButton>
          </Footer>
        </Content>
      </>
    );
  }
}

export default withTranslation('welcome-page')(WelcomePage);
