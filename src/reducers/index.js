import { combineReducers } from 'redux';
import baseMapReducer from './reducer_base_map'
import updateMapReducer from './reducer_update_map';
import mapReferenceReducer from './reducer_map_reference';

const rootReducer = combineReducers({
  baseMap: baseMapReducer,
  updateMap: updateMapReducer,
  mapReference: mapReferenceReducer
});

export default rootReducer;
