import { getPrivateMediaURL } from 'utils/helpers';
import ItemStore from 'utils/store/itemStore';
import { AppButton } from 'components/Buttons/AppButton.style';
import { AudioPlayer, ItemTitle, VideoPlayer } from 'pages/ItemPage.style';
import { Description, HeaderImage } from 'components/Page/Page.style';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { EventStore } from 'utils/store/eventStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';

interface ItemDefaultProps {
  itemStore: ItemStore;
  eventStore?: EventStore;
}

export const ItemDefault = inject('eventStore')(
  ({ itemStore, eventStore }: ItemDefaultProps) => {
    const { t, ready } = useTranslation('item-page');

    if (!ready) return null;

    return (
      <>
        {itemStore.itemImage && itemStore.itemImage.file_url && (
          <HeaderImage
            image={getPrivateMediaURL(itemStore.itemImage.file_url)}
          />
        )}

        {itemStore.itemNameFull && (
          <ItemTitle>{itemStore.itemNameFull}</ItemTitle>
        )}

        {itemStore.itemAudio && (
          <AudioPlayer
            controls
            id="audio_player"
            onEnded={async () =>
              eventStore &&
              (await eventStore.dispatchPlayAudio(
                itemStore.itemId,
                itemStore.itemAudio!.id,
              ))
            }
          >
            <source
              src={getPrivateMediaURL(itemStore.itemAudio.file_url)}
              type="audio/mpeg"
            />
          </AudioPlayer>
        )}

        {itemStore.itemVideo && (
          <VideoPlayer
            controls
            id="video_player"
            onEnded={async () =>
              eventStore &&
              (await eventStore.dispatchPlayVideo(
                itemStore.itemId,
                itemStore.itemVideo!.id,
              ))
            }
            src={getPrivateMediaURL(itemStore.itemVideo.file_url)}
          />
        )}

        {itemStore.itemDescription && (
          <Description>
            <ItemHtmlParser html={itemStore.itemDescription} />
          </Description>
        )}

        {!Number.isNaN(itemStore.nextItemId) && (
          <AppButton as={Link} to={`/item/${itemStore.nextItemId}`}>
            {t('button.next.label', 'Next')}
          </AppButton>
        )}
      </>
    );
  },
);
