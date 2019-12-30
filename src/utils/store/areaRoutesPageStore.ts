import {
  CommonLanguageInterface,
  ItemInterface,
  RouteInterface,
} from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { action, autorun, observable, when } from 'mobx';
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

  @action loadData = async (areaId: number) => {
    try {
      this.setState(PageState.LOADING);

      const [routesData, languagesData, itemsData] = await Promise.all([
        Api.getRoutes(),
        Api.getLanguageList(),
        Api.getItemsList(),
        // Keep `PROCESSING` state till translations are fetched
        when(() => this.tReady === true),
      ]);

      this.setRoutesData(routesData, areaId);
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

  // This is probably wrong because items should not be directly attached to route
  attractionsByRoute = createTransformer((routeId: number) =>
    this.itemsData.filter(
      item => item.routes.includes(routeId) && item.type_data.name === 'screen',
    ),
  );

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
