import {visitNeurons} from "./layers"
export const propagateForward = (network, dataSet) => {
  const inputs = dataSet.data

  visitNeurons(network.layers, (neuron, layer) => {
    if (layer.id === 1) {
      neuron.value = sigmoid(inputs[neuron.counter - 1])
      console.log(neuron.value)
      return
    }

    const activationWeightedSum = neuron.connections.reduce((sum, connection) => {
      return sum + connection.weight * connection.neuron.value
    }, 0)

    neuron.value = sigmoid(activationWeightedSum - neuron.bias)

    console.log(layer.id, ".", neuron.counter, ":", neuron.value, dataSet)

    if (layer.isOutput) {
      const expected = (neuron.counter === dataSet.label.id) ? 1 : 0
      const deviation = neuron.value - expected
      const error = Math.pow(neuron.value - expected, 2) * 0.5
      console.log(expected, deviation, error)
    }
  })
}

export const sigmoid = (value) => {
  return 1 / (1 + Math.pow(Math.E, -value));
}