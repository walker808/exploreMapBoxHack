import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import MapGL from 'react-map-gl';
import React, { Component } from 'react';
import _ from 'lodash';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMapData, createMapPopUp } from '../actions/index';
import PopLayer from './pop_layer.js';

class BaseMap extends Component {

  constructor(props){
    super(props);
    this.loadMap = this.loadMap.bind(this);
    this.establishListners = this.establishListners.bind(this);
    // this.componentWillUpdate = this.componentWillUpdate.bind(this);
  }

  componentWillMount() {
    console.log("Fetching initial data");
    console.log("Initial state: ",this.props);
    this.props.fetchMapData();
    console.log("New State: ",this.props);
  }

  componentDidUpdate(){
    // console.log("Updating");
    // console.log(this.props.baseMap);
    // this.loadMap();
    console.log("Component updated");
    if (_.isEmpty(this.props.baseMap)){
      console.log("No map data yet.");
    }
    else {
      this.loadMap();
    }
  }

  componentDidMount(){
    console.log("It exists now.");
    console.log(this.props.baseMap);
    if (_.isEmpty(this.props.baseMap)){
      console.log("No map data yet.");
    }
    else {
      this.loadMap();
    }

    // this.props.fetchMapData();
  }

  establishListners(map, properties) {
    // properties holds our this.props so we can use the items bound to state.
    console.log(map);
    map.on('click', function(e) {
      console.log("clicked");
      console.log(e);
      console.log(properties);
      properties.createMapPopUp(map,e);
    //   var features = map.queryRenderedFeatures(e.point, { layers: ['eat','out','shop'] });
    //   if (!features.length) {
    //     return;
    // }
    // var feature = features[0];


// Dispatch an event to map update reducer.

// Populate the popup and set its coordinates
// based on the feature found.
// var popup = new mapboxgl.Popup()
//     .setLngLat(feature.geometry.coordinates)
//     .setHTML(feature.properties.description)
//     .addTo(map);
    });
  }


  loadMap() {
    const ACCESS_TOKEN = 'pk.eyJ1Ijoid2Fsa2VyODA4IiwiYSI6ImNpeW42OWRzZDAwMGYzdXBpdnRwaGMzOHgifQ.47wKrQ4cCSH3ZRJfIRq3FA';
    mapboxgl.accessToken = ACCESS_TOKEN;
    console.log("PROPS FOR MAP:", this.props);
    this.props.mapReference.map = new mapboxgl.Map({
      container: 'mapId',
      style: 'mapbox://styles/walker808/ciyn7e4fs007p2smg8m4vht1f',
      center: [-71.0589,42.3601], // starting position
      zoom: 9 // starting zoom
    })
    console.log('thismap:',this.props.mapReference.map);
    // const map = new mapboxgl.Map({
    //   container: 'mapId',
    //   style: 'mapbox://styles/walker808/ciyn7e4fs007p2smg8m4vht1f',
    //   center: [-71.0589,42.3601], // starting position
    //   zoom: 9 // starting zoom
    // })
    console.log(this.props.mapReference.map);
    this.establishListners(this.props.mapReference.map, this.props);
    // this.populateMap();
    // console.log("Map: ", this.props,baseMap);
    console.log("rendering map data", this.props);
    const mapData = this.props.baseMap;
    const localMap = this.props.mapReference.map;
        localMap.on('load', function () {
        // this.populateMap();
        console.log('MapData', mapData)
        _.forIn(mapData, function(value,key){
          console.log("Key of layer", key);
          console.log("Value of layer: ", value);
          localMap.addLayer(value);
        })

        // map.addLayer({
        //     "id": "points",
        //     "type": "symbol",
        //     "source": {
        //         "type": "geojson",
        //         "data": mapData.baseMap
        //     },
        //     "layout": {
        //         "icon-image": "{icon}-15",
        //         "text-field": "{title}",
        //         "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        //         "text-offset": [0, 0.6],
        //         "text-anchor": "top"
        //     }
        // });
    });
    // this.forceUpdate();
    // .setView([40, -74.50], 9);
  };

  render(){
    // this.loadMap();
    console.log('NEWEST PROPS', this.props);

    console.log("Map reference: ", this.props.mapReference.map);

    return(
      <div>
        <PopLayer/>
      </div>
    );
  };
}

function mapStateToProps({baseMap, mapReference}) {
  return { baseMap, mapReference }; // { weather } === {weather: weather}
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetching: fetchMapData }, dispatch);
// }

// export default connect(mapStateToProps)(BaseMap);

export default connect(mapStateToProps, { fetchMapData, createMapPopUp })(BaseMap);
