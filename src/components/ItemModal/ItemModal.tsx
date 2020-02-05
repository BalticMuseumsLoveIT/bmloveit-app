import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { getPrivateMediaURL } from 'utils/helpers';
import ItemModalStore, { ModalState } from 'utils/store/itemModalStore';
import ReactModal from 'react-modal';
import { withTranslation, WithTranslation } from 'react-i18next';
import 'components/ItemModal/ItemModal.css';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import React from 'react';

interface Props extends WithTranslation, RouteComponentProps {}

@observer
class ItemModal extends React.Component<Props> {
  store = new ItemModalStore({
    isOpen: false,
    onRequestClose: () => this._closePopup(),
  });

  private _openPopup = async (popupItemId: number) => {
    this.store.setModalState(ModalState.NOT_LOADED);
    this.store.openModal();

    if (
      this.store.item.itemData === null ||
      this.store.item.itemId !== popupItemId
    )
      try {
        this.store.setModalState(ModalState.LOADING);
        await this.store.item.loadItemData(popupItemId);
      } catch (e) {
        this.store.setModalState(ModalState.ERROR);
        return;
      }

    this.store.item.itemData === null
      ? this.store.setModalState(ModalState.NOT_FOUND)
      : this.store.setModalState(ModalState.LOADED);
  };

  /**
   * Close modal window and update history
   *
   * @param {boolean} shouldGoBack - Flag that determines if history should be
   *   reverted do previous state. Set to false only when modal window was
   *   closed by pressing "back button".
   */
  private _closePopup = (shouldGoBack = true) => {
    this.store.closeModal();

    shouldGoBack && this.props.history.goBack();
  };

  async componentDidMount() {
    const popupItemId = this.store.getIdFromQS(this.props.location.search);

    if (!isNaN(popupItemId)) this._openPopup(popupItemId);
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.location.search !== this.props.location.search) {
      const previousPopupItemId = this.store.getIdFromQS(
        prevProps.location.search,
      );

      const currentPopupItemId = this.store.getIdFromQS(
        this.props.location.search,
      );

      const popupIsAvailable = !Number.isNaN(currentPopupItemId);

      if (currentPopupItemId !== previousPopupItemId) {
        if (popupIsAvailable && this.store.isClosed) {
          this._openPopup(currentPopupItemId);
        } else if (!popupIsAvailable && this.store.isOpened) {
          // User pressed back button - close popup manually.
          // Prevent double history update by passing false to _closePopup
          this._closePopup(false);
        }
      }
    }
  }

  render() {
    if (!this.props.tReady) return null;
    return (
      <ReactModal {...this.store.modalProps}>
        <button onClick={this.store.modalProps.onRequestClose}>
          {this.props.t('button.modalClose.label', 'Close')}
        </button>
        {(() => {
          switch (this.store.modalState) {
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
                  {this.store.item.itemNameFull && (
                    <h1>{this.store.item.itemNameFull}</h1>
                  )}
                  {this.store.item.itemDescription && (
                    <ItemHtmlParser html={this.store.item.itemDescription} />
                  )}
                  {this.store.item.itemImage && (
                    <div>
                      <img
                        src={getPrivateMediaURL(
                          this.store.item.itemImage.file_url,
                        )}
                        alt=""
                      />
                    </div>
                  )}
                  {this.store.item.itemAudio && (
                    <div>
                      <audio controls id="audio_player">
                        <source
                          src={getPrivateMediaURL(
                            this.store.item.itemAudio.file_url,
                          )}
                          type="audio/mpeg"
                        />
                      </audio>
                    </div>
                  )}
                  {this.store.item.itemVideo && (
                    <div>
                      <video
                        controls
                        id="video_player"
                        src={getPrivateMediaURL(
                          this.store.item.itemVideo.file_url,
                        )}
                      />
                    </div>
                  )}
                </>
              );
          }
        })()}
      </ReactModal>
    );
  }
}

export default withTranslation()(withRouter(ItemModal));
