import solve from './solve';

// Import the days
import dayOne from './01/index';
import dayTwo from './02/index';

const solutions = {
    1: dayOne,
    2: dayTwo,
}

const dayToSolve = process.argv[2];

solve(solutions[dayToSolve]);
