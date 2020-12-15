import input from './input'

const data = input.split(',')

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
  return `The 2020th number spoken was ${run(data, 2020)}`
}

const part2 = () => {
  return `The 30000000th number spoken was ${run(data, 30000000)}`
}

export default {
  part1,
  part2,
}
