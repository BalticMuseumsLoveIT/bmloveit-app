import Content, { ContentState } from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import Api from 'utils/api';
import { LanguageSwitch } from 'components/LanguageSwitch/LanguageSwitch';
import { CommonLanguageInterface } from 'utils/interfaces';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import React from 'react';
import Helmet from 'react-helmet';
import { action, observable, when } from 'mobx';
import { FormikValues } from 'formik';
import ISO6391 from 'iso-639-1';
import { WithTranslation, withTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class LanguagePage extends React.Component<Props> {
  uiStore = this.props.uiStore;

  @observable languageList: Array<CommonLanguageInterface> = [];
  @observable userLocale = '';

  @action setLanguageList = (languageList: Array<CommonLanguageInterface>) => {
    this.languageList = languageList.filter(language =>
      ISO6391.validate(language.key),
    );
  };

  @action setUserLocale = (userLocale: string) => {
    const userLocaleISO6391 = userLocale.slice(0, 2);
    const isLanguageCodeValid = ISO6391.validate(userLocaleISO6391);

    this.userLocale = isLanguageCodeValid ? userLocaleISO6391 : '';
  };

  @action handleSubmit = async (values: FormikValues): Promise<void> => {
    await this.props.i18n.changeLanguage(values.language);
  };

  async componentDidMount(): Promise<void> {
    try {
      this.uiStore.setContentState(ContentState.PROCESSING);

      const [languageList] = await Promise.all([
        Api.getLanguageList(),
        // Keep `PROCESSING` state till translations are fetched
        when(() => this.props.tReady),
      ]);

      this.setLanguageList(languageList);
      this.setUserLocale(this.props.i18n.language);
    } catch (e) {
    } finally {
      this.uiStore.setContentState(ContentState.AVAILABLE);
    }
  }

  render() {
    // Render only when locales are available
    // This prevents `i18next::translator: missingKey` invocation
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Language')}</title>
        </Helmet>
        <Content>
          <LanguageSwitch
            list={this.languageList}
            userLocale={this.userLocale}
            onSubmit={this.handleSubmit}
          />
        </Content>
      </>
    );
  }
}

export default withTranslation('language-page')(LanguagePage);
