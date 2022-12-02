import colors from 'colors'

export default async (year, day, solutionsPromise, inputsPromise) => {
  // @TODO: Fix this jank
  const { part1, part2 } = await solutionsPromise
  const { getInput } = await inputsPromise

  console.log('                                       '.bgRed)

  console.log(
    `          ADVENT OF CODE ${year}          `.bold.brightRed.bgGreen
  )

  console.log('                                       '.bgRed)

  console.log('')

  console.log(`🎄🎄 DAY ${day} PART ONE 🎄🎄`.bold.green)
  console.log(`${await part1(parseInput(await getInput()))}\n`)

  console.log(`🎄🎄 DAY ${day} PART TWO 🎄🎄`.bold.green)
  console.log(await part2(parseInput(await getInput())))

  console.log('')

  console.log('                                       '.bgRed)
  console.log('                                       '.bgGreen)
  console.log('                                       '.bgRed)
}
