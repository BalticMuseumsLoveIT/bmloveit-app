import {
  ItemInterface,
  ResourceDataInterface,
  ResourceTypeName,
  SurveyInterface,
} from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { action, autorun, computed, observable, when } from 'mobx';
import { createTransformer } from 'mobx-utils';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
  SUBMITTING,
  SUBMITTED,
}

export enum ItemType {
  DEFAULT = 'default',
  AVATAR_CHOICE = 'avatar_choice',
  AVATAR = 'avatar',
  SURVEY = 'survey',
  QUIZ = 'quiz',
  MAP = 'map',
  PANORAMA = '360',
}

export enum ItemKind {
  SCREEN = 'screen',
  POPUP = 'popup',
  URL = 'url',
}

export default class ItemPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable itemData: Array<ItemInterface> = [];
  @observable avatarData: ItemInterface | null = null;
  @observable surveyData: SurveyInterface | null = null;
  @observable panoramaItems: Array<ItemInterface> = [];
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

      if (this.itemType === ItemType.SURVEY) {
        const surveyData = await Api.getSurveyList(undefined, this.itemId);
        this.setSurveyData(surveyData);
      }

      if (this.itemType === ItemType.PANORAMA) {
        const childItems: Array<ItemInterface> =
          (this.itemData.length &&
            this.itemData[0].child_items_data.filter(
              item => item.kind_data.name === ItemKind.POPUP,
            )) ||
          [];

        const responses = await Promise.all(
          childItems.map(item => Api.getItem(item.id)),
        );

        this.setPanoramaItems(responses.map(response => response[0]));
      }

      this.setState(PageState.LOADED);
    } catch (e) {
      this.setState(PageState.ERROR);
    }
  };

  @computed get itemId(): number {
    return this.itemData.length ? this.itemData[0].id : NaN;
  }

  @computed get itemType(): string | null {
    return this.itemData.length && null !== this.itemData[0].type
      ? this.itemData[0].type_data.name
      : null;
  }

  @computed get itemKind(): string | null {
    return this.itemData.length && null !== this.itemData[0].kind
      ? this.itemData[0].kind_data.name
      : null;
  }

  @computed get itemAvatars(): Array<ItemInterface> {
    if (!this.itemData.length || !this.itemData[0].child_items_data.length)
      return [];

    return this.itemData[0].child_items_data.filter(
      item => item.type !== null && item.type_data.name === ItemType.AVATAR,
    );
  }

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

  @computed get panoramaMapItems(): Array<{
    x: number;
    y: number;
    link: string;
  }> {
    return (
      (this.panoramaItems.length &&
        this.panoramaItems
          .filter(item => item.x !== null && item.y !== null)
          .map(item => ({
            x: item.x!,
            y: item.y!,
            link: `?popup=${item.id}`,
          }))) ||
      []
    );
  }

  @computed get nextItemId(): string {
    return this.itemData.length && this.itemData[0].next_item !== null
      ? this.itemData[0].next_item.toString()
      : '';
  }

  @computed get selectedAvatarNextItemId(): string {
    return this.avatarData !== null && this.avatarData.next_item !== null
      ? this.avatarData.next_item.toString()
      : '';
  }

  @computed get surveyId(): number {
    return this.surveyData !== null ? this.surveyData.id : NaN;
  }

  @computed get quizId(): number {
    return this.itemData.length && this.itemData[0].quizzes_data.length
      ? this.itemData[0].quizzes_data[0].id
      : NaN;
  }

  isAvatarSelected = createTransformer((id: number): boolean => {
    return this.avatarData !== null && this.avatarData.id === id;
  });

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady = (tReady?: boolean) => {
    this.tReady = tReady;
  };

  @action setItemData = (itemData: Array<ItemInterface>) => {
    this.itemData = itemData;
  };

  @action setSurveyData = (surveyData: Array<SurveyInterface>) => {
    this.surveyData = surveyData.length ? surveyData[0] : null;
  };

  @action setAvatar = (avatar: ItemInterface) => {
    if (avatar.type === null || avatar.type_data.name !== ItemType.AVATAR)
      throw Error('Provided item type is not allowed');

    this.avatarData = avatar;
  };

  @action setPanoramaItems = (panoramaItems: Array<ItemInterface>) => {
    this.panoramaItems = panoramaItems;
  };

  @action handleAvatarChoice = async () => {
    if (this.state === PageState.SUBMITTED) return true;

    if (
      this.avatarData !== null &&
      this.state !== PageState.SUBMITTING &&
      this.state !== PageState.ERROR
    ) {
      try {
        this.setState(PageState.SUBMITTING);
        const avatar = await Api.getItem(this.avatarData.id);
        await Api.createEvent(avatar[0].actions_list[0].id);
        this.setState(PageState.SUBMITTED);
      } catch (e) {
        this.setState(PageState.ERROR);
      }
    }
  };

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
