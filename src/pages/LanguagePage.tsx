import { UiStore } from 'utils/store/uiStore';
import { SiteStore } from 'utils/store/siteStore';
import LanguagePageStore from 'utils/store/languagePageStore';
import Content from 'components/Content/Content';
import { LanguageSwitch } from 'components/LanguageSwitch/LanguageSwitch';
import Footer from 'components/Footer/Footer';
import { FooterButton } from 'components/Footer/Footer.style';
import MuseumLogo from 'components/MuseumLogo/MuseumLogo';
import { MuseumLogoImageType } from 'components/MuseumLogo/MuseumLogo.style';
import { SponsorLogotype } from 'components/SponsorLogotype/SponsorLogotype';
import { LayoutGridFooter } from 'components/Layout/Layout.style';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Link, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Helmet from 'react-helmet';
import React from 'react';

export interface Props extends WithTranslation, RouteComponentProps {
  uiStore: UiStore;
  siteStore: SiteStore;
}

@inject('uiStore', 'siteStore')
@observer
class LanguagePage extends React.Component<Props> {
  uiStore = this.props.uiStore;
  siteStore = this.props.siteStore;
  languagePageStore = new LanguagePageStore(true);

  async componentDidMount(): Promise<void> {
    this.languagePageStore.setTReady(this.props.tReady);

    await this.languagePageStore.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.languagePageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.languagePageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    if (
      this.uiStore.languages.length > 0 &&
      this.uiStore.isUserLocaleMatch === false
    ) {
      this.uiStore.setLanguage(this.uiStore.languages[0].key);
    }

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Language')}</title>
        </Helmet>
        <Content>
          <MuseumLogo type={MuseumLogoImageType.WELCOME} />
          <LanguageSwitch
            uiLanguages={this.uiStore.languages}
            userLanguage={this.uiStore.language}
          />
          <Footer>
            <FooterButton as={Link} to="/login">
              {this.props.t('form.button.submit.label', 'Next')}
            </FooterButton>
          </Footer>
        </Content>
        <LayoutGridFooter>
          <SponsorLogotype />
        </LayoutGridFooter>
      </>
    );
  }
}

export default withTranslation('language-page')(LanguagePage);
