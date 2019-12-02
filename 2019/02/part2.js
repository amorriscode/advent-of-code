const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
const getInput = () => input.split(',').map(Number);

const part1 = program => {
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
}

const part2 = () => {
    const expected = 19690720;
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const input = getInput();
            input[1] = noun;
            input[2] = verb;
            if (part1(input) === expected) {
                return 100 * noun + verb;
            }
        }
    }
}
 
const result = part2();

console.log(`The state of the program is ${result}.`);