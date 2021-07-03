import ItemStore from 'utils/store/itemStore';
import { action, computed, observable } from 'mobx';
import queryString from 'query-string';
import { Props as ReactModalProps } from 'react-modal';
import * as H from 'history';

export enum ModalState {
  NOT_LOADED,
  LOADING,
  LOADED,
  NOT_FOUND,
  ERROR,
}

export default class ItemModalStore {
  @observable item: ItemStore = new ItemStore();
  @observable modalState: ModalState = ModalState.NOT_LOADED;
  @observable modalProps!: ReactModalProps;
  @observable timeWhenProcessingStarted = NaN;

  constructor(modalProps: ReactModalProps | undefined = undefined) {
    this.setModalProps(modalProps || {});
  }

  @computed get isOpened(): boolean {
    return this.modalProps.isOpen;
  }

  @computed get isClosed(): boolean {
    return !this.modalProps.isOpen;
  }

  @computed get shouldDisplayLoader(): boolean {
    if (isNaN(this.timeWhenProcessingStarted)) {
      return false;
    }

    const processingTimeSoFar = Date.now() - this.timeWhenProcessingStarted;

    return processingTimeSoFar > 200;
  }

  @action openModal = () => {
    this.modalProps.isOpen = true;
  };

  @action closeModal = () => {
    this.modalProps.isOpen = false;
  };

  @action setModalState = (modalState: ModalState) => {
    this.timeWhenProcessingStarted =
      modalState === ModalState.LOADING ? Date.now() : NaN;
    this.modalState = modalState;
  };

  @action setModalProps = (modalProps: ReactModalProps | {}) => {
    this.modalProps = { ...this.defaultModalProps, ...modalProps };
  };

  removeIdFromQS = (search: string): string => {
    const parsedQuery = queryString.parse(search);
    if ('popup' in parsedQuery) delete parsedQuery.popup;
    return queryString.stringify(parsedQuery);
  };

  removeIdFromLocation = (location: H.Location): H.Location => {
    const locationWithoutPopupId = Object.assign({}, location);

    locationWithoutPopupId.search = this.removeIdFromQS(
      locationWithoutPopupId.search,
    );

    return locationWithoutPopupId;
  };

  isEventStringInQS = (search: string): boolean => {
    const { popup } = queryString.parse(search);
    return popup === 'event';
  };

  getIdFromQS = (search: string): number => {
    const { popup } = queryString.parse(search);

    const pattern = new RegExp('^\\d+$');

    return typeof popup === 'string' && pattern.test(popup)
      ? parseInt(popup)
      : NaN;
  };

  readonly defaultModalProps: ReactModalProps = {
    isOpen: false,
    onRequestClose: this.closeModal,
  };
}
