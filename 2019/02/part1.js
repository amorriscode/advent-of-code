const fs = require('fs');

const programAlarm = program => {
    program[1] = 12;
    program[2] = 2;
    let position = 0;
    let halt = false;

    while (!halt) {
        const optCode = +program[position];
        const outputPosition = +program[position + 3];
        const value1 = +program[position + 1];
        const value2 = +program[position + 2];

        switch (optCode) {
            case 1:
                program[outputPosition] = +program[value1] + +program[value2];
                break;
            case 2:
                program[outputPosition] = +program[value1] * +program[value2];
                break;
            case 99:
                halt = true;
                break;
            default:
                program[0] = 'garbage';
                halt = true;
        }

        position += 4;
    }

    return program[0];
}
 
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
const programState = programAlarm(input.split(','));

console.log(`The state of the program is ${programState}.`);