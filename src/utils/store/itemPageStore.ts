import {
  ItemInterface,
  ResourceDataInterface,
  ResourceTypeName,
} from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { action, autorun, computed, observable, when } from 'mobx';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class ItemPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable itemData: Array<ItemInterface> = [];
  @observable tReady?: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case PageState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case PageState.NOT_LOADED:
      case PageState.LOADED:
      case PageState.ERROR:
      default:
        uiStore.setContentState(ContentState.AVAILABLE);
    }
  };

  constructor(manageContentState = false) {
    this._manageContentState = manageContentState;

    if (manageContentState) {
      autorun(this._handleContentState);
    }
  }

  @action loadData = async (itemId: number) => {
    try {
      this.setState(PageState.LOADING);

      const [itemData] = await Promise.all([
        Api.getItem(itemId),
        when(() => this.tReady === true),
      ]);

      this.setItemData(itemData);
      this.setState(PageState.LOADED);
    } catch (e) {
      this.setState(PageState.ERROR);
    }
  };

  @computed get itemFullName(): string {
    return this.itemData.length ? this.itemData[0].name_full : '';
  }

  @computed get itemDescription(): string {
    return this.itemData.length ? this.itemData[0].description : '';
  }

  @computed get itemImage(): ResourceDataInterface | null {
    return this._getResource(ResourceTypeName.Image);
  }

  @computed get itemAudio(): ResourceDataInterface | null {
    return this._getResource(ResourceTypeName.Audio);
  }

  @computed get itemVideo(): ResourceDataInterface | null {
    return this._getResource(ResourceTypeName.Video);
  }

  private _getResource(type: ResourceTypeName): ResourceDataInterface | null {
    if (!this.itemData.length || !this.itemData[0].resources_data.length)
      return null;

    const resource = this.itemData[0].resources_data.find(
      resource => resource.type_name === type,
    );

    return resource ? resource : null;
  }

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady = (tReady?: boolean) => {
    this.tReady = tReady;
  };

  @action setItemData = (itemData: Array<ItemInterface>) => {
    this.itemData = itemData;
  };

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
