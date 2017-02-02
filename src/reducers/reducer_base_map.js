import FETCH_MAP_DATA from '../actions/index';
import _ from 'lodash';
const initialState = {};
// const initialState = {
//         "type": "FeatureCollection",
//         "features": [{
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [-71.03238901390978, 42.913188059745586]
//             },
//             "properties": {
//                 "title": "Mapbox DC",
//                 "icon": "monument"
//             }
//         }, {
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [-122.414, 37.776]
//             },
//             "properties": {
//                 "title": "Mapbox SF",
//                 "icon": "harbor"
//             }
//         }]
//     };

// {
//   "eat": {
//     "Whole Foods Market": {
//       "lat": 42.360995,
//       "lng": -71.11393799999999
//     },
//     "Cosi": {
//       "lat": 42.3585157,
//       "lng": -71.0561717
//     }
//   },
//   "out": {
//     "Beacon Hill Hotel & Bistro": {
//       "lat": 42.3569241,
//       "lng": -71.0696907
//     },
//     "The Langham, Boston": {
//       "lat": 42.35648199999999,
//       "lng": -71.0545009
//     },
//     "Renaissance Boston Waterfront Hotel": {
//       "lat": 42.34804659999999,
//       "lng": -71.0390674
//     },
//     "Russell House Tavern": {
//       "lat": 42.3731082,
//       "lng": -71.1194276
//     },
//     "Del Frisco's Double Eagle Steak House": {
//       "lat": 42.348919,
//       "lng": -71.0384813
//     }
//   },
//   "shop": {
//     "Target": {
//       "lat": 42.3763916,
//       "lng": -71.0903828
//     },
//     "AT&T": {
//       "lat": 42.32368750000001,
//       "lng": -71.1662435
//     },
//     "Best Buy": {
//       "lat": 42.40347989999999,
//       "lng": -71.0680982
//     }
//   }
// }

const combineFeature = function(merchantName, properties, category) {
  console.log("merchant name: " + merchantName);
  console.log(JSON.stringify(properties));
  let result =
  {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          properties.lng,
          properties.lat
        ]
      },
      "properties": {
        "title": merchantName,
        "icon": category
      }
    };
    console.log("Returning result: " + JSON.stringify(result));
  return result;
};


export default function(state = initialState, action){

  // merchants: [{name: bob burgers,lat: 20, long:30,avgBill:30,dailyBillAverage: {}}]
  // merchants.map(merchant () => {
  //   {
  //     title: name,
  //     lat: 20,
  //     long: 30,
  //     avgBill: avgBill,
  //     dailyBillAverage: dailyBillAverage
  //   }
  // })
  // Always make sure we return a new state, never modify the existing state. If need to maintain previous state
  // add it to the new item being returned, do not modify it.
  switch (action.type){
    case 'FETCH_MAP_DATA':
    console.log("Retrieved action: ", action.type);
    console.log("Payload", action.payload.data);
    console.log("Result",JSON.stringify(action.payload.data));
    const layerCollection = [];
    _.forIn(action.payload.data, function(value, key){
      console.log("Value:", value);
      let category = 'harbor';
      // Key is the category
      // Value is the object of each merchant with their name, lat, lng.
      const merchants = [];
       _.forIn(value, function(value,key){
        console.log("Merchant name: ", key);
        console.log("Lat,Lng: ", value.lat, value.lng);
        merchants.push(combineFeature(key,value,category));
        // return {"Merchant Name": key};
      });
      console.log("Merchants", merchants);
      layerCollection.push({
        type: "FeatureCollection",
        features: merchants
      });
      console.log("Key: ", key);
    })
    console.log("layerCollection", layerCollection);
    // _.forIn(action.payload.data, function(value, key){
    //   console.log("Value:", value);
    //   // Key is the category
    //   // Value is the object of each merchant with their name, lat, lng.
    //   _.forIn(value, function(value,key){
    //     console.log("Merchant name: ", key);
    //     console.log("Lat,Lng: ", value.lat, value.lng);
    //     return {"Merchant Name": key};
    //   })
    //   console.log("Key: ", key);
    // })
      // return state.concat([action.payload.data]); //Below line is nearly identical using ES6 syntax
      // return action.payload.data; // [ city, city, city] NOT [city, [city, city]]
      return layerCollection[1];
  }
  console.log("Returning default");
  return state;
}
