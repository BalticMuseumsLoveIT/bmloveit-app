import { RouteInterface } from 'utils/interfaces';
import { observable, action } from 'mobx';

export class RoutesStore {
  @observable routes: Array<RouteInterface> = [];

  @action
  setRoutes = (routes: Array<RouteInterface>): void => {
    this.routes = routes;
  };

  getRoute = (id: number): RouteInterface | undefined => {
    return this.routes.find(item => item.id === id);
  };
}

const routesStore = new RoutesStore();

export default routesStore;
