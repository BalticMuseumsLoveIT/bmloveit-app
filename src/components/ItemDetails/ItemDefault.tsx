import { getPrivateMediaURL } from 'utils/helpers';
import Footer from 'components/Footer/Footer';
import ItemStore from 'utils/store/itemStore';
import { FooterButton } from 'components/Footer/Footer.style';
import React from 'react';
import ReactHtmlParser, { processNodes } from 'react-html-parser';
import { DomElement } from 'htmlparser2';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ItemDefaultProps {
  itemStore: ItemStore;
}

export const ItemDefault = ({ itemStore }: ItemDefaultProps) => {
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
      <h1>{itemStore.itemNameFull}</h1>
      <div>
        {itemStore.itemImage && (
          <div>
            <p>Private Image: {itemStore.itemImage.file_url}</p>
            {itemStore.itemImage.file_url ? (
              <img
                src={getPrivateMediaURL(itemStore.itemImage.file_url)}
                alt=""
              />
            ) : null}
          </div>
        )}
        {itemStore.itemAudio && (
          <div>
            <p>Private Audio: {itemStore.itemAudio.file_url}</p>
            <audio controls id="audio_player">
              <source
                src={getPrivateMediaURL(itemStore.itemAudio.file_url)}
                type="audio/mpeg"
              />
            </audio>
          </div>
        )}
        {itemStore.itemVideo && (
          <div>
            <p>Private video: {itemStore.itemVideo.file_url}</p>
            <video
              controls
              id="video_player"
              src={getPrivateMediaURL(itemStore.itemVideo.file_url)}
            />
          </div>
        )}
      </div>
      <div>
        {ReactHtmlParser(itemStore.itemDescription, {
          transform: transform,
        })}
      </div>
      <Footer>
        <FooterButton as={Link} to={`/item/${itemStore.nextItemId}`}>
          {t('button.next.label', 'Next')}
        </FooterButton>
      </Footer>
    </>
  );
};
