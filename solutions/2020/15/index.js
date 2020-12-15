import input from './input'

const getInput = () => input.split(',')

const run = (input, n) => {
  const nums = {}

  let prev

  const updatePrev = (lookingFor, i) => {
    if (nums[lookingFor]) {
      nums[lookingFor].push(i)
      prev = i - nums[lookingFor][nums[lookingFor].length - 2]
    } else {
      nums[lookingFor] = [i]
      prev = 0
    }
  }

  for (let i = 0; i < input.length; i++) {
    updatePrev(input[i], i + 1)
  }

  for (let i = input.length + 1; i <= n; i++) {
    if (i === n) {
      return prev
    }

    updatePrev(prev, i)
  }
}

const part1 = () => {
  const input = getInput()
  return `The 2020th number spoken was ${run(input, 2020)}`
}

const part2 = () => {
  const input = getInput()
  return `The 30000000th number spoken was ${run(input, 30000000)}`
}

export default {
  part1,
  part2,
}
