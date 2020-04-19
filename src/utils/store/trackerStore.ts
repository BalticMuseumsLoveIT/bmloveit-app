import Api from 'utils/api';
import { ActionType } from 'utils/interfaces';
import * as H from 'history';
import { action, observable, reaction } from 'mobx';

export class TrackerStore {
  private currentLocation: H.Location<any> | undefined;
  private isRouteInitialized = false;

  @observable items = new Set<number>();
  @observable locations = new Set<string>();
  @observable currentRoute: number | null = null;

  /**
   * This method should be invoked on app initialization, only when user
   * is already logged in or otherwise when user logs in
   */
  @action initializeCurrentRoute = async () => {
    if (this.isRouteInitialized) return;

    const events = await Api.getEventsList();

    const routeSelectEvents = events.filter(
      event => event.action_type === ActionType.ROUTE_SELECT,
    );

    const today = new Date();

    const routeSelectEventsFromToday = routeSelectEvents.filter(event => {
      const eventDate = new Date(event.date);
      return today.setHours(0, 0, 0, 0) === eventDate.setHours(0, 0, 0, 0);
    });

    if (routeSelectEventsFromToday.length > 0) {
      this.setCurrentRoute(
        routeSelectEventsFromToday[routeSelectEventsFromToday.length - 1].route,
      );
      this.isRouteInitialized = true;
    }
  };

  /**
   * This method should be invoked when user logs out
   */
  @action resetCurrentRoute = () => {
    this.isRouteInitialized = false;
    this.currentRoute = null;
  };

  /**
   * This method should be invoked on every route change
   *
   * @param id
   */
  @action setCurrentRoute = (id: number | null) => {
    this.currentRoute = id;
  };

  @action addLocation = (location: H.Location<any>) => {
    this.currentLocation = location;
    this.locations.add(this.currentLocation.pathname);
  };

  @action private addItem = (id: number) => {
    this.items.add(id);
  };

  constructor() {
    reaction(
      () => this.locations.size,
      () => {
        if (typeof this.currentLocation === 'undefined') return;

        if (!this.currentLocation.pathname.startsWith('/')) return;

        const [, endpoint, param] =
          this.currentLocation.pathname.split('/') || [];

        if (endpoint === 'item' && !Number.isNaN(parseInt(param)))
          this.addItem(parseInt(param));
      },
    );
  }
}

const trackerStore = new TrackerStore();

export default trackerStore;
