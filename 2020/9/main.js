const fs = require('fs');

const getInput = () => fs.readFileSync('input.txt', 'utf-8').split('\n').map(x => parseInt(x));

const partOne = preamble => {
    const nums = getInput();

    for (let i = preamble; i < nums.length; i++) {
        const currentNum = nums[i];
        const sums = [];
        for (let j = i - preamble; j < i; j++) {
            for (let k = i - preamble; k < i; k++) {
                if (k == j) continue;
                sums.push(nums[j] + nums[k]);
            }
        }
        if (!sums.includes(currentNum)) return currentNum;
    }

    return -1;
};

const sum = nums => nums.reduce((prev, val) => {
    return prev + val;
}, 0)

const min = nums => nums.reduce((prev, val) => {
    if (prev > val) return val;
    return prev;
}, nums[0])

const max = nums => nums.reduce((prev, val) => {
    if (prev < val) return val;
    return prev;
}, nums[0])

const partTwo = preamble => {
    const nums = getInput();
    const targetNumber = partOne(preamble);

    for (let start = 0; start < nums.length; start++) {
        for (let end = start + 1; end < nums.length; end++) {
            const range = nums.slice(start, end);
            if (sum(range) == targetNumber) {
                return min(range) + max(range);
            }
        }
    }

    return -1;
};

const preamble = 25;
console.log(partOne(preamble));
console.log(partTwo(preamble));