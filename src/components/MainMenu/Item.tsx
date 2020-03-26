import { MainMenuPatchedInterface } from 'utils/interfaces';
import { getTranslatedString } from 'utils/helpers';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import React from 'react';

interface Props {
  item: MainMenuPatchedInterface;
  closeMenu: () => void;
  openSubMenu: (e: React.SyntheticEvent, id: number) => void;
}

export const Item = observer(({ item, closeMenu, openSubMenu }: Props) => {
  const label = getTranslatedString(item.title, item.title_translation);

  if (item.item !== null) {
    return (
      <Link to={`/item/${item.item}`} onClick={closeMenu} replace>
        <span>{label}</span>
      </Link>
    );
  }

  if (item.url.length > 0) {
    const appOrigin = new URL(document.baseURI).origin;
    const urlOrigin = new URL(item.url, document.baseURI).origin;

    return appOrigin === urlOrigin ? (
      <Link to={item.url} onClick={closeMenu} replace>
        <span>{label}</span>
      </Link>
    ) : (
      <a href={item.url}>
        <span>{label}</span>
      </a>
    );
  }

  if (item.child_menus_data.length > 0) {
    return (
      <button onClick={e => openSubMenu(e, item.id)}>
        <span>{label}</span>
      </button>
    );
  }

  return null;
});
