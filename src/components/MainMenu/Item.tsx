import { ItemInterface, ItemType } from 'utils/interfaces';
import { getTranslatedString } from 'utils/helpers';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import React from 'react';

interface Props {
  item: ItemInterface;
  closeMenu: () => void;
  openSubMenu: (e: React.SyntheticEvent, id: number) => void;
}

export const Item = observer(({ item, closeMenu, openSubMenu }: Props) => {
  const label = getTranslatedString(item.name_full, item.name_full_translation);

  if (item.type_data === null) return null;

  switch (item.type_data.name) {
    case ItemType.DEFAULT:
      return <button onClick={e => openSubMenu(e, item.id)}>{label}</button>;
    case ItemType.LINK:
      return (
        <Link to={item.description} onClick={closeMenu}>
          {label}
        </Link>
      );
    default:
      return null;
  }
});
