import Routes from 'utils/Routes';
import stores from 'utils/store/stores';
import { AppState } from 'utils/store/uiStore';
import ErrorPage from 'pages/ErrorPage';
import { Circle as AppLoader } from 'react-preloaders';
import { Router } from 'react-router-dom';
import { observer, Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import React from 'react';

export const history = createBrowserHistory();

@observer
class App extends React.Component {
  componentDidMount = async () => {
    const {
      uiStore,
      userProfileStore,
      authStore,
      siteStore,
      trackerStore,
    } = stores;

    try {
      await Promise.all([
        uiStore.loadLanguages(),
        siteStore.loadSiteData(),
        // Only if user is logged in
        (authStore.isLoggedIn && userProfileStore.loadUserProfile()) ||
          undefined,
      ]);

      // Add initial location
      trackerStore.addLocation(history.location);

      // Track location changes
      history.listen(location => {
        trackerStore.addLocation(location);
      });

      uiStore.setAppState(AppState.READY);
    } catch (e) {
      uiStore.setAppState(AppState.ERROR);
    }
  };

  render() {
    const { uiStore } = stores;

    switch (uiStore.appState) {
      case AppState.LOADING:
      case AppState.READY:
        return (
          <>
            {uiStore.isAppReady && (
              <Provider {...stores}>
                <Router history={history}>
                  <Routes />
                </Router>
              </Provider>
            )}
            <AppLoader
              customLoading={uiStore.isAppLoading}
              background={stores.siteStore.theme.colors.background.default}
              color={stores.siteStore.theme.colors.background.alternative}
            />
          </>
        );
      case AppState.ERROR:
        return <ErrorPage />;
    }
  }
}

export default App;
