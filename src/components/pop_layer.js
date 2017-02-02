import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import MapGL from 'react-map-gl';
import React, { Component } from 'react';
import _ from 'lodash';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMapData, createMapPopUp, updateDeepstreamPopup } from '../actions/index';
var deepstream = require('deepstream.io-client-js')
const ds_client = deepstream('ec2-52-204-6-108.compute-1.amazonaws.com:6020').login()

 class PopLayer extends Component {
  constructor(props){
    super(props);
    this.updatePopup = this.updatePopup.bind(this);
    // this.componentWillUpdate = this.componentWillUpdate.bind(this);
  };

  updatePopup(data) {
    // Update the redux state here.
    console.log("Updating redux...");
    console.log("Daata: ", data);
    this.props.updateDeepstreamPopup(data.currentPopup);
  };

  componentDidMount() {
    this.listenForDeepstream();
  };

  listenForDeepstream() {
    const record = ds_client.record.getRecord('mapPopup');
    console.log("Subscribing");
    record.whenReady(record => {
      record.subscribe(this.updatePopup, true);
    });

    // console.log('<<< MESSAGE ID: ', message);
    // this.record = App.ds.record.getRecord(message);
    // this.record.whenReady( function() {
    //     setTimeout(function () {
    //         this.setState(this.record.get() );
    //     }.bind(this), 250);
    // }.bind( this ));

  }

  loadMapReference() {
    // const map = new mapboxgl.Map({
    //   container: 'mapId'
    // });
    // console.log("Map pulled", map);
    // console.log("Actually adding popup to map", this.props.map.map);
    console.log("Using redux reference of map instead of passed one.", this.props.mapReference.map)
    console.log("Properties of the item clicked...", this.props.updateMap.properties.avgBill);
    console.log("Existing popup", popup);
    var popup = new mapboxgl.Popup()
        .setLngLat(this.props.updateMap.geometry.coordinates)
        // .setHTML(this.props.updateMap.properties.avgBill)
        .setHTML(`<div className='popup'>Average Bill: $${this.props.updateMap.properties.avgBill}</div>`)
        .addTo(this.props.mapReference.map);
  };
  // this.loadMapReference();

  render(){
    // this.loadMap();

      console.log("Rendering pop layer with props: ", this.props);

      if(_.isEmpty(this.props.updateMap)){
        // this.loadMapReference();
      return(
          <div></div>
      );
    }
    else{
      this.loadMapReference();
      return (<div> </div>);
    }
  };
};

function mapStateToProps({updateMap, mapReference}) {
return { updateMap, mapReference }; // { weather } === {weather: weather}
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetching: fetchMapData }, dispatch);
// }

// export default connect(mapStateToProps)(BaseMap);

export default connect(mapStateToProps, { createMapPopUp, updateDeepstreamPopup })(PopLayer);
