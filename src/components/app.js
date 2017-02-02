import React, { Component } from 'react';
import BaseMap from './base_map';
// import PopLayer from './pop_layer';

export default class App extends Component {
  render() {
    return (
      <div>
        <div id="mapId"></div>
        <BaseMap/>
      </div>
    );
  }
}
