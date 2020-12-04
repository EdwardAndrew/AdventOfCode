const fs = require('fs');
const input = fs
    .readFileSync('input.txt', { encoding: 'utf-8' })
    .split('\n');


const parsePassword = pw => {
    const regex = /(\d+-\d+|.+:|.*)/g
    const x = pw.match(regex);
    return ({
        first: parseInt(x[0].split('-')[0]),
        second: parseInt(x[0].split('-')[1]),
        character: x[1].replace(':', '').trim(),
        password: x[2].trim()
    })
}

const partOne = () => {
    const passwords = input.map(parsePassword);
    const isValid = x => {
        const re = new RegExp(`${x.character}`, "g")
        const matches = x.password.match(re);
        const count = matches ? matches.length : 0;
        if (count < x.first) return false;
        if (count > x.second) return false;
        return true;
    }
    return passwords.filter(isValid).length;
}

const partTwo = () => {
    const passwords = input.map(parsePassword);
    const isValid = x => {
        const a = x.password[x.first - 1] === x.character;
        const b = x.password[x.second - 1] === x.character;
        return ((a && !b) || (!a && b))
    }
    return passwords.filter(isValid).length;
}

console.log(partOne());
console.log(partTwo());
