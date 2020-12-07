import input from './input'

const getInput = () => input.split('\n')

const parseRules = (rules) => {
  const parsedRules = {}

  for (let i = 0; i < rules.length; i++) {
    const [rawParent, rawChildren] = rules[i].split('contain')
    const parent = rawParent.match(/^(.*?)bags/)[1].trim()
    const children = rawChildren.split(',').map((rawChild) => {
      const child = rawChild.match(/(\d)(.*?)bag/)
      const count = child ? parseInt(child[1].trim()) : 0
      const bag = child ? child[2].trim() : 'no other'
      return [count, bag]
    })

    parsedRules[parent] = {}

    for (const [count, bag] of children) {
      parsedRules[parent][bag] = count
    }
  }

  return parsedRules
}

const getColorsContainingGold = (rules) => {
  const uniqueBags = new Set()
  const queue = ['shiny gold']

  while (queue.length) {
    const currBag = queue.shift()

    for (const bag of Object.keys(rules)) {
      if (rules[bag][currBag]) {
        queue.push(bag)
        uniqueBags.add(bag)
      }
    }
  }

  return uniqueBags.size
}

const countTotalBags = (rules) => {
  const getCountFor = (bag) => {
    let totalCount = 0

    for (const [child, count] of Object.entries(rules[bag])) {
      if (child !== 'no other') {
        totalCount += count + getCountFor(child) * count
      }
    }

    return totalCount
  }

  return getCountFor('shiny gold')
}

const part1 = () => {
  const rules = parseRules(getInput())
  return `There are ${getColorsContainingGold(
    rules
  )} bags containing at least one shiny gold bag.`
}

const part2 = () => {
  const rules = parseRules(getInput())
  return `There are ${countTotalBags(rules)} total bags required.`
}

export default {
  part1,
  part2,
}
