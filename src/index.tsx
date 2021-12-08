import { render } from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import store, { RootStoreContext } from 'stores';
import AppStore from 'stores/app-store';

import GlobalStyle from './style';
import TitleBar from 'components/titlebar';
import UserPanel from 'components/user-panel';
import Navigator from 'components/navigator';
import CheckUpdate from 'components/common/check-update';

import routes, { RouteItem, defaultRoute } from './router';

function renderRoute(app: AppStore, routes: RouteItem[]) {
  const defaultRouteRedirect = Object.keys(defaultRoute)
    .filter((platform) => platform === app.platform)
    .map((platform) => (
      <Redirect exact path="/" to={(defaultRoute as any)[platform]} />
    ));

  return routes
    .map((routeItem, index) => {
      if (!routeItem.platform || app.platform === routeItem.platform) {
        const Component = routeItem.component;
        return (
          <Route
            key={index}
            path={routeItem.path}
            component={Component}
            exact={routeItem.exact}
          />
        );
      }

      return null;
    })
    .concat(defaultRouteRedirect);
}

function App() {
  const { app } = store;

  return (
    <RootStoreContext.Provider value={store}>
      <GlobalStyle />
      <TitleBar />
      <BrowserRouter>
        <Navigator />
        <CheckUpdate />
        {renderRoute(app, routes)}
      </BrowserRouter>
      <UserPanel />
    </RootStoreContext.Provider>
  );
}

const Component = observer(App);

/* initialize sentry for error-tracing */
Sentry.init({
  dsn: 'https://4a42e7a4aa624865b97fff6c3ba0c93f@sentry.kirainmoe.com/2',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

/* if in debug mode, open eruda */
if (localStorage.getItem('tfu-release-debug')) {
  (window as any).eruda.init();
}

render(<Component />, document.getElementById('root'));
