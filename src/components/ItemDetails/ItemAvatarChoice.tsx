import ItemStore from 'utils/store/itemStore';
import { AppButton } from 'components/Buttons/AppButton.style';
import {
  AvatarButton,
  AvatarButtonImage,
  AvatarButtonPlaceholderImage,
  AvatarButtonLabel,
  AvatarList,
  AvatarButtonPlaceholder,
} from 'components/ItemDetails/ItemAvatarChoice.style';
import {
  getPrivateMediaURL,
  getResource,
  getTranslatedString,
} from 'utils/helpers';
import { UserProfileStore } from 'utils/store/userProfileStore';
import { ItemInterface, ResourceTypeName } from 'utils/interfaces';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { AvatarChoiceDescription } from 'pages/ItemPage.style';
import { Title } from 'components/Page/Page.style';
import { EventStore } from 'utils/store/eventStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { inject, useLocalStore, useObserver } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { action } from 'mobx';

interface ItemAvatarChoiceProps {
  itemStore: ItemStore;
  userProfileStore?: UserProfileStore;
  eventStore?: EventStore;
}

export const ItemAvatarChoice = inject(
  'userProfileStore',
  'eventStore',
)(({ itemStore, userProfileStore, eventStore }: ItemAvatarChoiceProps) => {
  const { t, ready } = useTranslation('item-page');

  const history = useHistory();

  const localStore = useLocalStore(() => ({
    isSubmitting: false,

    selectedAvatarId: NaN,

    get isAvatarSelected() {
      return !Number.isNaN(localStore.selectedAvatarId);
    },

    setAvatar: action((avatar: ItemInterface | null) => {
      localStore.selectedAvatarId = avatar ? avatar.id : NaN;
    }),

    setSubmitting: action((isSubmitting: boolean) => {
      localStore.isSubmitting = isSubmitting;
    }),
  }));

  const handleFormSubmit = async () => {
    if (!localStore.isAvatarSelected) return;

    // Lock submit button
    localStore.setSubmitting(true);

    // Call createEvent on avatar actions
    const avatar = new ItemStore();
    await avatar.loadItemData(localStore.selectedAvatarId);
    eventStore && (await eventStore.dispatchAvatarChoiceEvent(avatar.itemId));

    // Reload global user profile
    userProfileStore && (await userProfileStore.loadUserProfile());

    // Redirect to next item
    history.push(`/item/${avatar.nextItemId}`);

    // Unlock submit button
    localStore.setSubmitting(false);
  };

  return useObserver(() => {
    if (!ready) return null;

    return (
      <>
        {itemStore.itemNameFull && <Title>{itemStore.itemNameFull}</Title>}

        {itemStore.itemDescription && (
          <AvatarChoiceDescription>
            <ItemHtmlParser html={itemStore.itemDescription} />
          </AvatarChoiceDescription>
        )}

        <AvatarList>
          {itemStore.itemAvatars.length ? (
            <>
              {itemStore.itemAvatars.map(avatar => {
                const imageResource = getResource(
                  avatar,
                  ResourceTypeName.Image,
                );

                const image =
                  imageResource && imageResource.file_url
                    ? getPrivateMediaURL(imageResource.file_url)
                    : undefined;

                const isSelected = localStore.selectedAvatarId === avatar.id;

                const name = getTranslatedString(
                  avatar.name_full,
                  avatar.name_full_translation,
                );

                return (
                  <AvatarButton
                    key={avatar.id}
                    isSelected={isSelected}
                    onClick={() => localStore.setAvatar(avatar)}
                  >
                    {image ? (
                      <AvatarButtonImage src={image} alt={name} />
                    ) : (
                      <AvatarButtonPlaceholder>
                        <AvatarButtonPlaceholderImage src="/images/avatar-image-placeholder.svg" />
                      </AvatarButtonPlaceholder>
                    )}
                    <AvatarButtonLabel>{name}</AvatarButtonLabel>
                  </AvatarButton>
                );
              })}
            </>
          ) : (
            <AvatarChoiceDescription>
              <p>
                {t(
                  'error.noAvatarsFound',
                  'No avatars was found for an item with a given ID',
                )}
              </p>
            </AvatarChoiceDescription>
          )}
        </AvatarList>
        <AppButton
          disabled={
            localStore.isSubmitting || Number.isNaN(localStore.selectedAvatarId)
          }
          isDisabled={
            localStore.isSubmitting || Number.isNaN(localStore.selectedAvatarId)
          }
          onClick={handleFormSubmit}
        >
          {t('button.next.label', 'Next')}
        </AppButton>
      </>
    );
  });
});
