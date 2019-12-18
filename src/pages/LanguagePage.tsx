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

interface Props extends RouteComponentProps {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class LanguagePage extends React.Component<Props> {
  uiStore = this.props.uiStore;
  @observable languageList: Array<CommonLanguageInterface> = [];

  @action setLanguageList = (languageList: Array<CommonLanguageInterface>) => {
    this.languageList = languageList;
  };

  @action handleSubmit(
    values: FormikValues,
    { setSubmitting }: FormikHelpers<LanguageSwitchValues>,
  ) {
    console.log(values);
    setSubmitting(false);
  }

  async componentDidMount(): Promise<void> {
    try {
      this.uiStore.setContentState(ContentState.PROCESSING);
      this.setLanguageList(await Api.getLanguageList());
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
          <p>Language</p>
          <LanguageSwitch
            list={this.languageList}
            onSubmit={this.handleSubmit}
          />
        </Content>
      </>
    );
  }
}

export default LanguagePage;
