import { UPDATE_MAP_POPUP, DEEPSTREAM_MAP_POPUP }from '../actions/index';
import _ from 'lodash';
const initialState = {};

// This reducer tracks the state that establishes events on the map. Will communicate Clicks, Zooms, Etc.
var deepstream = require('deepstream.io-client-js')
const ds_client = deepstream('ec2-52-204-6-108.compute-1.amazonaws.com:6020').login()

export default function(state = initialState, action){
  console.log("Received event: ", action.type);

  switch (action.type){
    case UPDATE_MAP_POPUP:
      console.log("state should now be: ", action.payload);
      const record = ds_client.record.getRecord('mapPopup');
      record.whenReady(record => {
        record.set('currentPopup', action.payload);
        console.log('DEEPSTREAM RECORD:', record.get());

      });
      return state;
    case DEEPSTREAM_MAP_POPUP:
      return action.payload;
  }
  console.log("Returning default");
  return state;
};
