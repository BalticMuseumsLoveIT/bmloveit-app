import {
  CommonActionInterface,
  CommonApiTranslationInterface,
  ItemInterface,
  ItemKind,
  ItemMapElementInterface,
  ItemType,
  ResourceDataInterface,
  ResourceTypeName,
} from 'utils/interfaces';
import Api from 'utils/api';
import {
  getPrivateMediaURL,
  getResource,
  getTranslatedString,
} from 'utils/helpers';
import { action, computed, observable } from 'mobx';

export default class ItemStore {
  @observable itemData: ItemInterface | null = null;

  constructor(itemData: ItemInterface | null = null) {
    this.setItemData(itemData);
  }

  @action setItemData = (itemData: ItemInterface | null) => {
    this.itemData = itemData;
  };

  @action loadItemData = async (itemId: number) => {
    const itemData = await Api.getItem(itemId);
    this.setItemData((itemData.length && itemData[0]) || null);
  };

  @computed get itemId(): number {
    return this.itemData ? this.itemData.id : NaN;
  }

  @computed get nextItemId(): number {
    return this.itemData && this.itemData.next_item !== null
      ? this.itemData.next_item
      : NaN;
  }

  @computed get itemType(): ItemType | null {
    return this.itemData && this.itemData.type_data !== null
      ? this.itemData.type_data.name
      : null;
  }

  @computed get itemKind(): ItemKind | null {
    return this.itemData && this.itemData.kind_data !== null
      ? this.itemData.kind_data.name
      : null;
  }

  /**
   * This is item's name used as an identifier
   * It should be composed of ([a-z0-9\-\_]+)
   */
  @computed get itemName(): string {
    return this.itemData ? this.itemData.name : '';
  }

  /**
   * Get translated name full
   */
  @computed get itemNameFull(): string {
    return getTranslatedString(
      this.itemNameFullFallback,
      this.itemNameFullTranslations,
    );
  }

  @computed get itemNameFullFallback(): string {
    return this.itemData ? this.itemData.name_full : '';
  }

  @computed get itemNameFullTranslations(): Array<
    CommonApiTranslationInterface
  > {
    return this.itemData ? this.itemData.name_full_translation : [];
  }

  /**
   * Get translated description
   * Description can contain HTML or plain text
   */
  @computed get itemDescription(): string {
    return getTranslatedString(
      this.itemDescriptionFallback,
      this.itemDescriptionTranslations,
    );
  }

  @computed get itemDescriptionFallback(): string {
    return this.itemData ? this.itemData.description : '';
  }

  @computed get itemDescriptionTranslations(): Array<
    CommonApiTranslationInterface
  > {
    return this.itemData ? this.itemData.description_translation : [];
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

  @computed get itemIcon(): ResourceDataInterface | null {
    return this._getResource(ResourceTypeName.Icon);
  }

  private _getResource(type: ResourceTypeName): ResourceDataInterface | null {
    if (!this.itemData || !this.itemData.resources_data.length) return null;

    return getResource(this.itemData, type);
  }

  @computed get surveyId(): number {
    return this.itemData && this.itemData.survey !== null
      ? this.itemData.survey
      : NaN;
  }

  @computed get quizId(): number {
    return this.itemData && this.itemData.quizz !== null
      ? this.itemData.quizz
      : NaN;
  }

  @computed get itemAvatars(): Array<ItemInterface> {
    if (!this.itemData || !this.itemData.child_items_data.length) return [];

    return this.itemData.child_items_data.filter(
      item =>
        item.type_data !== null && item.type_data.name === ItemType.AVATAR,
    );
  }

  @computed get itemBranches(): Array<ItemInterface> {
    if (
      !this.itemData ||
      !this.itemData.child_items_data.length ||
      this.itemType === null ||
      ![ItemType.AVATAR_CHOICE, ItemType.BRANCH].includes(this.itemType)
    ) {
      return [];
    }

    const childItemType =
      this.itemType === ItemType.AVATAR_CHOICE
        ? ItemType.AVATAR
        : ItemType.DEFAULT;

    return this.itemData.child_items_data.filter(
      item => item.type_data !== null && item.type_data.name === childItemType,
    );
  }

  @computed get itemActions(): Array<CommonActionInterface> {
    return this.itemData ? this.itemData.actions_list : [];
  }

  @computed get panoramaMapItems(): Array<ItemMapElementInterface> {
    return (
      (this.itemData &&
        this.itemData.child_items_data
          .filter(
            item =>
              item.kind_data &&
              item.kind_data.name === ItemKind.POPUP &&
              item.x !== null &&
              item.y !== null,
          )
          .map(item => {
            const icon = getResource(item, ResourceTypeName.Icon);

            return {
              x: item.x!,
              y: item.y!,
              link: `?popup=${item.id}`,
              icon: icon ? getPrivateMediaURL(icon.file_url) : '',
            };
          })) ||
      []
    );
  }
}
