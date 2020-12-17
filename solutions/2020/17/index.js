import input from './input'

const data = input.split('\n').map((row) => row.split(''))

const cycle = (grid, fourDimensions = false) => {
  let newGrid = {}

  const gridKeys = Object.keys(grid).map((key) => key.split(','))

  let minX = Infinity
  let maxX = -Infinity

  let minY = Infinity
  let maxY = -Infinity

  let minZ = Infinity
  let maxZ = -Infinity

  let minQ = Infinity
  let maxQ = -Infinity

  gridKeys.forEach((key) => {
    const [x, y, z, q] = key

    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
    minZ = Math.min(minZ, z)
    maxZ = Math.max(maxZ, z)
    minQ = Math.min(minQ, q)
    maxQ = Math.max(maxQ, q)
  })

  for (let x = minX - 1; x < maxX + 2; x++) {
    for (let y = minY - 1; y < maxY + 2; y++) {
      for (let z = minZ - 1; z < maxZ + 2; z++) {
        for (
          let q = fourDimensions ? minQ - 1 : 0;
          q < (fourDimensions ? maxQ + 2 : 1);
          q++
        ) {
          const cube = grid[`${x},${y},${z},${q}`] || false
          let neighbour = 0

          for (const dx of [-1, 0, 1]) {
            for (const dy of [-1, 0, 1]) {
              for (const dz of [-1, 0, 1]) {
                for (const dq of [-1, 0, 1]) {
                  if (dx === dy && dy === dz && dz === dq && dq === 0) {
                    continue
                  }

                  const neighbourCube =
                    grid[`${x + dx},${y + dy},${z + dz},${q + dq}`] || false
                  if (neighbourCube) {
                    neighbour++
                  }
                }
              }
            }
          }
          if (
            (cube && [2, 3].includes(neighbour)) ||
            (!cube && neighbour === 3)
          ) {
            newGrid[`${x},${y},${z},${q}`] = true
          }
        }
      }
    }
  }

  return newGrid
}

const getActiveCubes = (input, fourDimensions = false) => {
  let grid = {}

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === '#') {
        grid[`${x},${y},0,0`] = true
      }
    }
  }

  for (let i = 0; i < 6; i++) {
    grid = cycle(grid, fourDimensions)
  }

  return Object.values(grid).reduce((acc, curr) => acc + curr)
}

const part1 = () => {
  return `There are ${getActiveCubes(
    data
  )} active cubes after six cycles in three dimensions.`
}

const part2 = () => {
  return `There are ${getActiveCubes(
    data,
    true
  )} active cubes after six cycles in four dimensions.`
}

export default {
  part1,
  part2,
}
