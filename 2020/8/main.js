const fs = require('fs');
const getInput = () => fs.readFileSync('input.txt', 'utf-8').split('\n');
const instructions = getInput()
    .map(x => {
        const val = x.split(' ');
        return [val[0], parseInt(val[1])]
    });

const run = program => {
    let acc = 0;
    let pointer = 0;
    const executed = {};

    const mappings = {
        acc: n => {
            acc += n;
            pointer++;
        },
        jmp: n => pointer += n,
        nop: () => pointer++
    }

    while (!executed[pointer] && pointer != program.length) {
        executed[pointer] = true;
        const ins = program[pointer];
        mappings[ins[0]](ins[1]);
    }

    return ({ end: pointer == program.length, acc });
}

const partOne = () => run(instructions).acc;


const partTwo = () => {
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i][0] == 'acc') continue;

        const newProgram = JSON.parse(JSON.stringify(instructions));
        if (newProgram[i][0] == 'nop') {
            newProgram[i][0] = 'jmp';
        }
        else if (newProgram[i][0] == 'jmp') {
            newProgram[i][0] = 'nop';
        }
        const result = run(newProgram);
        if (result.end) return result.acc;
    }
    return -1;
}

console.log(partOne());
console.log(partTwo());