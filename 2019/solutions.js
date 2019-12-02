'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dedent = _interopDefault(require('dedent'));

var solve = (solutions) => {
    console.log('The solution to part one is...');
    console.log(solutions.part1());

    console.log('The solution to part two is...');
    console.log(solutions.part2());
};

var input = `50951
69212
119076
124303
95335
65069
109778
113786
124821
103423
128775
111918
138158
141455
92800
50908
107279
77352
129442
60097
84670
143682
104335
105729
87948
59542
81481
147508
62687
64212
66794
99506
137804
135065
135748
110879
114412
120414
72723
50412
124079
57885
95601
74974
69000
66567
118274
136432
110395
88893
124962
74296
106148
59764
123059
106473
50725
116256
80314
60965
134002
53389
82528
144323
87791
128288
109929
64373
114510
116897
84697
75358
109246
110681
94543
92590
69865
83912
124275
94276
98210
69752
100315
142879
94783
111939
64170
83629
138743
141238
77068
119299
81095
96515
126853
87563
101299
130240
62693
139018`;

const getInput = () => input.split('\n').map(Number);

const run = (input, callback) => {
    return input.map(callback)
        .reduce((acc, currVal) => acc + currVal, 0);
};

const part1 = () => {
    const input = getInput();

    const result = run(input, amount => Math.floor(amount / 3) - 2);

    return `The total amount of fuel needed is ${result}.`;
};

const part2 = () => {
    const input = getInput();

    const calculateFuel = amount => {
        const fuelNeeded = Math.floor(amount / 3) - 2;
        return fuelNeeded < 0
            ? 0
            : fuelNeeded + calculateFuel(fuelNeeded);
    };

    const result = run(input, amount => {
        const amountRequired = Math.floor(amount / 3) - 2;
        return amountRequired + calculateFuel(amountRequired);
    });

    return `The total amount of fuel needed is ${result}.`;
};

var dayOne = {
    part1,
    part2,
};

var input$1 = `1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,1,5,19,23,1,23,5,27,1,27,13,31,1,31,5,35,1,9,35,39,2,13,39,43,1,43,10,47,1,47,13,51,2,10,51,55,1,55,5,59,1,59,5,63,1,63,13,67,1,13,67,71,1,71,10,75,1,6,75,79,1,6,79,83,2,10,83,87,1,87,5,91,1,5,91,95,2,95,10,99,1,9,99,103,1,103,13,107,2,10,107,111,2,13,111,115,1,6,115,119,1,119,10,123,2,9,123,127,2,127,9,131,1,131,10,135,1,135,2,139,1,10,139,0,99,2,0,14,0`;

const getInput$1 = () => input$1.split(',').map(Number);

const run$1 = program => {
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

const part1$1 = () => {
    const input = getInput$1();
    input[1] = 12;
    input[2] = 2;
    return `The gravity assist program halted with ${run$1(input)}.`;
};

const part2$1 = () => {
    const expected = 19690720;

    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const input = getInput$1();
            input[1] = noun;
            input[2] = verb;

            if (run$1(input) === expected) {
                return dedent`
                    ${expected} was found with noun ${noun} and verb ${verb}.
                    The solution to the correct solution is ${100 * noun + verb}.
                `;
            }
        }
    }
};

var dayTwo = {
    part1: part1$1,
    part2: part2$1,
};

const solutions = {
    1: dayOne,
    2: dayTwo,
};

const dayToSolve = process.argv[2];

solve(solutions[dayToSolve]);
