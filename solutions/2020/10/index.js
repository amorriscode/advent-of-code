import input from './input'

const getInput = () => {
  const parsedInput = input
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b)

  parsedInput.unshift(0)
  parsedInput.push(parsedInput[parsedInput.length - 1] + 3)

  return parsedInput
}

const countDifferences = (input) => {
  const diffs = {}

  for (let i = 1; i < input.length; i++) {
    const diff = input[i] - input[i - 1]
    diffs[diff] = (diffs[diff] || 0) + 1
  }

  return diffs[1] * diffs[3]
}

const countDistinct = (input) => {
  const routes = {}

  routes[input[input.length - 1]] = 1

  for (let i = input.length - 2; i >= 0; i--) {
    routes[input[i]] = 0

    for (let j = i + 1; j < input.length && j <= i + 3; j++) {
      if (input[j] - input[i] <= 3) {
        routes[input[i]] += routes[input[j]]
      }
    }
  }

  return routes[0]
}

const part1 = () => {
  const adapters = getInput()
  return `The 1-jolt differences and 3-jolt differences multiplied is ${countDifferences(
    adapters
  )}`
}

const part2 = () => {
  const adapters = getInput()
  return `The number of distinct ways to connect the adapters is ${countDistinct(
    adapters
  )}`
}

export default {
  part1,
  part2,
}
