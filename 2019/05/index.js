import input from './input';

const getInput = () => input.split(',').map(Number);

const run = (program, diagnosticCode) => {
    let position = 0;
    let output = '';

    const getParam = (mode, position) => mode === 0 ? program[program[position]] : program[position];

    while (program[position] !== 99 && program[position]) {
        const instruction = program[position].toString().padStart(5, '0');

        const opCode = parseInt(instruction.slice(3));
        const paramMode1 = parseInt(instruction[2]);
        const paramMode2 = parseInt(instruction[1]);
        // const paramMode3 = parseInt(instruction[0]);

        const param1 = getParam(paramMode1, position + 1);
        const param2 = getParam(paramMode2, position + 2);
        const param3 = program[position + 3];

        switch (opCode) {
            case 1:
                program[param3] = param1 + param2;
                position += 4;
                break;
            case 2:
                program[param3] = param1 * param2;
                position += 4;
                break;
            case 3:
                program[program[position + 1]] = diagnosticCode;
                position += 2;  
                break;
            case 4:
                output = param1;
                position += 2;
                break;
            case 5:
                if (param1 !== 0) {
                    position = param2;
                } else {
                    position += 3;
                }
                break;
            case 6:
                if (param1 === 0) {
                    position = param2;
                } else {
                    position += 3;
                }
                break;
            case 7:
                program[param3] = param1 < param2 ? 1 : 0;
                position += 4;
                break;
            case 8:
                program[param3] = param1 === param2 ? 1 : 0;
                position += 4;
                break;
        }
    }

    return output;
};

const part1 = () => {
    const input = getInput();
    const answer = run(input, 1);

    return `The diagnostic code is ${answer}`;
}

const part2 = () => {
    const input = getInput();
    const answer = run(input, 5);

    return `The diagnostic code for system ID 5 is ${answer}`;
}

export default {
    part1,
    part2,
}

