import React from 'react';
import {
  BrowserRouter as Router, Route, withRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ToastContainer } from 'react-toastify';
// react-toaster styles
import 'react-toastify/dist/ReactToastify.css';

import Authentication from './authentication';
import { HomePage, PageContent } from './pages/public';
import { AuthenticatedMainPage } from './pages/private';
import rootReducer from './store/rootReducer';

const store = createStore(rootReducer);

const MainApp = withRouter(() => (
  <PageContent>
    {Authentication.isAuthenticated ? (
      <Route path="/" render={(props) => <AuthenticatedMainPage {...props} />} />
    ) : (
      <Route path="/" render={(props) => <HomePage {...props} />} />
    )}
  </PageContent>
));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
        />
        <MainApp />
      </Provider>
    </Router>
  );
}

export default App;
