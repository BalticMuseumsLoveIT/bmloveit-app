import { getPrivateMediaURL } from 'utils/helpers';
import Footer from 'components/Footer/Footer';
import ItemPageStore from 'utils/store/itemPageStore';
import { FooterLink } from 'components/Footer/Footer.style';
import React from 'react';
import ReactHtmlParser, { processNodes } from 'react-html-parser';
import { DomElement } from 'htmlparser2';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ItemDefaultProps {
  itemPageStore: ItemPageStore;
}

export const ItemDefault = ({ itemPageStore }: ItemDefaultProps) => {
  const { t, ready } = useTranslation('item-page');

  if (!ready) return null;

  const transform = (node: DomElement) => {
    if (node.type === 'tag' && node.name === 'a') {
      return (
        <Link to={(node.attribs && node.attribs.href) || ''}>
          {processNodes(node.children || [], transform)}
        </Link>
      );
    }
  };

  return (
    <>
      <h1>{itemPageStore.itemFullName}</h1>
      <div>
        {itemPageStore.itemImage && (
          <div>
            <p>Private Image: {itemPageStore.itemImage.file_url}</p>
            {itemPageStore.itemImage.file_url ? (
              <img
                src={getPrivateMediaURL(itemPageStore.itemImage.file_url)}
                alt=""
              />
            ) : null}
          </div>
        )}
        {itemPageStore.itemAudio && (
          <div>
            <p>Private Audio: {itemPageStore.itemAudio.file_url}</p>
            <audio controls id="audio_player">
              <source
                src={getPrivateMediaURL(itemPageStore.itemAudio.file_url)}
                type="audio/mpeg"
              />
            </audio>
          </div>
        )}
        {itemPageStore.itemVideo && (
          <div>
            <p>Private video: {itemPageStore.itemVideo.file_url}</p>
            <video
              controls
              id="video_player"
              src={getPrivateMediaURL(itemPageStore.itemVideo.file_url)}
            />
          </div>
        )}
      </div>
      <div>
        {ReactHtmlParser(itemPageStore.itemDescription, {
          transform: transform,
        })}
      </div>
      <Footer>
        <FooterLink as={Link} to={`/item/${itemPageStore.nextItemId}`}>
          {t('button.next.label', 'Next')}
        </FooterLink>
      </Footer>
    </>
  );
};
