import solve from './solve'

// Import the days (TODO: make this automatic)
import dayOne from './01/index'

const solutions = {
  '01': dayOne,
}

const dayToSolve = process.argv[2]

solve(solutions[dayToSolve])
