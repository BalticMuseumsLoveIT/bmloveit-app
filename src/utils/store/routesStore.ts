import { RouteInterface } from 'utils/interfaces';
import { observable } from 'mobx';

export class RoutesStore {
  @observable private routes: Array<RouteInterface> = [];

  public setRoutes(routes: Array<RouteInterface>): void {
    this.routes = routes;
  }

  public getRoutes(): Array<RouteInterface> {
    return this.routes;
  }

  public getRoute(id: number): RouteInterface | undefined {
    return this.getRoutes().find(item => item.id === id);
  }
}

const routesStore = new RoutesStore();

export default routesStore;
