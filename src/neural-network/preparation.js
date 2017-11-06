export const prepareTestData = (data) => {
  const statistics = data.reduce((statistics, tuple) => {
    Object.keys(tuple).map((key) => {
      if (key === "label") {
        if (statistics.labels.indexOf(key) === -1) {
          statistics.labels.push(tuple.label)
        }
        return
      }

      if (statistics.min[key] === undefined || statistics.min[key] > tuple[key]) {
        statistics.min[key] = tuple[key]
      }

      if (statistics.max[key] === undefined || statistics.max[key] < tuple[key]) {
        statistics.max[key] = tuple[key]
      }

      if (statistics.sum[key] === undefined) {
        statistics.sum[key] = 0;
        statistics.count[key] = 0;
      }

      statistics.sum[key] += tuple[key]
      statistics.count[key]++;
    })

    return statistics
  }, {min: {}, max: {}, sum: {}, count: {}, labels: []})

  return data.map(tuple => {
    const tupleData = Object.assign({}, tuple)
    delete tupleData.label

    const tupleDataArray = Object.keys(tupleData).map((key) => {
      const value = tupleData[key]
      return (value - statistics.min[key]) / (statistics.max[key] - statistics.min[key])
    })

    return {
      data: tupleDataArray,
      label: {name: tuple.label, id: statistics.labels.indexOf(tuple.label) + 1},
      _original: tuple
    }
  })
}