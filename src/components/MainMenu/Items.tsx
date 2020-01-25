import { ItemInterface } from 'utils/interfaces';
import { List, ListItem } from 'components/MainMenu/Items.style';
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

    return (
      <List>
        {ancestors.length > 1 && (
          <ListItem>
            <button onClick={openParentMenu}>
              {t('mainMenu.back', 'Go back')}
            </button>
          </ListItem>
        )}
        {items.map((item: ItemInterface) => (
          <ListItem key={item.id}>
            <Item item={item} openSubMenu={openSubMenu} closeMenu={closeMenu} />
          </ListItem>
        ))}
      </List>
    );
  },
);
