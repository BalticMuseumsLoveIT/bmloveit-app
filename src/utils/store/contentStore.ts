import { action, observable } from 'mobx';

export enum ContentState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export class ContentStore {
  @observable contentState: ContentState = ContentState.NOT_LOADED;

  @action setContentState(contentState: ContentState) {
    this.contentState = contentState;
  }
}

const contentStore = new ContentStore();

export default contentStore;
