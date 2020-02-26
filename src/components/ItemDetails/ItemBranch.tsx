import ItemStore from 'utils/store/itemStore';
import { UserProfileStore } from 'utils/store/userProfileStore';
import { ItemInterface, ItemType, ResourceTypeName } from 'utils/interfaces';
import { Title } from 'components/Page/Page.style';
import { ItemHtmlParser } from 'components/ItemHtmlParser/ItemHtmlParser';
import { AppButton } from 'components/Buttons/AppButton.style';
import {
  BranchButton,
  BranchButtonImage,
  BranchButtonLabel,
  BranchButtonPlaceholder,
  BranchButtonPlaceholderImage,
  BranchChoiceDescription,
  BranchList,
} from 'components/ItemDetails/ItemBranch.style';
import {
  getPrivateMediaURL,
  getResource,
  getTranslatedString,
} from 'utils/helpers';
import { EventStore } from 'utils/store/eventStore';
import { inject, useLocalStore, useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { action } from 'mobx';
import React from 'react';

interface Props {
  itemStore: ItemStore;
  userProfileStore?: UserProfileStore;
  eventStore?: EventStore;
}

export const ItemBranch = inject(
  'userProfileStore',
  'eventStore',
)(({ itemStore, userProfileStore, eventStore }: Props) => {
  const { t, ready } = useTranslation('item-page');

  const history = useHistory();

  const localStore = useLocalStore(() => ({
    isSubmitting: false,

    selectedItemId: NaN,

    get isItemSelected() {
      return !Number.isNaN(localStore.selectedItemId);
    },

    setItem: action((item: ItemInterface | null) => {
      localStore.selectedItemId = item ? item.id : NaN;
    }),

    setSubmitting: action((isSubmitting: boolean) => {
      localStore.isSubmitting = isSubmitting;
    }),
  }));

  const handleFormSubmit = async () => {
    if (!localStore.isItemSelected) return;

    // Lock submit button
    localStore.setSubmitting(true);

    switch (itemStore.itemType) {
      case ItemType.AVATAR_CHOICE:
        // Call createEvent on avatar actions
        const avatar = new ItemStore();
        await avatar.loadItemData(localStore.selectedItemId);

        eventStore && (await eventStore.dispatchAvatarChoice(avatar.itemId));

        // Reload global user profile
        userProfileStore && (await userProfileStore.loadUserProfile());

        // Redirect to next item
        history.push(`/item/${avatar.nextItemId}`);
        break;
      case ItemType.BRANCH:
        history.push(`/item/${localStore.selectedItemId}`);
        break;
    }

    // Unlock submit button
    localStore.setSubmitting(false);
  };

  return useObserver(() => {
    if (!ready) return null;

    return (
      <>
        {itemStore.itemNameFull && <Title>{itemStore.itemNameFull}</Title>}

        {itemStore.itemDescription && (
          <BranchChoiceDescription>
            <ItemHtmlParser html={itemStore.itemDescription} />
          </BranchChoiceDescription>
        )}

        <BranchList>
          {itemStore.itemBranches.length ? (
            <>
              {itemStore.itemBranches.map(branch => {
                const resourceType =
                  itemStore.itemType === ItemType.AVATAR_CHOICE
                    ? ResourceTypeName.Image
                    : ResourceTypeName.Icon;

                const imageResource = getResource(branch, resourceType);

                const placeholder =
                  itemStore.itemType === ItemType.AVATAR_CHOICE
                    ? '/images/avatar-image-placeholder.svg'
                    : '/images/branch-image-placeholder.svg';

                const image =
                  imageResource && imageResource.file_url
                    ? getPrivateMediaURL(imageResource.file_url)
                    : undefined;

                const isSelected = localStore.selectedItemId === branch.id;

                const name = getTranslatedString(
                  branch.name_full,
                  branch.name_full_translation,
                );

                return (
                  <BranchButton
                    key={branch.id}
                    isSelected={isSelected}
                    onClick={() => localStore.setItem(branch)}
                  >
                    {image ? (
                      <BranchButtonImage src={image} alt={name} />
                    ) : (
                      <BranchButtonPlaceholder>
                        <BranchButtonPlaceholderImage src={placeholder} />
                      </BranchButtonPlaceholder>
                    )}
                    <BranchButtonLabel>{name}</BranchButtonLabel>
                  </BranchButton>
                );
              })}
            </>
          ) : (
            <BranchChoiceDescription>
              <p>
                {(() => {
                  switch (itemStore.itemType) {
                    case ItemType.AVATAR_CHOICE:
                      return t(
                        'error.noAvatarsFound',
                        'No avatars were found for an item with a given ID',
                      );
                    case ItemType.BRANCH:
                      return t(
                        'error.noBranchesFound',
                        'No branch items were found',
                      );
                  }
                })()}
              </p>
            </BranchChoiceDescription>
          )}
        </BranchList>

        <AppButton
          disabled={
            localStore.isSubmitting || Number.isNaN(localStore.selectedItemId)
          }
          isDisabled={
            localStore.isSubmitting || Number.isNaN(localStore.selectedItemId)
          }
          onClick={handleFormSubmit}
        >
          {t('button.next.label', 'Next')}
        </AppButton>
      </>
    );
  });
});
