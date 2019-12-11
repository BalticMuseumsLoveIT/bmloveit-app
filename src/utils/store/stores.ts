import { configure } from 'mobx';
import userStore from './userStore';
import uiStore from './uiStore';
import routesStore from './routesStore';
import quizDetailsStore from './quizDetailsStore';
import quizListStore from './quizListStore';

configure({ enforceActions: 'always' });

const stores = {
  userStore,
  uiStore,
  routesStore,
  quizListStore,
  quizDetailsStore,
};

export default stores;
