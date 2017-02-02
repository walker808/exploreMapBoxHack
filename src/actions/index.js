import axios from 'axios';

export const FETCH_MAP_DATA = 'FETCH_MAP_DATA';

const ROOT_URL = 'http://ec2-52-204-6-108.compute-1.amazonaws.com:3000';
const MERCHANTS = '/merchants';

export function fetchMapData() {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  const request = axios.post(`${ROOT_URL}${MERCHANTS}`, {
    "latitude":"42.3572855",
    "longitude": "-71.0534591"
  });

  return {
    type: FETCH_MAP_DATA,
    payload: request
  };
};
