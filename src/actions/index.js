import axios from 'axios';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

export const FETCH_MAP_DATA = 'FETCH_MAP_DATA';
export const UPDATE_MAP_POPUP = 'UPDATE_MAP_POPUP';
export const DEEPSTREAM_MAP_POPUP = 'DEEPSTREAM_MAP_POPUP';

const ROOT_URL = 'http://ec2-52-204-6-108.compute-1.amazonaws.com:3000';
// const ROOT_URL = 'http://localhost:3000';
const MERCHANTS = '/merchants';
const PERSONAL = '/customers';

export function fetchMapData() {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  const request = axios.post(`${ROOT_URL}${PERSONAL}`, {
    "latitude":"42.3572855",
    "longitude": "-71.0534591"
  });

  return {
    type: FETCH_MAP_DATA,
    payload: request
  };
};

export function createMapPopUp(map, clickEvent) {
  var features = map.queryRenderedFeatures(clickEvent.point, { layers: ['eat','out','shop'] });
  if (!features.length) {
    // return;
    return {
      type: UPDATE_MAP_POPUP,
      payload: ""
    }
}
var feature = features[0];
console.log("Rendering popup...");
// var popup = new mapboxgl.Popup()
//     .setLngLat(feature.geometry.coordinates)
//     .setHTML(feature.properties.description)
//     .addTo(map);


  return {
    type: UPDATE_MAP_POPUP,
    payload: feature
  }
};

export function updateDeepstreamPopup(featureData) {
  return {
    type: DEEPSTREAM_MAP_POPUP,
    payload: featureData
  }
};
