import fs from 'fs'
import solve from './solve'

const year = process.argv[2]
const dayToSolve = process.argv[3]

const days = []
const solutions = {}

try {
  const files = fs.readdirSync(`./solutions/${year}`)

  files.forEach((file) => {
    days.push(file)
  })
} catch (err) {
  console.log(`Failed to read days from ${year}: ${err}`)
}

days.forEach(async (day) => {
  solutions[day] = import(`./solutions/${year}/${day}/index.js`)
})

solve(year, dayToSolve, solutions[dayToSolve])
