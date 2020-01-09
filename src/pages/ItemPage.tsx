import Content from 'components/Content/Content';
import ItemPageStore from 'utils/store/itemPageStore';
import { ItemDetails } from 'components/ItemDetails/ItemDetails';
import ReactModalStore from 'utils/store/reactModalStore';
import ItemPopupStore from 'utils/store/itemPopupStore';
import React from 'react';
import Helmet from 'react-helmet';
import { observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import ReactModal from 'react-modal';

export interface Props
  extends WithTranslation,
    RouteComponentProps<{ id: string }> {}

@observer
class ItemPage extends React.Component<Props> {
  itemPageStore = new ItemPageStore(true);

  itemPopupStore = new ItemPopupStore();
  reactModalStore = new ReactModalStore(undefined, this
    .props as RouteComponentProps);

  private _openPopup = async (popupItemId: number) => {
    this.reactModalStore.openModal();
    await this.itemPopupStore.load(popupItemId);
    this.reactModalStore.setModalContent(this.itemPopupStore.title);
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
      previousPopupItemId !== currentPopupItemId &&
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
          <Link to="?popup=22">Open popup 22</Link>
          <ItemDetails itemPageStore={this.itemPageStore} />
        </Content>
        <ReactModal {...this.reactModalStore.props}>
          {this.reactModalStore.content}
        </ReactModal>
      </>
    );
  }
}

export default withTranslation('item-page')(ItemPage);
