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

        let param1;
        let param2;
        let param3;
        switch (opCode) {
            case 1:
                param1 = getParam(paramMode1, position + 1)
                param2 = getParam(paramMode2, position + 2)
                param3 = program[position + 3];

                program[param3] = param1 + param2;

                position += 4;
                break;
            case 2:
                param1 = getParam(paramMode1, position + 1)
                param2 = getParam(paramMode2, position + 2)
                param3 = program[position + 3];

                program[param3] = param1 * param2;

                position += 4;
                break;
            case 3:
                param1 = program[position + 1];

                program[param1] = diagnosticCode;

                position += 2;
                break;
            case 4:
                output = getParam(paramMode1, position + 1);

                position += 2;
                break;
        }
    }

    return output;
};

const part1 = () => {
    const input = getInput();
    console.log(run(input, 1));
}

const part2 = () => {
    const input = getInput();
    run(input);
}

export default {
    part1,
    part2,
}

