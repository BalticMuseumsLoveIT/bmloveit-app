import ItemPageStore, { ItemKind, ItemType } from 'utils/store/itemPageStore';
import { ItemNotFound } from 'components/ItemDetails/ItemNotFound';
import { ItemDefault } from 'components/ItemDetails/ItemDefault';
import { ItemAvatarChoice } from 'components/ItemDetails/ItemAvatarChoice';
import React from 'react';
import { Redirect } from 'react-router-dom';

interface ItemDetailsProps {
  itemPageStore: ItemPageStore;
}

export const ItemDetails = ({ itemPageStore }: ItemDetailsProps) => {
  if (itemPageStore.itemKind !== ItemKind.SCREEN) {
    return <ItemNotFound />;
  }

  switch (itemPageStore.itemType) {
    case ItemType.DEFAULT:
      return <ItemDefault itemPageStore={itemPageStore} />;
    case ItemType.AVATAR_CHOICE:
      return <ItemAvatarChoice itemPageStore={itemPageStore} />;
    case ItemType.SURVEY:
      return <Redirect to={`/survey/${itemPageStore.surveyId}`} />;
    default:
      return <ItemNotFound />;
  }
};
