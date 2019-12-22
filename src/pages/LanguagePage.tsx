import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import { LanguageSwitch } from 'components/LanguageSwitch/LanguageSwitch';
import LanguageListStore from 'utils/store/languageListStore';
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
  languageListStore = new LanguageListStore(this.props.i18n, true);

  async componentDidMount(): Promise<void> {
    await this.languageListStore.loadLanguageList();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      // Inform state about translation status
      this.languageListStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    // Reset `<Content />` state
    this.languageListStore.unmount();
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
            list={this.languageListStore.languageList}
            userLocale={toISO6391(this.props.i18n.language)}
            onSubmit={this.languageListStore.handleSubmit}
          />
        </Content>
      </>
    );
  }
}

export default withTranslation('language-page')(LanguagePage);
