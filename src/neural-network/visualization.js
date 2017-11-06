import {visitNeurons} from "./layers"
import vis from 'vis'

export const getVisualizationData = (network) => {
  const nodesAndEdges = getNodesAndEdges(network)
  return {nodes: new vis.DataSet(nodesAndEdges.nodes), edges: new vis.DataSet(nodesAndEdges.edges)}
}

export const updateDataSets = (network, nodesDataSet = null, edgesDataSet = null) => {
  const nodesAndEdges = getNodesAndEdges(network)

  if (nodesDataSet) {
    nodesDataSet.update(nodesAndEdges.nodes)
  }

  if (edgesDataSet) {
    edgesDataSet.update(nodesAndEdges.edges)
  }
}

export const getNodesAndEdges = (network) => {
  const nodes = []
  const edges = []

  visitNeurons(network.layers, (neuron, layer) => {
    if (!neuron.isDrawn) {
      return;
    }

    const x = layer.id * 150;
    let y = neuron.counter * 30;

    if (layer.neurons.length > 50) {
      y = Math.round(neuron.counter / 20) * 30;
    }

    nodes.push({id: neuron.id, label: neuron.bias.toFixed(2).toString(), x: x, y: y, color: {border: layer.color, background: `rgba(0,255,0,${neuron.value})`}})

    console.log(layer.color)

    neuron.connections.forEach((connection) => {
      if (!connection.neuron.isDrawn) {
        return;
      }

      edges.push({id: `${connection.neuron.id}-${neuron.id}`, from: connection.neuron.id, to: neuron.id, color: {color: "gray"}, label: connection.weight.toFixed(2).toString()})
    })
  })

  return {nodes, edges}
}