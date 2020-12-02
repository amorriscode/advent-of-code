import input from './input'

const getInput = () => input.split('\n')

const passwordValidator = (passwords, validate) => {
  let validCount = 0

  for (let i = 0; i < passwords.length; i++) {
    const [_, min, max, letter, password] = passwords[i].match(
      /(\d+)-(\d+) (\w)\: (\w+)/
    )

    validCount += validate({ min, max, letter, password })
  }

  return validCount
}

const countLetters = ({ min, max, letter, password }) => {
  let validCount = 0
  let letterCount = 0

  for (let j = 0; j < password.length; j++) {
    if (password[j] === letter) {
      letterCount++
    }
  }

  if (letterCount >= min && letterCount <= max) {
    validCount++
  }

  return validCount
}

const validatePositions = ({ min, max, letter, password }) => {
  let validCount = 0

  if ((password[min - 1] === letter) ^ (password[max - 1] === letter)) {
    validCount++
  }

  return validCount
}

const part1 = () => {
  const input = getInput()
  return passwordValidator(input, countLetters)
}

const part2 = () => {
  const input = getInput()
  return passwordValidator(input, validatePositions)
}

export default {
  part1,
  part2,
}
