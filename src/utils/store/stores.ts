import { configure } from 'mobx';
import userStore from './userStore';
import uiStore from './uiStore';
import cookieBarStore from './cookieBarStore';

configure({ enforceActions: 'always' });

const stores = {
  userStore,
  uiStore,
  cookieBarStore,
};

export default stores;
