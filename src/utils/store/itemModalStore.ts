import ItemStore from 'utils/store/itemStore';
import { action, observable } from 'mobx';
import queryString from 'query-string';
import { Props as ReactModalProps } from 'react-modal';

export enum ModalState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class ItemModalStore {
  @observable item: ItemStore = new ItemStore();
  @observable modalState: ModalState = ModalState.NOT_LOADED;
  @observable modalProps: ReactModalProps;

  @action openModal = () => (this.modalProps.isOpen = true);

  @action closeModal = () => (this.modalProps.isOpen = false);

  removeIdFromQS = (search: string): string => {
    const parsedQuery = queryString.parse(search);
    if ('popup' in parsedQuery) delete parsedQuery.popup;
    return queryString.stringify(parsedQuery);
  };

  getIdFromQS = (search: string): number => {
    const { popup } = queryString.parse(search);

    const pattern = new RegExp('^\\d+$');

    return typeof popup === 'string' && pattern.test(popup)
      ? parseInt(popup)
      : NaN;
  };

  private _defaultModalProps: ReactModalProps = {
    isOpen: false,
    onRequestClose: this.closeModal,
  };

  constructor(modalProps: ReactModalProps | undefined = undefined) {
    this.modalProps = { ...this._defaultModalProps, ...(modalProps || {}) };
  }
}
