import { UPDATE_MAP_POPUP }from '../actions/index';
import _ from 'lodash';
const initialState = {};

// This reducer tracks the state that establishes events on the map. Will communicate Clicks, Zooms, Etc.

export default function(state = initialState, action){
  console.log("MAP CHANGED: ", action.type);

  // switch (action.type){
  //
  //   case UPDATE_MAP_POPUP:
  //     console.log("state should now be: ", action.payload);
  //     return action.payload;
  // }

  console.log("Returning default");
  return state;
};
