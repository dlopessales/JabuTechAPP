import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import User from './User';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <User /> 
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
