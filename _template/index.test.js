const { parseInput, part1, part2 } = require('./index.js')
const { getExampleInput, getInput } = require('./input.js')

test('part 1 example', async () => {
  expect(part1(parseInput(await getExampleInput()))).toBe(0)
})

test('part 1 data', async () => {
  expect(part1(parseInput(await getInput()))).toBe(0)
})

test('part 2 example', async () => {
  expect(part2(parseInput(await getExampleInput()))).toBe(0)
})

test('part 2 data', async () => {
  expect(part2(parseInput(await getInput()))).toBe(0)
})
