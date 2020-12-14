import input from './input'

const getInput = () => input.split('\n').map((row) => row.split(' = '))

const run = (input) => {
  let mask
  let sum = 0
  let mem = new Map()

  for (const [address, value] of input) {
    if (address === 'mask') {
      mask = value
      continue
    }

    const memoryAddress = address.match(/\d+/)[0]
    const binaryString = (value >>> 0).toString(2).padStart(36, 0).split('')

    for (let j = 0; j < mask.length; j++) {
      if (mask[j] !== 'X') {
        binaryString[j] = mask[j]
      }
    }

    mem.set(memoryAddress, parseInt(binaryString.join(''), 2))
  }

  mem.forEach((value) => (sum += value))

  return sum
}

const run2 = (input) => {
  let mask
  let mem = new Map()

  for (const [address, value] of input) {
    if (address === 'mask') {
      mask = value
      continue
    }

    let xCounter = 0
    let memoryAddresses = []
    let memoryAddress = address.match(/\d+/)[0]
    memoryAddress = (memoryAddress >>> 0).toString(2).padStart(36, 0).split('')

    for (let j = 0; j < mask.length; j++) {
      if (mask[j] === 'X') {
        xCounter++
        memoryAddress[j] = 'X'
        continue
      }

      memoryAddress[j] = memoryAddress[j] === '1' || mask[j] === '1' ? '1' : '0'
    }

    const replaceXWith = []
    for (let j = 0; j < 2 ** xCounter; j++) {
      replaceXWith.push((j >>> 0).toString(2).padStart(xCounter, 0))
    }

    for (const digits of replaceXWith) {
      const bits = digits.split('')

      let address = memoryAddress.join('')
      for (const bit of bits) {
        address = address.replace('X', bit)
      }

      memoryAddresses.push(address)
    }

    for (const address of memoryAddresses) {
      mem.set(parseInt(address, 2), parseInt(value))
    }
  }

  let sum = 0

  mem.forEach((val) => (sum += val))

  return sum
}

const part1 = () => {
  const getMemorySum = getInput()
  return `The sum of all values in memory is ${run(getMemorySum)}.`
}

const part2 = () => {
  const getMemorySum = getInput()
  return `The sum of all values in memory is ${run2(getMemorySum)}.`
}

export default {
  part1,
  part2,
}
