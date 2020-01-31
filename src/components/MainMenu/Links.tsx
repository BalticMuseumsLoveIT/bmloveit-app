import { LinkItem, LinkList } from 'components/MainMenu/Links.syles';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { TOptionsBase } from 'i18next';
import { useTranslation } from 'react-i18next';

export interface StaticLinkInterface {
  to: string;
  label: { key: string; options: TOptionsBase };
}

interface Props {
  links: Array<StaticLinkInterface>;
  closeMenu: () => void;
}

export const StaticLinks = observer(({ links, closeMenu }: Props) => {
  const { t, ready } = useTranslation();

  if (!ready || links.length === 0) return null;

  return (
    <LinkList>
      {links.map((item, index) => {
        return (
          <LinkItem key={index}>
            <Link to={item.to} onClick={closeMenu}>
              {t(item.label.key, item.label.options)}
            </Link>
          </LinkItem>
        );
      })}
    </LinkList>
  );
});
