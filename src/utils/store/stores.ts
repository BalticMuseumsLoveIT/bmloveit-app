import { configure } from 'mobx';
import userStore from './userStore';
import uiStore from './uiStore';
import routesStore from './routesStore';
import pageStore from './pageStore';

configure({ enforceActions: 'always' });

const stores = {
  userStore,
  uiStore,
  routesStore,
  pageStore,
};

export default stores;
