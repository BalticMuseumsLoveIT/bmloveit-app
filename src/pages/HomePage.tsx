import Content from 'components/Content/Content';
import { UiStore } from 'utils/store/uiStore';
import HomePageStore from 'utils/store/homePageStore';
import Footer from 'components/Footer/Footer';
import { FooterLink } from 'components/Footer/Footer.style';
import Api from 'utils/api';
import React, { ReactNode } from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import { action, observable } from 'mobx';

interface Props extends WithTranslation, RouteComponentProps {
  uiStore: UiStore;
}

@inject('uiStore')
@observer
class HomePage extends React.Component<Props> {
  homePageStore = new HomePageStore(true);

  @observable isModalOpen = false;
  @observable modalContent: ReactNode = null;

  @action openModal = () => (this.isModalOpen = true);

  @action closeModal = () => (this.isModalOpen = false);

  @action setModalContent = (content: ReactNode) =>
    (this.modalContent = content);

  loadModalContent = async (itemId: number | null, open = false) => {
    if (open) this.openModal();
    if (itemId === null) return this.setModalContent(null);

    try {
      this.setModalContent(<p>Loading data</p>);

      const item = await Api.getItem(itemId);
      this.setModalContent(item && <p>{item[0].name_full}</p>);
    } catch (e) {
      this.setModalContent(<p>Content could not be loaded</p>);
    }
  };

  async componentDidMount(): Promise<void> {
    this.homePageStore.setTReady(this.props.tReady);

    await this.homePageStore.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.homePageStore.setTReady(this.props.tReady);
    }
  }

  componentWillUnmount(): void {
    this.homePageStore.unmount();
  }

  render() {
    if (!this.props.tReady) return null;

    return (
      <>
        <Helmet>
          <title>{this.props.t('page.title', 'Homepage')}</title>
        </Helmet>
        <Content>
          <div>
            <p>Site Image: {this.homePageStore.siteImage}</p>
            <p>Site Logo: {this.homePageStore.siteLogo}</p>
          </div>
          <h1>{this.homePageStore.siteTitle}</h1>
          <div>{this.homePageStore.siteDescription}</div>
          <button onClick={() => this.loadModalContent(22, true)}>
            Item Popup
          </button>
          <Footer>
            <FooterLink to="/area">
              {this.props.t('buttonStart.label', 'Start sightseeing')}
            </FooterLink>
          </Footer>
        </Content>
        <ReactModal
          isOpen={this.isModalOpen}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeModal}
        >
          <div>Modal content: {this.modalContent}</div>
        </ReactModal>
      </>
    );
  }
}

export default withTranslation('home-page')(HomePage);
