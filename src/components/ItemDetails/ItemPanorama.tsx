import ItemStore from 'utils/store/itemStore';
import { ImageMap } from 'components/ImageMap/ImageMap';
import { getPrivateMediaURL } from 'utils/helpers';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { Description } from 'components/Page/Page.style';
import {
  ItemTitle,
  ZoomGrid,
  ZoomGridHeader,
  ZoomGridMap,
} from 'pages/ItemPage.style';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
// eslint-disable-next-line import/no-unresolved
import { StateProvider } from 'react-zoom-pan-pinch/dist/store/StateContext';

interface ItemPanoramaProps {
  itemStore: ItemStore;
}

export const ItemPanorama = ({ itemStore }: ItemPanoramaProps) => {
  const { t, ready } = useTranslation('item-page');
  const gridMapRef = React.useRef<HTMLDivElement>(null);

  if (!ready) return null;

  return (
    <ZoomGrid>
      <ZoomGridHeader>
        {itemStore.itemNameFull && (
          <ItemTitle>{itemStore.itemNameFull}</ItemTitle>
        )}

        {itemStore.itemDescription && (
          <Description>
            <ItemHtmlParser html={itemStore.itemDescription} />
          </Description>
        )}
      </ZoomGridHeader>

      <ZoomGridMap ref={gridMapRef}>
        {itemStore.itemImage ? (
          <TransformWrapper>
            {({ setScale }: StateProvider) => (
              <TransformComponent>
                <ImageMap
                  setScale={setScale}
                  gridMapRef={gridMapRef}
                  src={
                    (itemStore.itemImage &&
                      getPrivateMediaURL(itemStore.itemImage.file_url)) ||
                    ''
                  }
                  coordinates={itemStore.panoramaMapItems}
                />
              </TransformComponent>
            )}
          </TransformWrapper>
        ) : (
          <p>{t('error.noImage', 'Image not found')}</p>
        )}
      </ZoomGridMap>
    </ZoomGrid>
  );
};
