import input from './input'

const data = input.split('\n\n')

const parseRules = (rawRules) => {
  let parsedRules = {}

  rawRules.split('\n').forEach((rule) => {
    let [_, field, low1, low2, high1, high2] = rule.match(
      /(.*): (\d+)\-(\d+) or (\d+)\-(\d+)/
    )

    parsedRules[field] = {
      ranges: [
        [parseInt(low1), parseInt(low2)],
        [parseInt(high1), parseInt(high2)],
      ],
    }
  })

  return parsedRules
}

const isWithinRanges = (n, ranges) =>
  ranges.some(([low, high]) => n >= low && n <= high)

const isValidField = (fieldValue, rule) =>
  isWithinRanges(fieldValue, rule.ranges)

const isValidTicket = (ticket, rules) => {
  for (const fieldValue of ticket) {
    const isAnyValidField = Object.values(rules).some((rule) =>
      isValidField(fieldValue, rule)
    )

    if (!isAnyValidField) {
      return false
    }
  }

  return true
}

const parseTicket = (ticket) => ticket.split(',').map(Number)

const parseTickets = (tickets) =>
  tickets
    .split('\n')
    .slice(1)
    .map((ticket) => parseTicket(ticket))

const parseInput = (input) => {
  const [rules, ticket, tickets] = input

  return [parseRules(rules), ...parseTickets(ticket), parseTickets(tickets)]
}

const getTicketErrorRate = (input) => {
  let [rules, _, nearbyTickets] = parseInput(input)

  let answer = 0

  for (let ticket of nearbyTickets) {
    for (const fieldValue of ticket) {
      const isValidField = Object.values(rules).some((rule) =>
        isWithinRanges(fieldValue, rule.ranges)
      )

      if (!isValidField) {
        answer += fieldValue
      }
    }
  }

  return answer
}

const getMultipliedDepartueFields = (input) => {
  let [rules, myTicket, nearbyTickets] = parseInput(input)

  nearbyTickets = nearbyTickets.filter((ticket) => isValidTicket(ticket, rules))

  let fieldTypes = nearbyTickets[0].map((_) => Object.keys(rules))
  let knownFields = new Map()

  while (fieldTypes.some((fieldType) => fieldType.length > 1)) {
    fieldTypes = fieldTypes.map((possibleRules, index) => {
      if (possibleRules.length === 1) return possibleRules

      let validRules = nearbyTickets.map(
        (ticket) =>
          new Set(
            possibleRules.filter(
              (rule) =>
                !knownFields.has(rule) &&
                isValidField(ticket[index], rules[rule])
            )
          )
      )

      validRules = [
        ...validRules.reduce((a, b) => new Set([...a].filter((i) => b.has(i)))),
      ]

      if (validRules.length === 1) {
        knownFields.set(validRules[0], index)
      }

      return validRules
    })
  }

  let answer = 1

  ;[...knownFields.entries()].forEach(([field, index]) => {
    if (field.startsWith('departure')) {
      answer *= myTicket[index]
    }
  })

  return answer
}

const part1 = () => {
  return `The ticket scanning error rate is ${getTicketErrorRate(data)}.`
}

const part2 = () => {
  return `The departue fields multiplied are ${getMultipliedDepartueFields(
    data
  )}.`
}

export default {
  part1,
  part2,
}
