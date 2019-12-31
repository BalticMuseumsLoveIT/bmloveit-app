import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import ItemPageStore from 'utils/store/itemPageStore';
import Footer from 'components/Footer/Footer';
import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation, RouteComponentProps<any> {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class ItemPage extends React.Component<Props> {
  itemPageStore = new ItemPageStore(true);

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.itemPageStore.setTReady(this.props.tReady);

    await this.itemPageStore.loadData(Number.parseInt(id));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.itemPageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.itemPageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Item')}</title>
        </Helmet>
        <Content>
          <h1>{this.itemPageStore.itemFullName}</h1>
          <div>
            {this.itemPageStore.itemImage && (
              <p>Image: {this.itemPageStore.itemImage.file_url}</p>
            )}
            {this.itemPageStore.itemAudio && (
              <p>Audio: {this.itemPageStore.itemAudio.file_url}</p>
            )}
            {this.itemPageStore.itemVideo && (
              <p>Video: {this.itemPageStore.itemVideo.file_url}</p>
            )}
          </div>
          <div>{this.itemPageStore.itemDescription}</div>
          <Footer>
            <Link to={`#`}>{this.props.t('button.next.label', 'Next')}</Link>
          </Footer>
        </Content>
      </>
    );
  }
}

export default withTranslation('item-page')(ItemPage);
