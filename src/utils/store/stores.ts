import { configure } from 'mobx';
import userStore from './userStore';
import uiStore from './uiStore';
import routesStore from './routesStore';
import contentStore from './contentStore';

configure({ enforceActions: 'always' });

const stores = {
  userStore,
  uiStore,
  routesStore,
  contentStore,
};

export default stores;
