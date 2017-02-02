import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import MapGL from 'react-map-gl';
import React, { Component } from 'react';
import _ from 'lodash';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMapData } from '../actions/index';

class BaseMap extends Component {

  constructor(props){
    super(props);

    this.loadMap = this.loadMap.bind(this);
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


  loadMap() {
    const ACCESS_TOKEN = 'pk.eyJ1Ijoid2Fsa2VyODA4IiwiYSI6ImNpeW42OWRzZDAwMGYzdXBpdnRwaGMzOHgifQ.47wKrQ4cCSH3ZRJfIRq3FA';
    mapboxgl.accessToken = ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: 'mapId',
      // style: 'mapbox://styles/walker808/ciyn7e4fs007p2smg8m4vht1f',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-71.0589,42.3601], // starting position
      zoom: 9 // starting zoom
    })
    // this.populateMap();
    // console.log("Map: ", this.props,baseMap);
    console.log("rendering map data", this.props);
    const mapData = this.props.baseMap;
        map.on('load', function () {
        // this.populateMap();
        console.log('MapData', mapData)
        _.forIn(mapData, function(value,key){
          console.log("Key of layer", key);
          console.log("Value of layer: ", value);
          map.addLayer(value);
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
    // .setView([40, -74.50], 9);
  };

  render(){
    // this.loadMap();
    console.log(this.props.baseMap);
    return(
      <div id="mapId"></div>
    );
  };
}

function mapStateToProps({baseMap}) {
  return { baseMap }; // { weather } === {weather: weather}
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetching: fetchMapData }, dispatch);
// }

// export default connect(mapStateToProps)(BaseMap);

export default connect(mapStateToProps, { fetchMapData })(BaseMap);
