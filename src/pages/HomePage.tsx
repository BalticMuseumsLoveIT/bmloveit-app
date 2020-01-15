import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import HomePageStore from 'utils/store/homePageStore';
import Footer from 'components/Footer/Footer';
import { FooterLink } from 'components/Footer/Footer.style';
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
class HomePage extends React.Component<Props> {
  homePageStore = new HomePageStore(true);

  async componentDidMount(): Promise<void> {
    this.homePageStore.setTReady(this.props.tReady);

    await this.homePageStore.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.homePageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
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
          <div>
            <p>Site Image: {this.homePageStore.siteImage}</p>
            <p>Site Logo: {this.homePageStore.siteLogo}</p>
          </div>
          <h1>{this.homePageStore.siteTitle}</h1>
          <div>{this.homePageStore.siteDescription}</div>
          <Footer>
            <FooterLink as={Link} to="/area">
              {this.props.t('buttonStart.label', 'Start sightseeing')}
            </FooterLink>
          </Footer>
        </Content>
      </>
    );
  }
}

export default withTranslation('home-page')(HomePage);
