import input from './input'

const getInput = () => input.split('\n\n')

const collectAnswers = (groups, requireAll) => {
  let questionsCount = 0

  for (let group of groups) {
    if (requireAll) {
      const questionsAnswered = group
        .split('\n')
        .map((person) => new Set(person))
        .reduce((a, b) => new Set([...a].filter((i) => b.has(i))))
      questionsCount += questionsAnswered.size
    } else {
      let questionsAnswered = new Set(group.replace(new RegExp('\n', 'g'), ''))
      questionsCount += questionsAnswered.size
    }
  }

  return questionsCount
}

const part1 = () => {
  const declarationForms = getInput()
  return `The sum of questions answered by is ${collectAnswers(
    declarationForms
  )}.`
}

const part2 = () => {
  const declarationForms = getInput()
  return `The sum of questions answered by everyone is ${collectAnswers(
    declarationForms,
    true
  )}.`
}

export default {
  part1,
  part2,
}
