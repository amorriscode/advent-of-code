const { part1, part2 } = require('./index.js')
const dedent = require('dedent')

test('part1 passes examples', () => {
  expect(part1(dedent``.split('\n\n'))).toBe(0)
})

test('part2 passes examples', () => {})
