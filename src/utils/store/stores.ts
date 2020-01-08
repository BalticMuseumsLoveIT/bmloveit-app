import { configure } from 'mobx';
import userStore from './userStore';
import uiStore from './uiStore';
import cookieBarStore from './cookieBarStore';

configure({ enforceActions: 'observed' });

const stores = {
  userStore,
  uiStore,
  cookieBarStore,
};

export default stores;
