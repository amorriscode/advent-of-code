import input from './input'

const getInput = () => input.split('\n').map((n) => n.split(''))

const getAdjacentOccupiedSeats = (seats, i, j) => {
  let adjacent = []

  if (i !== 0) {
    adjacent.push(seats[i - 1][j])
    adjacent.push(seats[i - 1][j + 1])
  }

  if (i !== 0 && j !== 0) {
    adjacent.push(seats[i - 1][j - 1])
  }

  if (i !== seats.length - 1) {
    adjacent.push(seats[i + 1][j])
  }

  if (j !== 0) {
    adjacent.push(seats[i][j - 1])
  }

  if (i !== seats.length - 1 && j !== seats[0].length - 1) {
    adjacent.push(seats[i + 1][j + 1])
  }

  if (i !== seats.length - 1 && j !== 0) {
    adjacent.push(seats[i + 1][j - 1])
  }

  if (j !== seats[0].length - 1) {
    adjacent.push(seats[i][j + 1])
  }

  return adjacent
    .filter(Boolean)
    .reduce((acc, curr) => (curr === '#' ? acc + 1 : acc), 0)
}

const getNonAdjacentOccupiedSeats = (seats, i, j) => {
  let adjacent = []

  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ]

  directions.forEach(({ x, y }) => {
    let row = i + y
    let col = j + x

    while (
      row >= 0 &&
      row < seats.length &&
      col >= 0 &&
      col < seats[0].length
    ) {
      const seat = seats[row][col]
      if (seat !== '.') {
        adjacent.push(seats[row][col])
        break
      }

      row += y
      col += x
    }
  })

  return adjacent
    .filter(Boolean)
    .reduce((acc, curr) => (curr === '#' ? acc + 1 : acc), 0)
}

const getOccupiedSeats = (input, adjacent = true) => {
  let seatChanged = true
  let seats = input.slice()

  while (seatChanged) {
    seatChanged = false

    const newSeats = Array.from(new Array(seats.length).fill(''), () =>
      new Array(seats[0].length).fill(0)
    )

    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < seats[0].length; j++) {
        const occupiedSeats = adjacent
          ? getAdjacentOccupiedSeats(seats, i, j)
          : getNonAdjacentOccupiedSeats(seats, i, j)

        if (seats[i][j] === 'L' && occupiedSeats === 0) {
          newSeats[i][j] = '#'
        } else if (seats[i][j] === '#' && occupiedSeats >= 5) {
          newSeats[i][j] = 'L'
        } else {
          newSeats[i][j] = seats[i][j]
        }
      }
    }

    if (JSON.stringify(seats) !== JSON.stringify(newSeats)) {
      seatChanged = true
      seats = newSeats
    }
  }

  let count = 0

  for (const row of seats) {
    count += row.reduce((acc, curr) => (curr === '#' ? acc + 1 : acc), 0)
  }

  return count
}

const part1 = () => {
  const seats = getInput()
  return `There are ${getOccupiedSeats(seats)} occupied seats.`
}

const part2 = () => {
  const seats = getInput()
  return `There are ${getOccupiedSeats(seats, false)} occupied seats.`
}

export default {
  part1,
  part2,
}
