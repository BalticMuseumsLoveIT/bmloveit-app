import ItemPageStore from 'utils/store/itemPageStore';
import { ImageMap } from 'components/ImageMap/ImageMap';
import { getPrivateMediaURL } from 'utils/helpers';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface ItemPanoramaProps {
  itemPageStore: ItemPageStore;
}

export const ItemPanorama = ({ itemPageStore }: ItemPanoramaProps) => {
  const { t, ready } = useTranslation('item-page');

  if (!ready) return null;

  return (
    <>
      <h1>{itemPageStore.itemFullName}</h1>
      {(itemPageStore.itemImage && (
        <TransformWrapper>
          <TransformComponent>
            <ImageMap
              src={
                itemPageStore.itemImage &&
                getPrivateMediaURL(itemPageStore.itemImage.file_url)
              }
              coordinates={itemPageStore.panoramaMapItems}
            />
          </TransformComponent>
        </TransformWrapper>
      )) ||
        t('error.noImage', 'Image not found')}
    </>
  );
};
