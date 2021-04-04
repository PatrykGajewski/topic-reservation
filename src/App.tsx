import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider } from 'react-redux';
import { createStore } from 'redux';
import { ToastContainer } from 'react-toastify';
// react-toaster styles
import 'react-toastify/dist/ReactToastify.css';
import rootReducer from './store/rootReducer';
import {MainRouter} from "./MainRouter";

function App() {
  return (
    <Router>
      <Provider store={createStore(rootReducer)}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
        />
        <MainRouter />
      </Provider>
    </Router>
  );
}

export default App;
