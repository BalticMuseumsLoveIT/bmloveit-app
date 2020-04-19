import { ItemType } from 'utils/interfaces';
import { ItemDefault } from 'components/ItemDetails/ItemDefault';
import { ItemPanorama } from 'components/ItemDetails/ItemPanorama';
import ItemStore from 'utils/store/itemStore';
import { Error404, Error404Context } from 'components/Error404/Error404';
import { ItemBranch } from 'components/ItemDetails/ItemBranch';
import React from 'react';
import { Redirect } from 'react-router-dom';

interface ItemDetailsProps {
  itemStore: ItemStore;
}

export const ItemDetails = ({ itemStore }: ItemDetailsProps) => {
  switch (itemStore.itemType) {
    case ItemType.DEFAULT:
      return <ItemDefault itemStore={itemStore} />;
    case ItemType.BRANCH:
    case ItemType.AVATAR_CHOICE:
      return <ItemBranch itemStore={itemStore} />;
    case ItemType.PANORAMA:
      return <ItemPanorama itemStore={itemStore} />;
    case ItemType.SURVEY:
      return <Redirect to={`/survey/${itemStore.surveyId}`} />;
    case ItemType.QUIZ:
      return <Redirect to={`/quiz/${itemStore.quizId}`} />;
    case ItemType.LINK:
      return <Redirect to={itemStore.itemDescription} />;
    default:
      return <Error404 context={Error404Context.ITEM} />;
  }
};
