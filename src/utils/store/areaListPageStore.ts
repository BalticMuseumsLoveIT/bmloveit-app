import { AreaInterface, RouteInterface } from 'utils/interfaces';
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

export default class AreaListPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable areaData: Array<AreaInterface> = [];
  @observable routesData: Array<RouteInterface> = [];
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

  @action loadData = async () => {
    try {
      this.setState(PageState.LOADING);

      const [areaData, routesData] = await Promise.all([
        Api.getAreaData(),
        Api.getRoutes(),
        when(() => this.tReady === true),
      ]);

      this.setAreaData(areaData);
      this.setRoutesData(routesData);
      this.setState(PageState.LOADED);
    } catch (e) {
      this.setState(PageState.ERROR);
    }
  };

  @computed get skipAreaList(): boolean {
    return this.areaData.length === 1;
  }

  @computed get firstAreaId(): number {
    return this.areaData.length ? this.areaData[0].id : NaN;
  }

  routesAmount = createTransformer((areaId: number) => {
    return this.routesData.reduce(
      (amount, route) =>
        route.areas.includes(areaId) && route.type !== null
          ? amount + 1
          : amount,
      0,
    );
  });

  languagesAmount = createTransformer((areaId: number) => {
    const languages = new Set();

    this.routesData.forEach(route => {
      if (route.areas.includes(areaId) && route.languages.length) {
        languages.add(route.languages[0]);
      }
    });

    return languages.size;
  });

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady(tReady?: boolean) {
    this.tReady = tReady;
  }

  @action setAreaData = (areaData: Array<AreaInterface>) => {
    this.areaData = areaData;
  };

  @action setRoutesData(routesData: Array<RouteInterface>) {
    this.routesData = routesData;
  }

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
