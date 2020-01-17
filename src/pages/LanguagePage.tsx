import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import {
  LanguageSwitch,
  LanguageSwitchValues,
} from 'components/LanguageSwitch/LanguageSwitch';
import LanguagePageStore from 'utils/store/languagePageStore';
import Footer from 'components/Footer/Footer';
import { FooterButton } from 'components/Footer/Footer.style';
import { Link, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import React from 'react';
import Helmet from 'react-helmet';
import { WithTranslation, withTranslation } from 'react-i18next';

export interface Props extends WithTranslation, RouteComponentProps {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class LanguagePage extends React.Component<Props> {
  uiStore = this.props.uiStore;
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

  handleLanguageSwitch = async (
    values: LanguageSwitchValues,
  ): Promise<void> => {
    await this.props.i18n.changeLanguage(values.language);
  };

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Language')}</title>
        </Helmet>
        <Content>
          <img
            src={this.languagePageStore.logotypeURL}
            alt={this.props.t('logo.alt', 'Museum logotype')}
          />
          <LanguageSwitch
            list={this.languagePageStore.languageList}
            userLocale={this.props.i18n.language}
            onSubmit={this.handleLanguageSwitch}
          />
          <Footer>
            <FooterButton as={Link} to="/login">
              {this.props.t('form.button.submit.label', 'Next')}
            </FooterButton>
          </Footer>
        </Content>
      </>
    );
  }
}

export default withTranslation('language-page')(LanguagePage);
