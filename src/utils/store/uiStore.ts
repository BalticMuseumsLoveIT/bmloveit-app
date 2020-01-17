import { ContentState } from 'components/Content/Content';
import { action, observable } from 'mobx';

export class UiStore {
  @observable isMenuOpened: boolean;
  @observable contentState: ContentState;

  constructor() {
    this.isMenuOpened = false;
    this.contentState = ContentState.AVAILABLE;
  }

  @action
  setContentState(contentState: ContentState) {
    this.contentState = contentState;
  }

  @action
  toggleIsMenuOpened = (): void => {
    this.isMenuOpened = !this.isMenuOpened;
  };
}

const uiStore = new UiStore();

export default uiStore;
