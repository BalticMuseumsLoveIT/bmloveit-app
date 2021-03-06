import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import { SiteStore } from 'utils/store/siteStore';
import WelcomePageStore from 'utils/store/welcomePageStore';
import { AppButton } from 'components/Buttons/AppButton.style';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { LayoutGridFooter } from 'components/Layout/Layout.style';
import { SponsorLogotype } from 'components/SponsorLogotype/SponsorLogotype';
import {
  TitleWithUnderline,
  Description,
  HeaderImg,
} from 'components/Page/Page.style';
import { WelcomeHeaderImage } from 'pages/WelcomePage.style';
import MuseumLogo from 'components/MuseumLogo/MuseumLogo';
import { LogoType } from 'components/MuseumLogo/MuseumLogo.style';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import { DefaultTheme, ThemeProps, withTheme } from 'styled-components';

interface Props
  extends WithTranslation,
    ThemeProps<DefaultTheme>,
    RouteComponentProps {
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
        <Content backgroundColor={this.props.theme.colors.background.default}>
          <WelcomeHeaderImage image={this.siteStore.header}>
            {this.siteStore.header && (
              <HeaderImg src={this.siteStore.header} alt="" />
            )}
            <MuseumLogo type={LogoType.WELCOME_HEADER} />
          </WelcomeHeaderImage>

          <TitleWithUnderline>{this.siteStore.title}</TitleWithUnderline>

          <Description>
            <ItemHtmlParser html={this.siteStore.description} />
          </Description>

          <AppButton as={Link} to="/area">
            {this.props.t('buttonStart.label', 'Start sightseeing')}
          </AppButton>
        </Content>
        <LayoutGridFooter>
          <SponsorLogotype />
        </LayoutGridFooter>
      </>
    );
  }
}

export default withTranslation('welcome-page')(withTheme(WelcomePage));
