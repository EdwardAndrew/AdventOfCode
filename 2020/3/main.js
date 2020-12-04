const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

const partOne = () => {
    const right = 3;
    const down = 1;
    let treesHit = 0;
    for (y = 0, x = 0; y < input.length; y += down, x += right) {
        if (x >= input[y].length) x = x - input[y].length;
        if (input[y][x] === '#') treesHit++;
    }
    return treesHit;
}

const partTwo = () => {
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ]

    const getTreesHit = (right, down) => {
        let treesHit = 0;
        for (y = 0, x = 0; y < input.length; y += down, x += right) {
            if (x >= input[y].length) x = x - input[y].length;
            if (input[y][x] === '#') treesHit++;
        }
        return treesHit;
    }

    return slopes.map(([right, down]) => getTreesHit(right, down)).reduce((a, b) => a * b, 1);
}


console.log(partOne());
console.log(partTwo());
