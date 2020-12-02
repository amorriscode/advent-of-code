import input from './input'

const getInput = () => input.split('\n').map(Number)

const twoSum = (input) => {
  let sums = {}

  for (let i = 0; i < input.length; i++) {
    const lookingFor = 2020 - input[i]

    if (sums[input[i]]) {
      return input[i] * lookingFor
    }

    sums[lookingFor] = true
  }
}

const threeSum = (nums) => {
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]

      if (sum === 2020) {
        return nums[i] * nums[left] * nums[right]
      } else if (sum < 2020) {
        left++
      } else {
        right--
      }
    }
  }
}

const part1 = () => {
  const input = getInput()
  return `Multiplying the entries together gives you ${twoSum(input)}`
}

const part2 = () => {
  const input = getInput()
  return `Multiplying the entries together gives you ${threeSum(input)}`
}

export default {
  part1,
  part2,
}
