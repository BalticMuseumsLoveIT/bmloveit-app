import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import { LanguageSwitch } from 'components/LanguageSwitch/LanguageSwitch';
import LanguagePageStore from 'utils/store/languagePageStore';
import { toISO6391 } from 'utils/helpers';
import { RouteComponentProps } from 'react-router-dom';
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
  languagePageStore = new LanguagePageStore(this.props.i18n, true);

  async componentDidMount(): Promise<void> {
    await this.languagePageStore.loadData();
    console.log(this.languagePageStore.siteData[0].logo);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      // Inform state about translation status
      this.languagePageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    // Reset `<Content />` state
    this.languagePageStore.unmount();
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
          <img
            src={this.languagePageStore.logotypeURL}
            alt={this.props.t('logo.alt', 'Museum logotype')}
          />
          <LanguageSwitch
            list={this.languagePageStore.languageList}
            userLocale={toISO6391(this.props.i18n.language)}
            onSubmit={this.languagePageStore.handleSubmit}
          />
        </Content>
      </>
    );
  }
}

export default withTranslation('language-page')(LanguagePage);
