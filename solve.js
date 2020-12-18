import colors from 'colors'

export default async (year, day, solutionsPromise) => {
  // @TODO: Fix this jank
  const resolvedSolutions = await solutionsPromise
  const solutions = resolvedSolutions.default

  console.log('                                       '.bgRed)

  console.log(
    `          ADVENT OF CODE ${year}          `.bold.brightRed.bgGreen
  )

  console.log('                                       '.bgRed)

  console.log('')

  console.log(`🎄🎄 DAY ${day} PART ONE 🎄🎄`.bold.green)
  console.log(`${await solutions.part1()}\n`)

  console.log(`🎄🎄 DAY ${day} PART TWO 🎄🎄`.bold.green)
  console.log(await solutions.part2())

  console.log('')

  console.log('                                       '.bgRed)
  console.log('                                       '.bgGreen)
  console.log('                                       '.bgRed)
}
