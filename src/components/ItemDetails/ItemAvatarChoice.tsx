import ItemStore from 'utils/store/itemStore';
import Footer from 'components/Footer/Footer';
import { AppButton } from 'components/Buttons/AppButton.style';
import {
  AvatarButton,
  AvatarList,
} from 'components/ItemDetails/ItemAvatarChoice.style';
import { getTranslatedString } from 'utils/helpers';
import { UserProfileStore } from 'utils/store/userProfileStore';
import { ItemInterface } from 'utils/interfaces';
import Api from 'utils/api';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { inject, useObserver, useLocalStore } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { action } from 'mobx';

interface ItemAvatarChoiceProps {
  itemStore: ItemStore;
  userProfileStore?: UserProfileStore;
}

export const ItemAvatarChoice = inject('userProfileStore')(
  ({ itemStore, userProfileStore }: ItemAvatarChoiceProps) => {
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
      await Promise.all(
        avatar.itemActions.map(action => Api.createEvent(action.id)),
      );

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
          <h1>{itemStore.itemNameFull}</h1>
          <div>{itemStore.itemDescription}</div>
          <AvatarList>
            {itemStore.itemAvatars.length ? (
              <>
                {itemStore.itemAvatars.map(avatar => (
                  <AvatarButton
                    key={avatar.id}
                    isSelected={localStore.selectedAvatarId === avatar.id}
                    onClick={() => localStore.setAvatar(avatar)}
                  >
                    {getTranslatedString(
                      avatar.name_full,
                      avatar.name_full_translation,
                    )}
                  </AvatarButton>
                ))}
              </>
            ) : (
              <p>
                {t(
                  'error.noAvatarsFound',
                  'No avatars was found for an item with a given ID',
                )}
              </p>
            )}
          </AvatarList>
          <Footer>
            <AppButton
              disabled={
                localStore.isSubmitting ||
                Number.isNaN(localStore.selectedAvatarId)
              }
              onClick={handleFormSubmit}
            >
              {t('button.next.label', 'Next')}
            </AppButton>
          </Footer>
        </>
      );
    });
  },
);
