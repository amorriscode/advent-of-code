import input from './input'

const getInput = () =>
  input.split('\n').map((n) => {
    const split = n.match(/(\w)(\d+)/)
    return [split[1], parseInt(split[2])]
  })

const sailWithoutWaypoint = (instructions) => {
  const pos = [0, 0]
  let direction = 0

  const moveShip = (dir, value) => {
    switch (dir) {
      case 'N':
        pos[1] += value
        break
      case 'E':
        pos[0] += value
        break
      case 'S':
        pos[1] -= value
        break
      case 'W':
        pos[0] -= value
        break
      case 'F':
        if (direction === 0) pos[0] += value
        if (direction === 90) pos[1] -= value
        if (direction === 180) pos[0] -= value
        if (direction === 270) pos[1] += value
        break
      case 'R':
        direction = (360 + direction + value) % 360
        break
      case 'L':
        direction = (360 + direction - value) % 360
        break
    }
  }

  instructions.forEach(([dir, value]) => {
    moveShip(dir, value)
  })

  return Math.abs(pos[0]) + Math.abs(pos[1])
}

const sailWithWaypoint = (instructions) => {
  const pos = [0, 0]
  const waypoint = [10, 1]

  const moveWaypointAndShip = (dir, value) => {
    switch (dir) {
      case 'N':
        waypoint[1] += value
        break
      case 'E':
        waypoint[0] += value
        break
      case 'S':
        waypoint[1] -= value
        break
      case 'W':
        waypoint[0] -= value
        break
      case 'F':
        pos[0] += waypoint[0] * value
        pos[1] += waypoint[1] * value
        break
      case 'R':
        while (value > 0) {
          ;[waypoint[0], waypoint[1]] = [waypoint[1], -waypoint[0]]
          value -= 90
        }
        break
      case 'L':
        while (value > 0) {
          ;[waypoint[0], waypoint[1]] = [-waypoint[1], waypoint[0]]
          value -= 90
        }
        break
    }
  }

  instructions.forEach(([dir, value]) => {
    moveWaypointAndShip(dir, value)
  })

  return Math.abs(pos[0]) + Math.abs(pos[1])
}

const part1 = () => {
  const instructions = getInput()
  return `The Manhattan distance is ${sailWithoutWaypoint(instructions)}.`
}

const part2 = () => {
  const instructions = getInput()
  return `The Manhattan distance is ${sailWithWaypoint(instructions)}.`
}

export default {
  part1,
  part2,
}
