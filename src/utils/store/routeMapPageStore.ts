import {
  ItemInterface,
  ResourceDataInterface,
  ResourceTypeName,
  RouteInterface,
} from 'utils/interfaces';
import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { ItemType } from 'utils/store/itemPageStore';
import { action, autorun, computed, observable, when } from 'mobx';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export default class RouteMapPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable routeData: RouteInterface | null = null;
  @observable routeMapData: ItemInterface | null = null;
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

      if (this.routeData && this.routeData.items_data.length) {
        const routeMapData = this.routeData.items_data.find(
          item => ItemType.MAP === item.type_data.name,
        );

        this.setRouteMapData(routeMapData || null);
      }

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

  @action setRouteMapData = (routeMapData: ItemInterface | null) => {
    this.routeMapData = routeMapData;
  };

  @computed get routeId(): string {
    return this.routeData ? this.routeData.id.toString() : '';
  }

  @computed get routeAreaId(): string {
    return this.routeData && this.routeData.areas.length
      ? this.routeData.areas[0].toString()
      : '';
  }

  @computed get routeTitle(): string {
    return this.routeData ? this.routeData.name_full : '';
  }

  @computed get routeMapImageResource(): ResourceDataInterface | null {
    if (
      this.routeMapData === null ||
      this.routeMapData.resources_data.length === 0
    )
      return null;

    return (
      this.routeMapData.resources_data.find(
        resource => ResourceTypeName.Image === resource.type_name,
      ) || null
    );
  }

  @computed get routeMapImageURL(): string {
    const mapImageResource = this.routeMapImageResource;
    return (mapImageResource && mapImageResource.file_url) || '';
  }

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
