import Content from 'components/Content/Content';
import ItemPageStore from 'utils/store/itemPageStore';
import { ItemDetails } from 'components/ItemDetails/ItemDetails';
import ItemModalStore, { ModalState } from 'utils/store/itemModalStore';
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

  itemModalStore = new ItemModalStore({
    isOpen: false,
    onRequestClose: () => this._closePopup(),
  });

  private _openPopup = async (popupItemId: number) => {
    this.itemModalStore.setModalState(ModalState.NOT_LOADED);
    this.itemModalStore.openModal();

    if (
      this.itemModalStore.item.itemData === null ||
      this.itemModalStore.item.itemId !== popupItemId
    )
      try {
        this.itemModalStore.setModalState(ModalState.LOADING);
        await this.itemModalStore.item.loadItemData(popupItemId);
      } catch (e) {
        this.itemModalStore.setModalState(ModalState.ERROR);
        return;
      }

    this.itemModalStore.item.itemData === null
      ? this.itemModalStore.setModalState(ModalState.NOT_FOUND)
      : this.itemModalStore.setModalState(ModalState.LOADED);
  };

  private _closePopup = () => {
    this.itemModalStore.closeModal();

    const search = this.itemModalStore.removeIdFromQS(
      this.props.location.search,
    );

    this.props.history.push({
      pathname: this.props.location.pathname,
      search: search,
    });
  };

  async componentDidMount(): Promise<void> {
    const {
      params: { id },
    } = this.props.match;

    this.itemPageStore.setTReady(this.props.tReady);

    await this.itemPageStore.loadData(Number.parseInt(id));

    const popupItemId = this.itemModalStore.getIdFromQS(
      this.props.location.search,
    );

    if (!isNaN(popupItemId)) this._openPopup(popupItemId);
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.tReady !== this.props.tReady) {
      this.itemPageStore.setTReady(this.props.tReady);
    }

    const previousPopupItemId = this.itemModalStore.getIdFromQS(
      prevProps.location.search,
    );

    const currentPopupItemId = this.itemModalStore.getIdFromQS(
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
        <ItemModal store={this.itemModalStore} />
      </>
    );
  }
}

export default withTranslation('item-page')(ItemPage);
