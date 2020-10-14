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
import { AppButton } from 'components/Buttons/AppButton.style';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
// eslint-disable-next-line import/no-unresolved
import { StateProvider } from 'react-zoom-pan-pinch/dist/store/StateContext';
import { Link } from 'react-router-dom';
import { useLocalStore } from 'mobx-react';
import { action } from 'mobx';

interface ItemPanoramaProps {
  itemStore: ItemStore;
}

export const ItemPanorama = ({ itemStore }: ItemPanoramaProps) => {
  const { t, ready } = useTranslation('item-page');
  const gridMapRef = React.useRef<HTMLDivElement>(null);

  const transformStore = useLocalStore(() => ({
    scale: 1,
    setScale: action((scale: number) => {
      transformStore.scale = scale;
    }),
  }));

  const onZoomChange = (data: { scale: number }) => {
    transformStore.setScale(data.scale);
  };

  if (!ready) return null;

  return (
    <ZoomGrid>
      <ZoomGridHeader>
        {!itemStore.fullscreen && itemStore.itemNameFull && (
          <ItemTitle>{itemStore.itemNameFull}</ItemTitle>
        )}

        {!itemStore.fullscreen && itemStore.itemDescription && (
          <Description>
            <ItemHtmlParser html={itemStore.itemDescription} />
          </Description>
        )}
      </ZoomGridHeader>

      <ZoomGridMap ref={gridMapRef}>
        {itemStore.itemImage ? (
          <TransformWrapper onZoomChange={onZoomChange}>
            {({ setTransform }: StateProvider) => (
              <TransformComponent>
                <ImageMap
                  setTransform={setTransform}
                  gridMapRef={gridMapRef}
                  zoomout={itemStore.zoomout}
                  scale={transformStore.scale}
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
