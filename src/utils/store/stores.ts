import { configure } from 'mobx';
import userStore from './userStore';
import uiStore from './uiStore';
import routesStore from './routesStore';
import cookieBarStore from './cookieBarStore';

configure({ enforceActions: 'always' });

const stores = {
  userStore,
  uiStore,
  routesStore,
  cookieBarStore,
};

export default stores;
