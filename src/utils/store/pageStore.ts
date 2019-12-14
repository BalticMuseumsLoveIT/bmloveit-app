import { ContentState } from 'components/Content/Content';
import { action, observable } from 'mobx';

export class PageStore {
  @observable contentState: ContentState = ContentState.PROCESSING;

  @action setContentState(contentState: ContentState) {
    this.contentState = contentState;
  }
}

const pageStore = new PageStore();

export default pageStore;
