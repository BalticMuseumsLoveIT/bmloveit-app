import Content from 'components/Content/Content';
import { TranslationStore } from 'utils/store/translationStore';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';

interface Props {
  history: any;
  location: any;
  translationStore: TranslationStore;
}

@inject('translationStore')
@observer
class HomePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Content>{this.props.translationStore.getProperText('hello')}</Content>
        <Content>
          HomePage
          <button
            onClick={(): void => this.props.translationStore.setLang('pl')}
          >
            PL
          </button>
          <button
            onClick={(): void => this.props.translationStore.setLang('en')}
          >
            EN
          </button>
        </Content>
      </>
    );
  }
}

export default HomePage;
