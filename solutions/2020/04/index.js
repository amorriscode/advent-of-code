import input from './input'

const fields = {
  byr: (input) => !!input.match(/^[0-9]{4}$/) && input >= 1920 && input <= 2002,
  iyr: (input) => !!input.match(/^[0-9]{4}$/) && input >= 2010 && input <= 2020,
  eyr: (input) => !!input.match(/^[0-9]{4}$/) && input >= 2020 && input <= 2030,
  hgt: (input) => {
    const num = input.slice(0, -2)
    const unit = input.slice(input.length - 2)

    if (unit === 'cm' && num >= 150 && num <= 193) return true
    if (unit === 'in' && num >= 59 && num <= 76) return true

    return false
  },
  hcl: (input) => !!input.match(/^#[a-z0-9]{6}$/),
  ecl: (input) =>
    input.length === 3 &&
    ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some((e) => e === input),
  pid: (input) => !!input.match(/^[0-9]{9}$/),
}

const getInput = () => input.split('\n\n').filter(Boolean)

const validatePassports = (passports, withValidator = false) => {
  let validPassports = 0

  for (let i = 0; i < passports.length; i++) {
    const passportFields = {}
    const passport = passports[i].replace(/\n/g, ' ').split(' ')

    for (const unparsedField of passport) {
      const [field, data] = unparsedField.split(':')
      passportFields[field] = data
    }

    let hasAllFields = true

    for (let [field, validator] of Object.entries(fields)) {
      if (field !== 'cid') {
        const hasField = passports[i].split(field).length - 1

        if (
          hasField !== 1 ||
          (withValidator && !validator(passportFields[field]))
        ) {
          hasAllFields = false
        }
      }
    }

    if (hasAllFields) {
      validPassports++
    }
  }

  return validPassports
}

const part1 = () => {
  const passports = getInput()
  return `There are ${validatePassports(passports)} valid passports.`
}

const part2 = () => {
  const passports = getInput()
  return `There are ${validatePassports(passports, true)} valid passports.`
}

export default {
  part1,
  part2,
}
