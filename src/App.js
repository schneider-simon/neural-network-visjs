import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import vis from 'vis'
import {initNetwork} from "./neural-network/layers"
import {getVisualizationData, updateDataSets} from "./neural-network/visualization"
import {propagateForward} from "./neural-network/propagation"
import {prepareTestData} from "./neural-network/preparation"

class App extends Component {
  componentDidMount() {
    const network = initNetwork();

    console.log(network)
    const testData = prepareTestData(require("./iris.json"))

    const container = document.getElementById('network')
    const data = getVisualizationData(network);

    let i = 0;
    setInterval(() => {
      if (i > 10) {
        return
      }

      propagateForward(network, testData[i++])
      updateDataSets(network, data.nodes)
      console.log(i)
    }, 500)

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
