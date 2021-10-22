import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

import GlobalStyle from './style';

import store, { RootStoreContext } from 'stores';

import TitleBar from 'components/titlebar';
import Navigator from 'components/navigator';
import DashboardPage from 'components/dashboard';
import ConfigPage from 'components/config-page';
import DriversPage from 'components/drivers';
import { registerErrorTracker } from 'utils/error-tracker';

function App() {
  return (
    <RootStoreContext.Provider value={store}>
      <GlobalStyle />
      <TitleBar />
      <BrowserRouter>
        <Navigator />
        <Redirect exact path="/" to="/dashboard" />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/configuration" component={ConfigPage} />
        <Route path="/drivers" component={DriversPage} />
      </BrowserRouter>
    </RootStoreContext.Provider>
  );
}

const Component = observer(App);

registerErrorTracker();

render(<Component />, document.getElementById('root'));
