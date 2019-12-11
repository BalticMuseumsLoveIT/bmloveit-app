import { configure } from 'mobx';
import userStore from './userStore';
import uiStore from './uiStore';
import routesStore from './routesStore';

configure({ enforceActions: 'always' });

const stores = {
  userStore,
  uiStore,
  routesStore,
};

export default stores;
