import ItemStore from 'utils/store/itemStore';
import { ImageMap } from 'components/ImageMap/ImageMap';
import { getPrivateMediaURL } from 'utils/helpers';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { Description, Emphasize } from 'components/Page/Page.style';
import {
  ItemTitle,
  ZoomGrid,
  ZoomGridFooter,
  ZoomGridHeader,
  ZoomGridMap,
} from 'pages/ItemPage.style';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
// eslint-disable-next-line import/no-unresolved
import { StateProvider } from 'react-zoom-pan-pinch/dist/store/StateContext';
import { AppButton } from 'components/Buttons/AppButton.style';
import { Link } from 'react-router-dom';

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
            {({ setTransform }: StateProvider) => (
              <TransformComponent>
                <ImageMap
                  setTransform={setTransform}
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
          <Emphasize>
            <p>{t('error.noImage', 'Image not found')}</p>
          </Emphasize>
        )}
      </ZoomGridMap>

      {!Number.isNaN(itemStore.nextItemId) && (
        <ZoomGridFooter>
          <AppButton as={Link} to={`/item/${itemStore.nextItemId}`}>
            {t('button.next.label', 'Next')}
          </AppButton>
        </ZoomGridFooter>
      )}
    </ZoomGrid>
  );
};
