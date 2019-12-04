import colors from 'colors';

export default (solutions) => {
    console.log('                                       '.bgRed);

    console.log('          ADVENT OF CODE 2019          '.bold.brightRed.bgGreen);

    console.log('                                       '.bgRed);

    console.log('');

    console.log('🎄🎄 PART ONE 🎄🎄'.bold.green);
    console.log(`${solutions.part1()}\n`);
    
    console.log('🎄🎄 PART TWO 🎄🎄'.bold.green);
    console.log(solutions.part2());

    console.log('');

    console.log('                                       '.bgRed);
    console.log('                                       '.bgGreen);
    console.log('                                       '.bgRed);
}
