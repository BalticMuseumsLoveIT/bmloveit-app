import { LocationInterface, RouteInterface } from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { action, autorun, computed, observable, when } from 'mobx';
import { createTransformer } from 'mobx-utils';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class RouteLocationsListPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable locationsData: Array<LocationInterface> = [];
  @observable routeData: RouteInterface | null = null;
  @observable tReady?: boolean;

  private _handleContentState = () => {
    switch (this.state) {
      case PageState.LOADING:
        uiStore.setContentState(ContentState.PROCESSING);
        break;
      case PageState.NOT_LOADED:
      case PageState.LOADED:
      case PageState.ERROR:
      default:
        uiStore.setContentState(ContentState.AVAILABLE);
    }
  };

  constructor(manageContentState = false) {
    this._manageContentState = manageContentState;

    if (manageContentState) {
      autorun(this._handleContentState);
    }
  }

  @action loadData = async (routeId: number) => {
    try {
      this.setState(PageState.LOADING);

      const [locationsData, routeData] = await Promise.all([
        Api.getLocationsList(routeId),
        Api.getRoute(routeId),
        when(() => this.tReady === true),
      ]);

      this.setLocationsData(locationsData);
      this.setRouteData(routeData);

      this.setState(PageState.LOADED);
    } catch (e) {
      this.setState(PageState.ERROR);
    }
  };

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady(tReady?: boolean) {
    this.tReady = tReady;
  }

  @action setLocationsData = (locationsData: Array<LocationInterface>) => {
    this.locationsData = locationsData;
  };

  @action setRouteData = (routesData: RouteInterface) => {
    this.routeData = routesData;
  };

  @computed get areaId(): string {
    return this.routeData && this.routeData.areas.length
      ? this.routeData.areas[0].toString()
      : '';
  }

  @computed get routeId(): string {
    return this.locationsData.length && this.locationsData[0].routes.length
      ? this.locationsData[0].routes[0].toString() || ''
      : '';
  }

  @computed get doesAnyLocationContainImage(): boolean {
    if (this.locationsData.length === 0) {
      return false;
    }

    return this.locationsData.some(locationData => {
      return locationData.resources_data.length > 0;
    });
  }

  screensAmount = createTransformer((locationId: number) => {
    const location = this.locationsData.find(
      location => location.id === locationId,
    );

    return location ? location.screens.length : 0;
  });

  firstScreenId = createTransformer((locationId: number) => {
    const location = this.locationsData.find(
      location => location.id === locationId,
    );

    return location && location.screens.length ? location.screens[0] : NaN;
  });

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
