import { ActionType, EventParams } from 'utils/interfaces';
import Api from 'utils/api';

export class EventStore {
  dispatchViewItem = async (item: Required<EventParams>['item']) => {
    if (Number.isNaN(item)) return;

    await Api.createEvent({
      action_type: ActionType.VIEW,
      item: item,
    });
  };

  // TODO: Not working due to unspecified parameters
  dispatchSelectRoute = async (route: Required<EventParams>['route']) => {
    if (Number.isNaN(route)) return;

    await Api.createEvent({
      action_type: ActionType.ROUTE_SELECT,
      route: route,
    });
  };

  dispatchLanguageChange = async (
    language: Required<EventParams>['language'],
  ) => {
    if (Number.isNaN(language)) return;

    await Api.createEvent({
      action_type: ActionType.LANGUAGE,
      language: language,
    });
  };

  dispatchAvatarChoice = async (item: Required<EventParams>['item']) => {
    if (Number.isNaN(item)) return;

    await Api.createEvent({
      action_type: ActionType.AVATAR_SET,
      item: item,
    });
  };
}

const eventStore = new EventStore();

export default eventStore;
