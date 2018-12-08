import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dapi from './components/dapi';

const rootReducer = combineReducers({
  routing: routerReducer,
  dapi,
});

export default rootReducer;
