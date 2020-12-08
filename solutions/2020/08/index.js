import input from './input'

const getInput = () =>
  input.split('\n').map((rawCode) => {
    const [_, op, value] = /(\w+) ([+-]\d+)/.exec(rawCode.trim())
    return [op, parseInt(value)]
  })

const executeProgram = (instructions, returnOnExecuted = false) => {
  let acc = 0
  let pos = 0
  const executed = new Set()

  while (returnOnExecuted || !executed.has(pos)) {
    executed.add(pos)

    const [op, value] = instructions[pos]

    switch (op) {
      case 'acc':
        acc += value
        pos = (pos + 1) % input.length
        break
      case 'jmp':
        pos = (pos + value) % input.length
        break
      case 'nop':
        pos = (pos + 1) % input.length
        break
    }

    if (
      (returnOnExecuted && executed.has(pos)) ||
      (!returnOnExecuted && pos >= instructions.length)
    ) {
      return acc
    }
  }
}

const repairProgram = (instructions) => {
  for (let i = 0; i < instructions.length; i++) {
    let temp = instructions[i][0]

    if (temp === 'acc') {
      continue
    }

    instructions[i][0] = temp === 'jmp' ? 'nop' : 'jmp'

    const programResults = executeProgram(instructions)
    if (programResults) return programResults

    instructions[i][0] = temp
  }
}

const part1 = () => {
  const instructions = getInput()
  return `The value in the accumulator is ${executeProgram(instructions, true)}`
}

const part2 = () => {
  const instructions = getInput()
  return `The value in the accumulator is ${repairProgram(instructions)}`
}

export default {
  part1,
  part2,
}
