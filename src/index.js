import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

var deepstream = require('deepstream.io-client-js')
const client = deepstream('ec2-52-204-6-108.compute-1.amazonaws.com:6020').login()
// const ds = deepstream('ec2-52-204-6-108.compute-1.amazonaws.com:6020',{transports:['websocket']}).login();
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
