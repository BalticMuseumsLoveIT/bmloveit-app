import uiStore from 'utils/store/uiStore';
import { ContentState } from 'components/Content/Content';
import Api from 'utils/api';
import { ActionType } from 'utils/interfaces';
import { action, autorun, computed, observable } from 'mobx';

export enum PageState {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export enum ErrorType {
  NO_ERROR,
  INVALID_ID,
  LOCATION_NOT_FOUND,
  LOCATION_HAS_NO_DEFAULT_ITEM,
  GENERIC,
}

export default class LocationPageStore {
  private readonly _manageContentState: boolean;

  @observable state: PageState = PageState.NOT_LOADED;
  @observable errorType: ErrorType = ErrorType.NO_ERROR;
  @observable itemId: number | null = null;
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

  @computed get hasError(): boolean {
    return this.errorType !== ErrorType.NO_ERROR;
  }

  @computed get itemFound(): boolean {
    return this.itemId !== null;
  }

  @action loadData = async (locationId: number) => {
    if (Number.isNaN(locationId)) {
      return this.setError(ErrorType.INVALID_ID);
    }

    try {
      const locations = await Api.getLocationsList(NaN, locationId);

      if (locations.length === 0) {
        return this.setError(ErrorType.LOCATION_NOT_FOUND);
      }

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
        const routeId =
          routeSelectEventsFromToday[routeSelectEventsFromToday.length - 1]
            .route;

        if (routeId !== null) {
          const items = await Api.getItem({
            item_locations__location__id: locations[0].id,
            item_routes__route__id: routeId,
          });

          if (items.length > 0) {
            const defaultItem = items.find(
              item => item.id === locations[0].screen_default,
            );

            /**
             * If location's default screen do not belong to the root,
             * there is no guarantee that first item in this list is "default" one
             */
            return this.setItem(defaultItem ? defaultItem.id : items[0].id);
          }
        }
      }

      if (locations[0].screen_default === null) {
        return this.setError(ErrorType.LOCATION_HAS_NO_DEFAULT_ITEM);
      }

      return this.setItem(locations[0].screen_default);
    } catch (e) {
      return this.setError(ErrorType.GENERIC);
    }
  };

  @action setError = (errorType: ErrorType) => {
    this.setState(PageState.ERROR);
    this.setErrorType(errorType);
    this.setItemId(null);
  };

  @action setErrorType = (errorType: ErrorType) => {
    this.errorType = errorType;
  };

  @action setItem = (itemId: number) => {
    this.setItemId(itemId);
    this.setErrorType(ErrorType.NO_ERROR);
    this.setState(PageState.LOADED);
  };

  @action setItemId = (itemId: number | null) => {
    this.itemId = itemId;
  };

  @action setState = (state: PageState) => {
    this.state = state;
  };

  @action setTReady(tReady?: boolean) {
    this.tReady = tReady;
  }

  @action unmount = () => {
    if (this._manageContentState) {
      this.setState(PageState.NOT_LOADED);
    }
  };
}
