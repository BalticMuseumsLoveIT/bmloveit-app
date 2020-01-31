import ItemStore from 'utils/store/itemStore';
import { ImageMap } from 'components/ImageMap/ImageMap';
import { getPrivateMediaURL } from 'utils/helpers';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface ItemPanoramaProps {
  itemStore: ItemStore;
}

export const ItemPanorama = ({ itemStore }: ItemPanoramaProps) => {
  const { t, ready } = useTranslation('item-page');

  if (!ready) return null;

  return (
    <>
      <h1>{itemStore.itemNameFull}</h1>
      {(itemStore.itemImage && (
        <TransformWrapper>
          <TransformComponent>
            <ImageMap
              src={
                itemStore.itemImage &&
                getPrivateMediaURL(itemStore.itemImage.file_url)
              }
              coordinates={itemStore.panoramaMapItems}
            />
          </TransformComponent>
        </TransformWrapper>
      )) ||
        t('error.noImage', 'Image not found')}
    </>
  );
};
