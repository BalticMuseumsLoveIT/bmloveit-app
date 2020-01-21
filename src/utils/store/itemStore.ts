import {
  ItemType,
  ItemKind,
  ItemInterface,
  CommonLanguageInterface,
} from 'utils/interfaces';
import Api from 'utils/api';
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

  @computed get itemName(): string {
    return this.itemData ? this.itemData.name : '';
  }

  @computed get itemNameFull(): string {
    // TODO: Integrate translation helper
    return this.itemNameFullFallback;
  }

  @computed get itemNameFullFallback(): string {
    return this.itemData ? this.itemData.name_full : '';
  }

  @computed get itemNameFullTranslations(): Array<CommonLanguageInterface> {
    return this.itemData ? this.itemData.name_full_translation : [];
  }

  @computed get itemDescription(): string {
    // TODO: Integrate translation helper
    return this.itemDescriptionFallback;
  }

  @computed get itemDescriptionFallback(): string {
    return this.itemData ? this.itemData.description : '';
  }

  @computed get itemDescriptionTranslations(): Array<CommonLanguageInterface> {
    return this.itemData ? this.itemData.description_translation : [];
  }
}
