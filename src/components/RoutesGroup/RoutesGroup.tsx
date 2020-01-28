import { RouteInterface, RouteTypeInterface } from 'utils/interfaces';
import { getTranslatedString } from 'utils/helpers';
import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface RoutesGroupProps {
  type: RouteTypeInterface;
  routes: Array<RouteInterface>;
  attractions: (routeId: number) => number;
  locations: (routeId: number) => number;
}

export const RoutesGroup = ({
  type,
  routes,
  attractions,
  locations,
}: RoutesGroupProps) => {
  const { t, ready } = useTranslation('area-routes-page');

  return ready ? (
    <div key={type.id}>
      <h2>{type.description}</h2>
      {routes.map(route => (
        <p key={route.id}>
          <Link to={`/route/${route.id}/map`}>
            {getTranslatedString(route.name_full, route.name_full_translation)}
          </Link>
          <br />
          {t('routeLocations', 'Locations: {{locations}}', {
            locations: locations(route.id),
          })}
          <br />
          {t('routeAttractions', 'Attractions: {{attractions}}', {
            attractions: attractions(route.id),
          })}
        </p>
      ))}
    </div>
  ) : null;
};
