import { combineReducers } from 'redux';
import baseMapReducer from './reducer_base_map'

const rootReducer = combineReducers({
  baseMap: baseMapReducer
});

export default rootReducer;
