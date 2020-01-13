import Content from 'components/Content/Content';
import ItemPageStore from 'utils/store/itemPageStore';
import { ItemDetails } from 'components/ItemDetails/ItemDetails';
import ReactModalStore from 'utils/store/reactModalStore';
import ItemPopupStore from 'utils/store/itemPopupStore';
import { ItemModal } from 'components/ItemModal/ItemModal';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

export interface Props
  extends WithTranslation,
    RouteComponentProps<{ id: string }> {}

@observer
class ItemPage extends React.Component<Props> {
  itemPageStore = new ItemPageStore(true);

  itemPopupStore = new ItemPopupStore();

  reactModalStore = new ReactModalStore({
    isOpen: false,
    onRequestClose: () => this._closePopup(),
  });

  private _openPopup = async (popupItemId: number) => {
    this.reactModalStore.openModal();
    await this.itemPopupStore.load(popupItemId);
    this.reactModalStore.setModalContent(this.itemPopupStore.title);
  };

  private _closePopup = () => {
    this.reactModalStore.closeModal();
    this.props.history.push(this.props.location.pathname);
  };

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.itemPageStore.setTReady(this.props.tReady);

    await this.itemPageStore.loadData(Number.parseInt(id));

    const popupItemId = this.itemPopupStore.getIdFromQS(
      this.props.location.search,
    );

    if (!isNaN(popupItemId)) this._openPopup(popupItemId);
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.itemPageStore.setTReady(this.props.tReady);
    }

    const previousPopupItemId = this.itemPopupStore.getIdFromQS(
      prevProps.location.search,
    );

    const currentPopupItemId = this.itemPopupStore.getIdFromQS(
      this.props.location.search,
    );

    if (
      currentPopupItemId !== previousPopupItemId &&
      !isNaN(currentPopupItemId)
    ) {
      this._openPopup(currentPopupItemId);
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
          <ItemDetails itemPageStore={this.itemPageStore} />
        </Content>
        <ItemModal props={this.reactModalStore.props}>
          {this.reactModalStore.content}
        </ItemModal>
      </>
    );
  }
}

export default withTranslation('item-page')(ItemPage);
