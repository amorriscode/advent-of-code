import input from './input';

const getInput = () => input.split('\n').map(Number);

const run = (input, callback) => {
    return input.map(callback)
        .reduce((acc, currVal) => acc + currVal, 0);
};

const part1 = () => {
    const input = getInput();

    const result = run(input, amount => Math.floor(amount / 3) - 2);

    return `The total amount of fuel needed is ${result}.`;
}

const part2 = () => {
    const input = getInput();

    const calculateFuel = amount => {
        const fuelNeeded = Math.floor(amount / 3) - 2;
        return fuelNeeded < 0
            ? 0
            : fuelNeeded + calculateFuel(fuelNeeded);
    }

    const result = run(input, amount => {
        const amountRequired = Math.floor(amount / 3) - 2;
        return amountRequired + calculateFuel(amountRequired);
    });

    return `The total amount of fuel needed is ${result}.`;
};

export default {
    part1,
    part2,
}
