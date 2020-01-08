import Content from 'components/Content/Content';
import AboutPageStore from 'utils/store/aboutPageStore';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface AboutPageProps extends WithTranslation {}

@observer
class HomePage extends React.Component<AboutPageProps> {
  aboutPageStore = new AboutPageStore(true);

  async componentDidMount(): Promise<void> {
    this.aboutPageStore.setTReady(this.props.tReady);

    await this.aboutPageStore.loadData();
  }

  componentDidUpdate(prevProps: AboutPageProps) {
    if (prevProps.tReady !== this.props.tReady) {
      this.aboutPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.aboutPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'About')}</title>
        </Helmet>
        <Content>
          <h1>{this.props.t('content.title', 'About')}</h1>
          <div>{this.aboutPageStore.aboutContent}</div>
        </Content>
      </>
    );
  }
}

export default withTranslation('about-page')(HomePage);
