import input from './input'

const data = input.split('\n\n')

const parseInput = (input, part2 = false) => {
  let [rules, messages] = input

  if (part2) {
    rules = rules
      .replace('8: 42', '8: 42 +')
      .replace(
        '11: 42 31',
        '11: 42 {1} 31 {1} | 42 {2} 31 {2} | 42 {3} 31 {3} | 42 {4} 31 {4} | 42 {5} 31 {5} | 42 {6} 31 {6}'
      )
  }

  return [
    new Map(rules.split('\n').map((rule) => rule.split(': '))),
    messages.split('\n'),
  ]
}

const parseRegex = (rules) => {
  let pattern = rules.get('0')

  while (pattern.match(/\d+(?!})/)) {
    pattern = pattern.replace(/\d+(?!})/g, (rule) => `( ${rules.get(rule)} )`)
  }

  pattern = pattern.replace(/ /g, '').replace(/\("([^"]*)"\)/g, '$1')

  return new RegExp(`^${pattern}$`)
}

export const part1 = (input = data) => {
  const [rules, messages] = parseInput(input)
  const regEx = parseRegex(rules)
  return messages.filter((message) => message.match(regEx)).length
}

export const part2 = (input = data) => {
  const [rules, messages] = parseInput(input, true)
  const regEx = parseRegex(rules)
  return messages.filter((message) => message.match(regEx)).length
}

export default {
  part1,
  part2,
}
