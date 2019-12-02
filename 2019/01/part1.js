const fs = require('fs');

const totalFuelSum = fuel => {
    return fuel.map(amount => Math.floor(amount / 3) - 2)
        .reduce((acc, currVal) => acc + currVal, 0);
}
 
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
const totalFuelNeeded = totalFuelSum(input.split('\n'));

console.log(`The total amount of fuel needed is ${totalFuelNeeded}.`);