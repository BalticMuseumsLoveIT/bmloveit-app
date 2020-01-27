import ItemPageStore from 'utils/store/itemPageStore';
import { ItemType } from 'utils/interfaces';
import { ItemNotFound } from 'components/ItemDetails/ItemNotFound';
import { ItemDefault } from 'components/ItemDetails/ItemDefault';
import { ItemAvatarChoice } from 'components/ItemDetails/ItemAvatarChoice';
import { ItemPanorama } from 'components/ItemDetails/ItemPanorama';
import React from 'react';
import { Redirect } from 'react-router-dom';

interface ItemDetailsProps {
  itemPageStore: ItemPageStore;
}

export const ItemDetails = ({ itemPageStore }: ItemDetailsProps) => {
  switch (itemPageStore.itemType) {
    case ItemType.DEFAULT:
      return <ItemDefault itemPageStore={itemPageStore} />;
    case ItemType.AVATAR_CHOICE:
      return <ItemAvatarChoice itemPageStore={itemPageStore} />;
    case ItemType.PANORAMA:
      return <ItemPanorama itemPageStore={itemPageStore} />;
    case ItemType.SURVEY:
      return <Redirect to={`/survey/${itemPageStore.surveyId}`} />;
    case ItemType.QUIZ:
      return <Redirect to={`/quiz/${itemPageStore.quizId}`} />;
    default:
      return <ItemNotFound />;
  }
};
