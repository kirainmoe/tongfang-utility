import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import GlobalStyle from './style';

import store from 'stores';

import Hello from 'components/Hello';
import Navigator from 'components/Navigator';
import Counter from 'components/Counter';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />

      <BrowserRouter>
        <Navigator />

        <Route path='/' exact>
          <Redirect to="/hello/React" />
        </Route>

        <Route path='/hello/:person' component={Hello} />
        <Route path='/counter' component={Counter} exact />
      </BrowserRouter>
    </Provider>
  )
}

render(<App />, document.getElementById('root'));
