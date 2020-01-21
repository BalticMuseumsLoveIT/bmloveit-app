import {
  ItemType,
  ItemKind,
  ItemInterface,
  CommonApiTranslationInterface,
  ResourceDataInterface,
  ResourceTypeName,
} from 'utils/interfaces';
import Api from 'utils/api';
import { getTranslatedString } from 'utils/helpers';
import { action, computed, observable } from 'mobx';

export default class ItemStore {
  @observable itemData: ItemInterface | null = null;

  @action setItemData = (itemData: ItemInterface | null) =>
    (this.itemData = itemData);

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
      this.itemDescriptionTranslations,
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
}
