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

  dispatchSelectRoute = async (route: Required<EventParams>['route']) => {
    if (Number.isNaN(route)) return;

    await Api.createEvent({
      action_type: ActionType.ROUTE_SELECT,
      route: route,
    });
  };

  dispatchPlayVideo = async (
    item: Required<EventParams>['item'],
    item_resource: Required<EventParams>['item_resource'],
  ) => {
    if (Number.isNaN(item_resource)) return;

    await Api.createEvent({
      action_type: ActionType.PLAY_VIDEO,
      item: item,
      item_resource: item_resource,
    });
  };

  dispatchPlayAudio = async (
    item: Required<EventParams>['item'],
    item_resource: Required<EventParams>['item_resource'],
  ) => {
    if (Number.isNaN(item_resource)) return;

    await Api.createEvent({
      action_type: ActionType.PLAY_AUDIO,
      item: item,
      item_resource: item_resource,
    });
  };

  dispatchScanQR = async (
    description: Required<EventParams>['description'],
  ) => {
    await Api.createEvent({
      action_type: ActionType.SCAN,
      description: description,
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
