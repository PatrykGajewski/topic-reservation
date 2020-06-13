import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom';

import styled from 'styled-components';

const H1 = styled.h1`
  color: green;
`;

function App() {
  return (
    <Router>
      <div>
        <li>
          <Link to="/register"> Registration</Link>
        </li>
        <li>
          <Link to="/login"> Login </Link>
        </li>
        <li>
          <Link to="/account"> Account </Link>
        </li>
      </div>

      <Switch>
        <Route path="/register" render={() => <div> <H1>Registration</H1> </div>} />
        <Route path="/login" render={() => <div> Login </div>} />
        <Route path="/account" render={() => <div> Account </div>} />
        <Route path="/" render={() => <div> Home</div>} />
      </Switch>

    </Router>
  );
}

export default App;
