import { RouteInterface, RouteTypeInterface } from 'utils/interfaces';
import { getTranslatedString } from 'utils/helpers';
import {
  DefaultListItem,
  DefaultList,
  DefaultListItemInfo,
} from 'components/DefaultList/DefaultList.style';
import { Link } from 'react-router-dom';
import React from 'react';
import { action } from 'mobx';
import { useTranslation } from 'react-i18next';
import { useLocalStore } from 'mobx-react';

interface RoutesGroupProps {
  type: RouteTypeInterface;
  routes: Array<RouteInterface>;
  attractions: (routeId: number) => number;
}

export const RoutesGroup = ({
  type,
  routes,
  attractions,
}: RoutesGroupProps) => {
  const { t, ready } = useTranslation('area-routes-page');

  const localStore = useLocalStore(() => ({
    isMenuOpened: true,

    toggleMenu: action(() => {
      localStore.isMenuOpened = !localStore.isMenuOpened;
    }),
  }));

  return ready ? (
    <DefaultList>
      <DefaultListItem
        isMenuOpened={localStore.isMenuOpened}
        isVisibleWhenCollapsed={true}
        as={Link}
        to={'#'}
        onClick={localStore.toggleMenu}
      >
        {getTranslatedString(
          type.description,
          type.description_translation || [],
        )}
      </DefaultListItem>
      {routes.map(route => (
        <DefaultListItem
          as={Link}
          key={route.id}
          to={`/route/${route.id}/map`}
          isMenuOpened={localStore.isMenuOpened}
        >
          {getTranslatedString(route.name_full, route.name_full_translation)}
          <DefaultListItemInfo>
            {t('routeAttractions', 'Attractions: {{attractions}}', {
              attractions: attractions(route.id),
            })}
          </DefaultListItemInfo>
        </DefaultListItem>
      ))}
    </DefaultList>
  ) : null;
};
