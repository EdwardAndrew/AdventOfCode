const fs = require('fs');
const input = fs.readFileSync('input.txt', { encoding: 'utf-8'}).split('\n');

const toNumber = s =>  parseInt(s.replace(/[F|L]/g,'0').replace(/[B|R]/g,'1'),2);

const partOne = () => {
    let max = 0;
    for (entry of input){
        const id = toNumber(entry);
        if(max < id) max = id;
    }
    return max;
}

const partTwo = () => {
    const max = partOne();
    const seatIds = new Set(input.map(s => toNumber(s)))
    for (let i =1; i < max; i++){
        if(seatIds.has(i-1) && !seatIds.has(i) && seatIds.has(i+1)) return i;
    }
    return -1;
}

console.log(partOne());
console.log(partTwo());
