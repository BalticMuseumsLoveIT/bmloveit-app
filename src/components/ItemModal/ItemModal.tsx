import ItemModalStore from 'utils/store/itemModalStore';
import ReactModal from 'react-modal';
import 'components/ItemModal/ItemModal.css';
import { observer } from 'mobx-react';
import React from 'react';

interface ItemModalProps {
  store: ItemModalStore;
}

export const ItemModal = observer(({ store }: ItemModalProps) => {
  return (
    <ReactModal {...store.modalProps}>{store.item.itemNameFull}</ReactModal>
  );
});

export default ItemModal;
