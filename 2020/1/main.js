const fs = require('fs');
const numbers = fs
    .readFileSync('input.txt', { encoding: 'utf-8' })
    .split('\n')
    .map(n => parseInt(n));

const partOne = () => {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (i == j) continue;
            if (numbers[i] + numbers[j] == 2020) {
                return numbers[i] * numbers[j];
            }
        }
    }
    return -1;
}

const partTwo = () => {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            for (let k = 0; k < numbers.length; k++) {
                if (i == j || i == k || j == k) continue;
                if (numbers[i] + numbers[j] + numbers[k] == 2020) {
                    return numbers[i] * numbers[j] * numbers[k];
                }
            }
        }
    }
    return -1;
}

console.log(partOne());
console.log(partTwo());
