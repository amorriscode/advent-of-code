import input from './input'

const getInput = () => input.split('\n')

const parseRules = (rules) => {
  const parsedRules = {}

  for (let i = 0; i < rules.length; i++) {
    const [rawParent, children] = rules[i].split('contain')
    const parent = rawParent.match(/^(.*?)bags/)[1].trim()

    parsedRules[parent] = {}

    children.split(',').forEach((rawChild) => {
      const child = rawChild.match(/(\d)(.*?)bag/)

      if (child) {
        const bag = child[2].trim()
        const count = parseInt(child[1].trim())
        parsedRules[parent][bag] = count
      }
    })
  }

  return parsedRules
}

const getColorsContainingGold = (rules) => {
  const uniqueBags = new Set()
  const stack = ['shiny gold']

  while (stack.length) {
    const currBag = stack.pop()

    for (const [bag, bagRules] of Object.entries(rules)) {
      if (bagRules[currBag]) {
        stack.push(bag)
        uniqueBags.add(bag)
      }
    }
  }

  return uniqueBags.size
}

const countTotalBags = (rules) => {
  const getBagCount = (bag) => {
    let totalCount = 0

    for (const [child, count] of Object.entries(rules[bag])) {
      totalCount += count + getBagCount(child) * count
    }

    return totalCount
  }

  return getBagCount('shiny gold')
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
