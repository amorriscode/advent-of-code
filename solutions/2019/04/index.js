import input from './input';

const getInput = () => input.split('-').map(Number);

const hasDoubleDigit = /(\d{1,2})\1+/g;

const run = (start, end) => {
    const numbers = [];

    init:
    for (let i = start; i <= end; i++) {
        const currNum = i.toString();
        for (let j = 0; j < 6; j++) {
            if (parseInt(currNum[j]) < parseInt(currNum[j - 1])) {
                continue init;
            }
        }

        numbers.push(currNum);
    }

    return numbers;
};

const part1 = () => {
    const [start, end] = getInput();
    const answer = run(start, end)
        .filter(number => number.match(hasDoubleDigit))
        .length;

    return `There are ${answer} possible passwords. 🔐`;
}

const part2 = () => {
    const [start, end] = getInput();
    const answer = run(start, end)
        .filter(number => {
            const numberMatches = number.match(hasDoubleDigit);
            if (numberMatches && numberMatches.length) {
                return numberMatches.some(num => num.length === 2);
            }
        }).length;

        return `There are ${answer} possible passwords. 🔐`;
}

export default {
    part1,
    part2,
}

