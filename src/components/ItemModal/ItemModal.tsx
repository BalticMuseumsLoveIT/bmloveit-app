import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { getPrivateMediaURL } from 'utils/helpers';
import ItemModalStore, { ModalState } from 'utils/store/itemModalStore';
import { CloseButtonIcon, Description } from 'components/Page/Page.style';
import { AudioPlayer, ItemTitle, VideoPlayer } from 'pages/ItemPage.style';
import {
  ModalCloseButton,
  ModalImage,
  ModalLayoutGridHeader,
} from 'components/ItemModal/ItemModal.style';
import { LayoutGrid, LayoutGridContent } from 'components/Layout/Layout.style';
import { LinearIndicator } from 'components/LinearIndicator/LinearIndicator';
import { Error404, Error404Context } from 'components/Error404/Error404';
import { Error500 } from 'components/Error500/Error500';
import ReactModal from 'react-modal';
import { withTranslation, WithTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import React from 'react';
import { DefaultTheme, ThemeProps, withTheme } from 'styled-components';
import { em } from 'polished';

interface Props
  extends WithTranslation,
    ThemeProps<DefaultTheme>,
    RouteComponentProps {}

@observer
class ItemModal extends React.Component<Props> {
  store = new ItemModalStore({
    isOpen: false,
    onRequestClose: () => this._closePopup(),
    style: {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 30,
      },
      content: {
        top: '6em',
        bottom: '1em',
        left: '1em',
        right: '1em',
        padding: '0',
        border: 'none',
        borderRadius: em(10),
        background: this.props.theme.colors.background.default,
        maxWidth: '43em',
        margin: '0 auto',
        boxSizing: 'border-box',
      },
    },
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
        <LayoutGrid>
          <ModalLayoutGridHeader>
            <ModalCloseButton onClick={this.store.modalProps.onRequestClose}>
              <CloseButtonIcon src="/images/close-24px.svg" />
            </ModalCloseButton>
          </ModalLayoutGridHeader>
          <LayoutGridContent>
            {(() => {
              switch (this.store.modalState) {
                case ModalState.NOT_LOADED:
                  return null;
                case ModalState.LOADING:
                  return <LinearIndicator />;
                case ModalState.NOT_FOUND:
                  return <Error404 context={Error404Context.MODAL} />;
                case ModalState.ERROR:
                  return <Error500 />;
                case ModalState.LOADED:
                default:
                  return (
                    <>
                      {this.store.item.itemNameFull && (
                        <ItemTitle>{this.store.item.itemNameFull}</ItemTitle>
                      )}

                      {this.store.item.itemImage &&
                        this.store.item.itemImage.file_url && (
                          <ModalImage
                            src={getPrivateMediaURL(
                              this.store.item.itemImage.file_url,
                            )}
                          />
                        )}

                      {this.store.item.itemAudio && (
                        <AudioPlayer controls id="audio_player">
                          <source
                            src={getPrivateMediaURL(
                              this.store.item.itemAudio.file_url,
                            )}
                            type="audio/mpeg"
                          />
                        </AudioPlayer>
                      )}

                      {this.store.item.itemVideo && (
                        <VideoPlayer
                          controls
                          id="video_player"
                          src={getPrivateMediaURL(
                            this.store.item.itemVideo.file_url,
                          )}
                        />
                      )}

                      {this.store.item.itemDescription && (
                        <Description>
                          <ItemHtmlParser
                            html={this.store.item.itemDescription}
                          />
                        </Description>
                      )}
                    </>
                  );
              }
            })()}
          </LayoutGridContent>
        </LayoutGrid>
      </ReactModal>
    );
  }
}

export default withTranslation()(withRouter(withTheme(ItemModal)));
