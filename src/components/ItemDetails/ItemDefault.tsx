import { getPrivateMediaURL } from 'utils/helpers';
import Footer from 'components/Footer/Footer';
import ItemPageStore from 'utils/store/itemPageStore';
import { FooterLink } from 'components/Footer/Footer.style';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ItemDefaultProps {
  itemPageStore: ItemPageStore;
}

export const ItemDefault = ({ itemPageStore }: ItemDefaultProps) => {
  const { t, ready } = useTranslation('survey-details-page');

  if (!ready) return null;

  return (
    <>
      <h1>{itemPageStore.itemFullName}</h1>
      <div>
        {itemPageStore.itemImage && (
          <div>
            <p>Image: {itemPageStore.itemImage.file_url}</p>
            {itemPageStore.itemImage.file_url ? (
              <img
                src={getPrivateMediaURL(itemPageStore.itemImage.file_url)}
                alt=""
              />
            ) : null}
          </div>
        )}
        {itemPageStore.itemAudio && (
          <p>Audio: {itemPageStore.itemAudio.file_url}</p>
        )}
        {itemPageStore.itemVideo && (
          <p>Video: {itemPageStore.itemVideo.file_url}</p>
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: itemPageStore.itemDescription }}
      />
      <Footer>
        <FooterLink to={`/item/${itemPageStore.nextItemId}`}>
          {t('button.next.label', 'Next')}
        </FooterLink>
      </Footer>
    </>
  );
};
