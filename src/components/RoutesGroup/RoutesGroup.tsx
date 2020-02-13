import { RouteInterface, RouteTypeInterface } from 'utils/interfaces';
import { getTranslatedString } from 'utils/helpers';
import {
  DefaultList,
  DefaultListItemInfo,
} from 'components/DefaultList/DefaultList.style';
import { DefaultListItem } from 'components/DefaultList/DefaultListItem';
import { Link } from 'react-router-dom';
import React from 'react';
import { action } from 'mobx';
import { useTranslation } from 'react-i18next';
import { useLocalStore, useObserver } from 'mobx-react';

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

  return useObserver(() => {
    return ready ? (
      <DefaultList>
        <DefaultListItem
          isMenuOpened={localStore.isMenuOpened}
          isHeader={true}
          onClick={localStore.toggleMenu}
        >
          {getTranslatedString(
            type.description,
            type.description_translation || [],
          )}
        </DefaultListItem>
        {routes.map(route => (
          <DefaultListItem
            key={route.id}
            isMenuOpened={localStore.isMenuOpened}
          >
            <Link to={`/route/${route.id}/map`}>
              {getTranslatedString(
                route.name_full,
                route.name_full_translation,
              )}
              <DefaultListItemInfo>
                {t('routeAttractions', 'Attractions: {{attractions}}', {
                  attractions: attractions(route.id),
                })}
              </DefaultListItemInfo>
            </Link>
          </DefaultListItem>
        ))}
      </DefaultList>
    ) : null;
  });
};
