import input from './input'

const getInput = () => input.split(',')

const run = (input, n) => {
  let prev = input[input.length - 1]
  const lastSpoken = new Array(n)

  input.forEach((v, i) => (lastSpoken[v] = i + 1))

  for (let i = input.length; i < n; i++) {
    const next = lastSpoken[prev] ? i - lastSpoken[prev] : 0
    lastSpoken[prev] = i
    prev = next
  }

  return prev
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
