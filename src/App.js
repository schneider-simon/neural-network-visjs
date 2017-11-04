import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import vis from 'vis'
import {initNetwork} from "./neural-network/layers"
import {getVisualizationData} from "./neural-network/visualization"

class App extends Component {
  componentDidMount() {
    const network = initNetwork();

    console.log(network)

    const container = document.getElementById('network')
    const data = getVisualizationData(network);

    console.log(data)

    const options = {
      physics: false,
      edges: {
        width: 0.5,
        arrows: {
          to: {enabled: true, scaleFactor: 0, type: 'arrow'},
        },
      }
    }
    const visNetwork = new vis.Network(container, data, options)
  }

  render() {
    return (
      <div className="App">
        <h1>Neural network</h1>
        <div id="network"/>
      </div>
    );
  }
}

export default App;
