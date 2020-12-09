import input from './input'

const getInput = () => input.split('\n').map(Number)

const twoSum = (input, search) => {
  let sums = {}

  for (let i = 0; i < input.length; i++) {
    const lookingFor = search - input[i]

    if (sums[input[i]]) {
      return true
    }

    sums[lookingFor] = true
  }

  return false
}

const decryptXMAS = (input, findInvalidNumber = false) => {
  let start = 0
  let invalidNumber = -Infinity

  for (let i = 25; i < input.length; i++) {
    const isTwoSum = twoSum(input.slice(start, i), input[i])

    if (!isTwoSum) {
      invalidNumber = input[i]

      if (findInvalidNumber) {
        return invalidNumber
      }

      break
    }

    start++
  }

  let low = 0
  let high = 0
  let sum = input[0]

  while (low < input.length - 1 && high < input.length) {
    if (sum === invalidNumber) {
      const range = input.slice(low, high + 1)
      return Math.min(...range) + Math.max(...range)
    }

    if (sum < invalidNumber) {
      high++
      sum += input[high]
    } else {
      sum -= input[low]
      low++
    }
  }
}

const part1 = () => {
  const input = getInput()
  return `The invalid number is ${decryptXMAS(input, true)}`
}

const part2 = () => {
  const input = getInput()
  return `The encryption weakness is ${decryptXMAS(input)}`
}

export default {
  part1,
  part2,
}
