import { RouteInterface } from 'utils/interfaces';
import Api from 'utils/api';
import { observable, action, computed } from 'mobx';

export class RoutesStore {
  @observable routes: Array<RouteInterface> = [];

  @action
  setRoutes = (routes: Array<RouteInterface>): void => {
    this.routes = routes;
  };

  @computed
  get isRoutesEmpty(): boolean {
    return this.routes.length === 0;
  }

  @computed
  getRoute = (id: number): RouteInterface | undefined => {
    return this.routes.find(item => item.id === id);
  };

  @action
  loadRoutes = async () => {
    const routes = await Api.getRoutes();
    this.setRoutes(routes);
  };
}

const routesStore = new RoutesStore();

export default routesStore;
