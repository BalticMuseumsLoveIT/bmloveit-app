import { action, observable } from 'mobx';
import { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Props as ReactModalProps } from 'react-modal';

export default class ReactModalStore {
  @observable private readonly _router: RouteComponentProps | undefined;

  @observable props: ReactModalProps;

  @observable content: ReactNode = null;

  @action openModal = () => (this.props.isOpen = true);

  @action closeModal = () => {
    this.props.isOpen = false;
    if (this._router) this._router.history.push(this._router.location.pathname);
  };

  @action setModalContent = (content: ReactNode) => (this.content = content);

  private _defaultProps: ReactModalProps = {
    isOpen: false,
    onRequestClose: this.closeModal,
  };

  constructor(
    props: ReactModalProps | undefined = undefined,
    router: RouteComponentProps | undefined = undefined,
  ) {
    this.props = { ...this._defaultProps, ...(props || {}) };
    this._router = router;
  }
}
