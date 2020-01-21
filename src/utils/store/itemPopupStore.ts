import { ItemInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { action, computed, observable } from 'mobx';
import queryString from 'query-string';

export default class ItemPopupStore {
  @observable item: ItemInterface | null = null;

  @computed get title(): string {
    return this.item ? this.item.name_full : '';
  }

  @action setItem = (item: Array<ItemInterface>) =>
    (this.item = item && item.length ? item[0] : null);

  @action load = async (id: number) => {
    try {
      const item = await Api.getItem(id);
      this.setItem(item);
    } catch (e) {}
  };

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
}
