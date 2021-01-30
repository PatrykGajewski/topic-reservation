import React from 'react';
import {
  BrowserRouter as Router, Route, withRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Authentication from './authentication';
import { HomePage } from './pages/public';
import { HomePageAuth } from './pages/private';
import rootReducer from './store/rootReducer';

const store = createStore(rootReducer);

const MainApp = withRouter(() => (
  <>
    {Authentication.isAuthenticated ? (
      <Route path="/" render={(props) => <HomePageAuth {...props} />} />
    ) : (
      <Route path="/" render={(props) => <HomePage {...props} />} />
    )}
  </>
));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <MainApp />
      </Provider>
    </Router>
  );
}

export default App;
