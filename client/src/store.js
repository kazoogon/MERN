import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //(default)window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //to fix error "Cannot read property 'apply' of undefined"
    //https://kdcinfo.blogspot.com/2018/04/typeerror-undefined-redux-4.html
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  )
);

export default store;
