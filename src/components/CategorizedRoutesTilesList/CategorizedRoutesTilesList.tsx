import { RouteInterface } from 'utils/interfaces';
import { groupObjectsByKey } from 'utils/helpers';
import RoutesTile from 'components/RoutesTile/RoutesTile';
import RouteTile from 'components/RouteTile/RouteTile';
import React from 'react';

export interface CategorizedRoutesTilesListProps {
  routes: Array<RouteInterface>;
}

export const CategorizedRoutesTilesList = ({
  routes,
}: CategorizedRoutesTilesListProps) => {
  const groupedRoutes = groupObjectsByKey(routes, 'type');

  const tiles = groupedRoutes.map(groupedRoute => {
    const [categoryName, routesArray] = groupedRoute;

    return (
      <RoutesTile key={categoryName} title={categoryName}>
        {routesArray.map((item: RouteInterface) => (
          <RouteTile key={item.id} route={item} />
        ))}
      </RoutesTile>
    );
  });

  return <>{tiles}</>;
};
