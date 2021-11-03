import { render } from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

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

import { registerErrorTracker } from 'utils/error-tracker';

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
        <Redirect exact path="/" to={app.platform === 'windows' ? '/configuration' : '/dashboard'} />
      </BrowserRouter>
      <UserPanel />
    </RootStoreContext.Provider>
  );
}

const Component = observer(App);

registerErrorTracker();

render(<Component />, document.getElementById('root'));
