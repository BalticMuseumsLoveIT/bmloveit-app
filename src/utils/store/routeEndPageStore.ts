import { RouteInterface } from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { action, autorun, computed, observable, when } from 'mobx';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class RouteEndPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
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

      const [routeData] = await Promise.all([
        Api.getRoute(routeId),
        when(() => this.tReady === true),
      ]);

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

  @action setRouteData = (routesData: RouteInterface) => {
    this.routeData = routesData;
  };

  @computed get routeId(): string {
    return this.routeData ? this.routeData.id.toString() : '';
  }

  @computed get routeAreaId(): string {
    return this.routeData && this.routeData.areas.length
      ? this.routeData.areas[0].toString()
      : '';
  }

  @computed get routeFirstItemId(): string {
    return this.routeData &&
      this.routeData.locations_data.length &&
      this.routeData.locations_data[0].screens.length
      ? this.routeData.locations_data[0].screens[0].toString()
      : '';
  }

  @computed get routeTitle(): string {
    return this.routeData ? this.routeData.name_full : '';
  }

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
