import siteStore from 'utils/store/siteStore';
import authStore from 'utils/store/authStore';
import userProfileStore from 'utils/store/userProfileStore';
import uiStore from 'utils/store/uiStore';
import cookieBarStore from 'utils/store/cookieBarStore';
import eventStore from 'utils/store/eventStore';
import trackerStore from 'utils/store/trackerStore';
import routeMapPageStore from 'utils/store/routeMapPageStore';

const stores = {
  authStore,
  userProfileStore,
  uiStore,
  cookieBarStore,
  siteStore,
  eventStore,
  trackerStore,
  routeMapPageStore,
};

export default stores;
