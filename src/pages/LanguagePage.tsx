import Content, { ContentState } from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import Api from 'utils/api';
import {
  LanguageSwitch,
  LanguageSwitchValues,
} from 'components/LanguageSwitch/LanguageSwitch';
import { CommonLanguageInterface } from 'utils/interfaces';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import React from 'react';
import Helmet from 'react-helmet';
import { action, observable } from 'mobx';
import { FormikHelpers, FormikValues } from 'formik';
import { getUserLocale } from 'get-user-locale';
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
    const filteredLanguageList = languageList.filter(language =>
      ISO6391.validate(language.key),
    );

    if (filteredLanguageList.length === 0) {
      throw Error(this.props.t('No valid languages has been provided'));
    }

    this.languageList = filteredLanguageList;
  };

  @action setUserLocale = (userLocale: string) => {
    const userLocaleISO6391 = userLocale.slice(0, 2);
    const isLanguageCodeValid = ISO6391.validate(userLocaleISO6391);

    this.userLocale = isLanguageCodeValid ? userLocaleISO6391 : '';
  };

  @action handleSubmit = (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<LanguageSwitchValues>,
  ) => {
    this.props.i18n.changeLanguage(values.language).then(() => {
      setSubmitting(false);
    });
  };

  async componentDidMount(): Promise<void> {
    try {
      this.uiStore.setContentState(ContentState.PROCESSING);
      this.setLanguageList(await Api.getLanguageList());
      this.setUserLocale(getUserLocale());
      await this.props.i18n.changeLanguage(this.userLocale);
    } catch (e) {
    } finally {
      this.uiStore.setContentState(ContentState.AVAILABLE);
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Language</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('Select language')}</h1>
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

export default withTranslation('LanguagePage')(LanguagePage);
