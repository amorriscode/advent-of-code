import input from './input';

const getInput = () => input.split('\n');

const dir = {
    U: [0, 1],
    D: [0, -1],
    L: [-1, 0],
    R: [1, 0],
};

const run = (input) => {
    const visitedLocs = new Map();

    let currLoc = [0,0];
    let steps = 0;

    input.split(',').forEach(loc => {
        const direction = loc[0];
        const [x, y] = dir[direction];
        const amountToMove = loc.slice(1);
        for (let i = 0; i < amountToMove; i++) {
            const locExists = visitedLocs.get(`${currLoc[0]},${currLoc[1]}`);
            if (locExists) {
                visitedLocs.set(`${currLoc[0]},${currLoc[1]}`, steps)
            } else if (currLoc[0] !== 0 && currLoc[1] !== 0) {
                visitedLocs.set(`${currLoc[0]},${currLoc[1]}`, steps);
            }
            currLoc[0] += x;
            currLoc[1] += y;
            steps++;
        }
    });

    return visitedLocs;
};

const part1 = () => {
    const input = getInput();

    const wireOne = input[0];
    const wireTwo = input[1];

    const wireOnePos = run(wireOne);
    const wireTwoPos = run(wireTwo);

    const shortestDistance = [...wireTwoPos.keys()]
        .filter(pos => wireOnePos.has(pos))
        .map(pos => pos.split(','))
        .map(([x, y]) => Math.abs(x) + Math.abs(y))
        .sort((a, b) => a - b);

    return `The shortest distance was ${shortestDistance[0]}.`;
}

const part2 = () => {
    const input = getInput();

    const wireOne = input[0];
    const wireTwo = input[1];

    const wireOnePos = run(wireOne);
    const wireTwoPos = run(wireTwo);

    const shortestSteps = [...wireTwoPos.entries()]
        .filter(([pos]) => wireOnePos.has(pos))
        .map(([pos, steps]) => wireOnePos.get(pos) + steps)
        .sort((a, b) => a - b);

    return `The shortest amount of steps were ${shortestSteps[0]}.`;
}

export default {
    part1,
    part2,
}

