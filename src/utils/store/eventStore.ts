import { ActionType, EventParams, EventResponse } from 'utils/interfaces';
import trackerStore from 'utils/store/trackerStore';
import uiStore from 'utils/store/uiStore';
import routeMapPageStore from 'utils/store/routeMapPageStore';
import userProfileStore from 'utils/store/userProfileStore';

import Api from 'utils/api';

export class EventStore {
  //** Updates user profile, adds points, updates routes */
  updateUserProfileAndItemsData = (eventData: EventResponse) => {
    if (eventData) {
      const achievementsData = eventData.achievements_data;
      const userProfileData = userProfileStore.userProfileData;

      if (achievementsData) {
        if (achievementsData.texts_data) {
          if (achievementsData.congratulation_items_data?.length > 0) {
            const itemToPopup = achievementsData.congratulation_items_data[0];
            uiStore.setPopupItemFromEvent({
              id: itemToPopup.id || null,
              name: itemToPopup.name || null,
              name_full: itemToPopup.name_full || null,
              description: itemToPopup.description || null,
              type: itemToPopup.type || null,
              type_data: itemToPopup.type_data || null,
              kind: itemToPopup.kind || null,
              kind_data: itemToPopup.kind_data || null,
              locations: itemToPopup.locations || null,
              resources_data: itemToPopup.resources_data || null,
              quizz: itemToPopup.quizz || null,
              survey: itemToPopup.survey || null,
              child_items_data: itemToPopup.child_items_data || null,
              child_items: itemToPopup.child_items || undefined,
              next_item: itemToPopup.next_item || null,
              qr_code: itemToPopup.qr_code || null,
              latitude: itemToPopup.latitude || null,
              longitude: itemToPopup.longitude || null,
              name_translation: itemToPopup.name_translation,
              name_full_translation: itemToPopup.name_full_translation,
              description_translation: itemToPopup.description_translation,
              routes: itemToPopup.routes,
              fullscreen: itemToPopup.fullscreen,
              zoomout: itemToPopup.zoomout,
              x: itemToPopup.x || null,
              y: itemToPopup.y || null,
            });
          } else {
            if (achievementsData.texts_data.length > 0) {
              uiStore.setShowTextsData(true);
              uiStore.setTextsData(achievementsData.texts_data);
            }
          }
        }
      }

      if (userProfileData && achievementsData) {
        userProfileStore.setUserProfile({
          ...userProfileData,
          points:
            userProfileData.points + (parseInt(achievementsData.points) || 0),
          badges_data: [
            ...userProfileData.badges_data,
            ...achievementsData.badges_data,
          ],
        });

        if (routeMapPageStore.routeData && achievementsData.items_data) {
          routeMapPageStore.setRouteData({
            ...routeMapPageStore.routeData,
            items_data: [
              ...routeMapPageStore.routeData.items_data,
              ...achievementsData.items_data,
            ],
          });
        }
      }
    }
  };

  dispatchViewItem = async (item: Required<EventParams>['item']) => {
    if (Number.isNaN(item)) return;

    const response = await Api.createEvent({
      action_type: ActionType.VIEW,
      item: item,
      route: trackerStore.currentRoute || undefined,
    });

    this.updateUserProfileAndItemsData(response as EventResponse);
  };

  dispatchSelectRoute = async (route: Required<EventParams>['route']) => {
    if (Number.isNaN(route)) return;

    const response = await Api.createEvent({
      action_type: ActionType.ROUTE_SELECT,
      route: route,
    });

    trackerStore.setCurrentRoute(route);
    this.updateUserProfileAndItemsData(response as EventResponse);
  };

  dispatchPlayVideo = async (
    item: Required<EventParams>['item'],
    item_resource: Required<EventParams>['item_resource'],
  ) => {
    if (Number.isNaN(item_resource)) return;

    const response = await Api.createEvent({
      action_type: ActionType.PLAY_VIDEO,
      item: item,
      item_resource: item_resource,
      route: trackerStore.currentRoute || undefined,
    });

    this.updateUserProfileAndItemsData(response as EventResponse);
  };

  dispatchPlayAudio = async (
    item: Required<EventParams>['item'],
    item_resource: Required<EventParams>['item_resource'],
  ) => {
    if (Number.isNaN(item_resource)) return;

    const response = await Api.createEvent({
      action_type: ActionType.PLAY_AUDIO,
      item: item,
      item_resource: item_resource,
      route: trackerStore.currentRoute || undefined,
    });

    this.updateUserProfileAndItemsData(response as EventResponse);
  };

  dispatchScanQR = async (
    description: Required<EventParams>['description'],
  ) => {
    const response = await Api.createEvent({
      action_type: ActionType.SCAN,
      description: description,
    });

    this.updateUserProfileAndItemsData(response as EventResponse);
  };

  dispatchLanguageChange = async (
    language: Required<EventParams>['language'],
  ) => {
    if (Number.isNaN(language)) return;

    const response = await Api.createEvent({
      action_type: ActionType.LANGUAGE,
      language: language,
    });

    this.updateUserProfileAndItemsData(response as EventResponse);
  };

  dispatchAvatarChoice = async (item: Required<EventParams>['item']) => {
    if (Number.isNaN(item)) return;

    const response = await Api.createEvent({
      action_type: ActionType.AVATAR_SET,
      item: item,
    });

    this.updateUserProfileAndItemsData(response as EventResponse);
  };
}

const eventStore = new EventStore();

export default eventStore;
