import * as H from 'history';
import { action, observable, reaction } from 'mobx';

export class TrackerStore {
  private currentLocation: H.Location<any> | undefined;

  @observable items = new Set<number>();
  @observable locations = new Set<string>();

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
