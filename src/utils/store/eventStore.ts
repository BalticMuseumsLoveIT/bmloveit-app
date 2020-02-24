import { ActionType, EventParams } from 'utils/interfaces';
import Api from 'utils/api';

export class EventStore {
  dispatchLanguageChange = async (language: EventParams['language']) => {
    await Api.createEvent({
      action_type: ActionType.LANGUAGE,
      language: language,
    });
  };

  dispatchAvatarChoice = async (item: EventParams['item']) => {
    await Api.createEvent({
      action_type: ActionType.AVATAR_SET,
      item: item,
    });
  };
}

const eventStore = new EventStore();

export default eventStore;
