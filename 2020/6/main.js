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
            .map(a => chars
                .filter(x => x === a)
                .length === g.length)
            .reduce((acc, n) => {
                return acc += n ? 1 : 0;
            }, 0);
        return acc += val;
    }, 0);
};

console.log(partOne());
console.log(partTwo());
