import React from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import 'components/ItemModal/ItemModal.css';
import { observer } from 'mobx-react';

interface ItemModalProps {
  props: ReactModalProps;
}

export const ItemModal = observer(
  ({ children, props }: React.PropsWithChildren<ItemModalProps>) => {
    return <ReactModal {...props}>{children}</ReactModal>;
  },
);

export default ItemModal;
