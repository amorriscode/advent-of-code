const fs = require('fs');

const calculateFuel = amount => {
    const fuelNeeded = Math.floor(amount / 3) - 2;
    return fuelNeeded < 0
        ? 0
        : fuelNeeded + calculateFuel(fuelNeeded);
}

const totalFuelSum = fuel => {
    return fuel.map(amount => {
        const amountRequired = Math.floor(amount / 3) - 2;
        return amountRequired + calculateFuel(amountRequired);
    }).reduce((acc, currVal) => acc + currVal, 0);
}
 
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
const totalFuelNeeded = totalFuelSum(input.split('\n'));

console.log(`The total amount of fuel needed is ${totalFuelNeeded}.`);