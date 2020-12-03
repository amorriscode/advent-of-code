import input from './input'

const getInput = () => input.split('\n').map((row) => row.split(''))

const treeCounter = (map, slopeX, slopeY) => {
  let x = 0
  let trees = 0

  for (let y = slopeY; y < map.length; y += slopeY) {
    x = (x + slopeX) % map[0].length

    if (map[y][x] === '#') {
      trees++
    }
  }

  return trees
}

const part1 = () => {
  const input = getInput()
  return `You would encounter ${treeCounter(input, 3, 1)} trees. 🎄`
}

const part2 = () => {
  const input = getInput()

  let totalTrees = 1

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]

  for (const [slopeX, slopeY] of slopes) {
    totalTrees *= treeCounter(input, slopeX, slopeY)
  }

  return `You would encounter ${totalTrees} trees. 🎄`
}

export default {
  part1,
  part2,
}
