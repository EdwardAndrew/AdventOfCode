const fs = require('fs');

const getEntries = () => fs
    .readFileSync('input.txt', { encoding: 'utf-8' })
    .split('\n\n')
    .map(s => s.split('\n'));

const partOne = () => {
    const groups = getEntries();
    return groups.reduce((acc, g) => {
        const answers = new Set(g.join('').split(''));
        return acc += answers.size;
    }, 0)
};

const partTwo = () => {
    const groups = getEntries();
    return groups.reduce((acc, g) => {
        const chars = g.join('').split('');
        const answers = [...new Set(chars)];
        const val = answers
            .reduce((acc, a) => {
                return acc += 1 * chars.filter(x => x === a).length === g.length;
            }, 0);
        return acc += val;
    }, 0);
};

console.log(partOne());
console.log(partTwo());
