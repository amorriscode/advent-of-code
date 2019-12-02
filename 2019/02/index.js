import dedent from 'dedent';
import input from './input';

const getInput = () => input.split(',').map(Number);

const run = program => {
    let position = 0;
    while (program[position] !== 99) {
        const opCode = program[position];
        const param1 = program[program[position + 1]];
        const param2 = program[program[position + 2]];
        const storageLoc = program[position + 3];

        program[storageLoc] = opCode === 1
            ? param1 + param2
            : param1 * param2;

        position += 4;
    }

    return program[0];
};

const part1 = () => {
    const input = getInput();
    input[1] = 12;
    input[2] = 2;
    return `The gravity assist program halted with ${run(input)}.`;
}

const part2 = () => {
    const expected = 19690720;

    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const input = getInput();
            input[1] = noun;
            input[2] = verb;

            if (run(input) === expected) {
                return dedent`
                    ${expected} was found with noun ${noun} and verb ${verb}.
                    The correct solution is ${100 * noun + verb}.
                `;
            }
        }
    }
};

export default {
    part1,
    part2,
}
