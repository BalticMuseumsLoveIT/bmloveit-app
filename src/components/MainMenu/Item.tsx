import { ItemInterface, ItemType } from 'utils/interfaces';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import React from 'react';

interface Props {
  item: ItemInterface;
  closeMenu: () => void;
  openSubMenu: (e: React.SyntheticEvent, id: number) => void;
}

export const Item = observer(({ item, closeMenu, openSubMenu }: Props) => {
  switch (item.type_data.name) {
    case ItemType.DEFAULT:
      return (
        <button onClick={e => openSubMenu(e, item.id)}>{item.name_full}</button>
      );
    case ItemType.LINK:
      return (
        <Link to={item.description} onClick={closeMenu}>
          {item.name_full}
        </Link>
      );
    default:
      return null;
  }
});
