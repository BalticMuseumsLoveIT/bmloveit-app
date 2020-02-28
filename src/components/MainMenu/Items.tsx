import { ItemInterface } from 'utils/interfaces';
import {
  BackIcon,
  List,
  ListItem,
  NextIcon,
} from 'components/MainMenu/Items.style';
import { Item } from 'components/MainMenu/Item';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  items: Array<ItemInterface>;
  ancestors: Array<number>;
  closeMenu: () => void;
  openParentMenu: () => void;
  openSubMenu: (e: React.SyntheticEvent, id: number) => void;
}

export const Items = observer(
  ({ items, ancestors, closeMenu, openParentMenu, openSubMenu }: Props) => {
    const { t, ready } = useTranslation();

    if (!ready || items.length === 0) return null;

    const isSubmenu = ancestors.length > 1;

    return (
      <List isSubmenu={isSubmenu}>
        {ancestors.length > 1 && (
          <ListItem isSubmenu={isSubmenu}>
            <BackIcon src="/images/chevron_right-24px.svg" />
            <button onClick={openParentMenu}>
              <span>{t('mainMenu.back', 'Go back')}</span>
            </button>
          </ListItem>
        )}
        {items.map((item: ItemInterface) => (
          <ListItem isSubmenu={isSubmenu} key={item.id}>
            <Item item={item} openSubMenu={openSubMenu} closeMenu={closeMenu} />
            {isSubmenu && <NextIcon src="/images/chevron_right-24px.svg" />}
          </ListItem>
        ))}
      </List>
    );
  },
);
