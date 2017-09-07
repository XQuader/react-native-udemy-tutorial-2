import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Main from './src';
import configureStore from './src/configureStore';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}