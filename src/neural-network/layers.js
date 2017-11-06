export const initLayers = () => {
  return connectAllLayers([generateLayer(3), generateLayer(5), generateLayer(5), generateLayer(3)]);
}

export const initNetwork = () => {
  return {
    layers: initLayers()
  }
}

let neuronCounter = 0;
let layerCounter = 0;

const LAYER_COLORS = ["#1abc9c", "#e67e22", "#f39c12", "#c0392b", "#1abc9c"]

const generateLayer = (neuronsAmount) => {
  const layer = {
    id: ++layerCounter,
    neurons: [],
    color: LAYER_COLORS[layerCounter - 1],
    isInput: false,
    isOutput: false
  };
  let neuronCounterLayer = 0;

  for (let i = 0; i !== neuronsAmount; i++) {
    layer.neurons.push({
      id: ++neuronCounter,
      counter: ++neuronCounterLayer,
      value: 0,
      bias: 0,
      connections: [],
      isDrawn: (neuronsAmount < 50 || i % 20 === 0)
    })
  }

  return layer;
}

const connectAllLayers = (layerArray) => {
  for (let i = 0; i !== layerArray.length; i++) {
    if (layerArray[i + 1]) {
      connectTwoLayers(layerArray[i], layerArray[i + 1])
    }
  }

  layerArray[0].isInput = true;
  layerArray[layerArray.length - 1].isOutput = true;

  return layerArray
}

const connectTwoLayers = (layer1, layer2) => {
  for (let i = 0; i !== layer2.neurons.length; i++) {
    const innerNeuron = layer2.neurons[i];

    for (let j = 0; j !== layer1.neurons.length; j++) {
      const leftNeuron = layer1.neurons[j];
      innerNeuron.connections.push({
        neuron: leftNeuron,
        weight: (Math.random() - 0.5)
      })
    }
  }
}

export const visitNeurons = (layers, callback) => {
  if (!layers[0]) {
    layers = [layers]
  }

  for (let i = 0; i !== layers.length; i++) {
    for (let j = 0; j !== layers[i].neurons.length; j++) {
      callback(layers[i].neurons[j], layers[i])
    }
  }
}

export const inputLayer = (layers) => {
  return layers[0]
}

export const outputLayer = (layers) => {
  return layers[layers.length - 1]
}
