import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  if (module.hot) {
    function hotCallback() {
      const nextReducer = require('./reducers/index').default;
      store.replaceReducer(nextReducer);
    }

    module.hot.accept('./reducers/index', hotCallback);
    module.hot.acceptCallback = hotCallback;
  }

  const reducers = require('./reducers/index').default;
  const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));
  return store;
}