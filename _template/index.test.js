const { inputParser, part1, part2 } = require('./index.js')
const dedent = require('dedent')

test('part1 passes examples', () => {
  expect(part1(inputParser(dedent``))).toBe(0)
})

test('part2 passes examples', () => {
  expect(part2(inputParser(dedent``))).toBe(0)
})
