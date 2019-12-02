import solve from './solve';

// Import the days
import dayOne from './01/index';
import dayTwo from './02/index';

const solutions = {
    '01': dayOne,
    '02': dayTwo,
}

const dayToSolve = process.argv[2];

solve(solutions[dayToSolve]);
