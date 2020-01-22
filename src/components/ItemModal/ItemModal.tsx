import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { getPrivateMediaURL } from 'utils/helpers';
import ItemModalStore, { ModalState } from 'utils/store/itemModalStore';
import ReactModal from 'react-modal';
import 'components/ItemModal/ItemModal.css';
import { observer } from 'mobx-react';
import React from 'react';

interface ItemModalProps {
  store: ItemModalStore;
}

export const ItemModal = observer(({ store }: ItemModalProps) => {
  return (
    <ReactModal {...store.modalProps}>
      {(() => {
        switch (store.modalState) {
          case ModalState.NOT_LOADED:
            return null;
          case ModalState.LOADING:
            return <h1>Loading...</h1>;
          case ModalState.NOT_FOUND:
            return <h1>Not found</h1>;
          case ModalState.ERROR:
            return <h1>Error</h1>;
          case ModalState.LOADED:
          default:
            return (
              <>
                {store.item.itemNameFull && <h1>{store.item.itemNameFull}</h1>}
                {store.item.itemDescription && (
                  <ItemHtmlParser html={store.item.itemDescription} />
                )}
                {store.item.itemImage && (
                  <div>
                    <img
                      src={getPrivateMediaURL(store.item.itemImage.file_url)}
                      alt=""
                    />
                  </div>
                )}
                {store.item.itemAudio && (
                  <div>
                    <audio controls id="audio_player">
                      <source
                        src={getPrivateMediaURL(store.item.itemAudio.file_url)}
                        type="audio/mpeg"
                      />
                    </audio>
                  </div>
                )}
                {store.item.itemVideo && (
                  <div>
                    <video
                      controls
                      id="video_player"
                      src={getPrivateMediaURL(store.item.itemVideo.file_url)}
                    />
                  </div>
                )}
              </>
            );
        }
      })()}
    </ReactModal>
  );
});
