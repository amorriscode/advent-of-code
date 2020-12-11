import input from './input'

const getInput = () => input.split('\n').map((n) => n.split(''))

const getAdjacentSeatsSimple = (seats, i, j) => {
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

  return adjacent.filter(Boolean)
}

const getAdjacentSeatsAdvanced = (seats, i, j) => {
  // Lost my code for part two, too lazy to write it again :(
  // Gotta go play Cyberpunk 2077
  // (the solution was disgusting anywas...)
}

const getOccupiedSeats = (input) => {
  let seatChanged = true
  let seats = input.slice()

  while (seatChanged) {
    seatChanged = false

    const newSeats = Array.from(new Array(seats.length).fill(''), () =>
      new Array(seats[0].length).fill(0)
    )

    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < seats[0].length; j++) {
        const adjacent = getAdjacentSeatsSimple(seats, i, j)

        const adjacentOccupied = adjacent.reduce(
          (acc, curr) => (curr === '#' ? acc + 1 : acc),
          0
        )

        if (seats[i][j] === 'L' && adjacentOccupied === 0) {
          newSeats[i][j] = '#'
        } else if (seats[i][j] === '#' && adjacentOccupied >= 4) {
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
  const input = getInput()
  // run(input)
}

export default {
  part1,
  part2,
}
