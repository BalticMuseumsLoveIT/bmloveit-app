import {
  CommonLanguageInterface,
  ItemInterface,
  RouteInterface,
  RouteTypeInterface,
} from 'utils/interfaces';
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

export default class AreaRoutesPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable routesData: Array<RouteInterface> = [];
  @observable routeTypes: Array<RouteTypeInterface> = [];
  @observable languagesData: Array<CommonLanguageInterface> = [];
  @observable itemsData: Array<ItemInterface> = [];
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

  @computed get doesAnyRouteContainImage(): boolean {
    return this.routesData.length
      ? this.routesData.some(routeData => routeData.logo_url.length > 0)
      : false;
  }

  @action loadData = async (areaId: number) => {
    try {
      this.setState(PageState.LOADING);

      const [
        routesData,
        routeTypes,
        languagesData,
        itemsData,
      ] = await Promise.all([
        Api.getRoutes(),
        Api.getRouteTypes(),
        Api.getLanguageList(),
        Api.getItemsList(),
        when(() => this.tReady === true),
      ]);

      this.setRoutesData(routesData, areaId);
      this.setRouteTypes(routeTypes);
      this.setLanguagesData(languagesData);
      this.setItemsData(itemsData);
      this.setState(PageState.LOADED);
    } catch (e) {
      this.setState(PageState.ERROR);
    }
  };

  routesByLanguage = createTransformer((languageId: number) =>
    this.routesData.filter(route => route.languages.includes(languageId)),
  );

  routesByType = createTransformer((typeId: number | null) =>
    this.routesData.filter(route => route.type === typeId),
  );

  locationsByRoute = createTransformer((routeId: number) => {
    const route = this.routesData.find(route => route.id === routeId);

    return route && route.locations_data.length
      ? route.locations_data.length
      : 0;
  });

  attractionsByRoute = createTransformer((routeId: number) => {
    const route = this.routesData.find(route => route.id === routeId);
    let attractions = 0;

    if (route && route.locations_data.length) {
      route.locations_data.forEach(location => {
        attractions += location.screens.length;
      });
    }

    return attractions;
  });

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady(tReady?: boolean) {
    this.tReady = tReady;
  }

  @action setRoutesData = (
    routesData: Array<RouteInterface>,
    areaId: number,
  ) => {
    this.routesData = routesData.filter(route => route.areas.includes(areaId));
  };

  @action setRouteTypes = (routeTypes: Array<RouteTypeInterface>) => {
    this.routeTypes = routeTypes;
  };

  @action setLanguagesData = (
    languagesData: Array<CommonLanguageInterface>,
  ) => {
    this.languagesData = languagesData;
  };

  @action setItemsData = (itemsData: Array<ItemInterface>) => {
    this.itemsData = itemsData;
  };

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
