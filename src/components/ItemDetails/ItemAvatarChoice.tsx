import ItemPageStore, { PageState } from 'utils/store/itemPageStore';
import Footer from 'components/Footer/Footer';
import { FooterLink } from 'components/Footer/Footer.style';
import {
  AvatarButton,
  AvatarList,
} from 'components/ItemDetails/ItemAvatarChoice.style';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useObserver } from 'mobx-react';

interface ItemAvatarChoiceProps {
  itemPageStore: ItemPageStore;
}

export const ItemAvatarChoice = ({ itemPageStore }: ItemAvatarChoiceProps) => {
  const { t, ready } = useTranslation('item-page');

  return useObserver(() => {
    if (!ready) return null;

    return (
      <>
        <h1>{itemPageStore.itemFullName}</h1>
        <div>{itemPageStore.itemDescription}</div>
        <AvatarList>
          {itemPageStore.itemAvatars.length ? (
            <>
              {itemPageStore.itemAvatars.map(avatar => (
                <AvatarButton
                  key={avatar.id}
                  isSelected={itemPageStore.isAvatarSelected(avatar.id)}
                  onClick={() => itemPageStore.setAvatar(avatar)}
                >
                  {avatar.name_full}
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
          <FooterLink
            to={`/item/${itemPageStore.selectedAvatarNextItemId}`}
            isDisabled={
              itemPageStore.state === PageState.SUBMITTING ||
              itemPageStore.avatarData === null
            }
            onClick={itemPageStore.handleAvatarChoice}
          >
            {t('button.next.label', 'Next')}
          </FooterLink>
        </Footer>
      </>
    );
  });
};
