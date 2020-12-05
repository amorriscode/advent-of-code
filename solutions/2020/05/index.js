import input from './input'

const getInput = () => input.split('\n')

const binarySearch = (seats, separator, startMin, startMax) => {
  let pointer = 0
  let min = startMin
  let max = startMax

  while (min < max) {
    const mid = min + Math.floor((max - min) / 2)

    if (seats[pointer] === separator) {
      max = mid
    } else {
      min = mid + 1
    }

    pointer++
  }

  return min
}

const getSeatIds = (seats) => {
  const seatIds = []
  let maxSeatId = -Infinity
  let mySeatId = 0

  for (let i = 0; i < seats.length; i++) {
    const seat = seats[i]
    const rows = seat.slice(0, 7)
    const cols = seat.slice(-3)

    const row = binarySearch(rows, 'F', 0, 127)
    const col = binarySearch(cols, 'L', 0, 7)

    const seatId = row * 8 + col
    maxSeatId = Math.max(maxSeatId, seatId)
    seatIds.push(seatId)
  }

  seatIds.sort((a, b) => a - b)

  for (let i = 1; i < seatIds.length; i++) {
    if (seatIds[i - 1] !== seatIds[i] - 1) {
      mySeatId = seatIds[i - 1] + 1
    }
  }

  return [maxSeatId, mySeatId]
}

const part1 = () => {
  const seats = getInput()
  const [maxSeatId] = getSeatIds(seats)
  return `The max seat ID is ${maxSeatId}.`
}

const part2 = () => {
  const seats = getInput()
  const [_, mySeatId] = getSeatIds(seats)
  return `My seat ID is ${mySeatId}.`
}

export default {
  part1,
  part2,
}
