import { RouteInterface, LocationInterface } from 'utils/interfaces';
import { observable } from 'mobx';

export class RoutesStore {
  @observable private routes: Array<RouteInterface> = [];
  @observable private locations: Array<LocationInterface> = [];

  public setRoutes(routes: Array<RouteInterface>): void {
    this.routes = routes;
  }

  public getRoutes(): Array<RouteInterface> {
    return this.routes;
  }

  public getRoute(id: number): RouteInterface | undefined {
    return this.getRoutes().find(item => item.id === id);
  }

  public setLocations(locations: Array<LocationInterface>): void {
    this.locations = locations;
  }

  public getLocations(): Array<LocationInterface> {
    return this.locations;
  }

  public getLocation(id: number): LocationInterface | undefined {
    return this.getLocations().find(item => item.id === id);
  }

  public getLocationsForRoute(id: number): Array<LocationInterface> {
    return this.getLocations().filter(item => {
      const route = this.getRoute(id);

      if (route === undefined) {
        return false;
      }

      return route.locations.includes(item.id);
    });
  }
}

const routesStore = new RoutesStore();

export default routesStore;
