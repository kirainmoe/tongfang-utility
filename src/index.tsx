import { render } from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";



import GlobalStyle from './style';

import store, { RootStoreContext } from 'stores';

import TitleBar from 'components/titlebar';
import Navigator from 'components/navigator';
import DashboardPage from 'components/dashboard';
import ConfigPage from 'components/config-page';
import DriversPage from 'components/drivers';
import CompatibilityCheckPage from 'components/compatibility-check';
import SettingPage from 'components/setting';
import AboutPage from 'components/about';
import KeyboardLightPage from 'components/keyboard-light';
import UpdatePage from 'components/update';
import ToolkitPage from 'components/toolkit';
import UserPanel from 'components/user-panel';
import CheckUpdate from 'components/common/check-update';

function App() {
  const { app } = store;

  return (
    <RootStoreContext.Provider value={store}>
      <GlobalStyle />
      <TitleBar />
      <BrowserRouter>
        <Navigator />
        <Route path="/about" component={AboutPage} />
        <Route path="/keyboard-light" component={KeyboardLightPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/configuration" component={ConfigPage} />
        <Route path="/drivers" component={DriversPage} />
        <Route path="/compatibility-check" component={CompatibilityCheckPage} />
        <Route path="/preference" component={SettingPage} />
        <Route path="/update" component={UpdatePage} />
        <Route path="/toolkit" component={ToolkitPage} />
        {app.platform === 'windows' && (
          <Redirect exact path="/" to="/configuration" />
        )}
        {app.platform === 'macos' && (
          <Redirect exact path="/" to="/dashboard" />
        )}
        <CheckUpdate />
      </BrowserRouter>
      <UserPanel />
    </RootStoreContext.Provider>
  );
}

const Component = observer(App);

/* initialize sentry for error-tracing */
Sentry.init({
  dsn: "https://ce93986e23904657842e01cb3e5c648b@o1061007.ingest.sentry.io/6051042",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

/* if in debug mode, open eruda */
if (localStorage.getItem('tfu-release-debug')) {
  (window as any).eruda.init();
}

render(<Component />, document.getElementById('root'));
