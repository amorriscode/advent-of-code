import fs from 'fs'
import solve from './solve'

const year = process.argv[2]
const dayToSolve = process.argv[3]

const days = []
const solutions = {}

try {
  const files = fs.readdirSync(`./${year}`)

  files.forEach((file) => {
    if (file !== '_template') {
      days.push(file)
    }
  })
} catch (err) {
  console.log(`Failed to read days from ${year}: ${err}`)
}

days.forEach((day) => {
  solutions[day] = import(`./${year}/${day}/index.js`)
})

solve(solutions[dayToSolve])
