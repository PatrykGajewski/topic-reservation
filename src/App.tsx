import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Route, withRouter,
} from 'react-router-dom';
import Authentication from './authentication';
import { HomePage } from './pages/public';
import { HomePageAuth } from './pages/private';

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
      <MainApp />
    </Router>
  );
}

export default App;
