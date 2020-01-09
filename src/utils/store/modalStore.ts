import { action, observable } from 'mobx';
import { ReactNode } from 'react';
import { Props as ReactModalProps } from 'react-modal';

export default class ModalStore {
  @observable props: ReactModalProps;

  @observable content: ReactNode = null;

  @action openModal = () => (this.props.isOpen = true);

  @action closeModal = () => (this.props.isOpen = false);

  @action setModalContent = (content: ReactNode) => (this.content = content);

  private _defaultProps: ReactModalProps = {
    isOpen: false,
    onRequestClose: this.closeModal,
  };

  constructor(props: ReactModalProps | undefined = undefined) {
    this.props = { ...this._defaultProps, ...(props || {}) };
  }
}
