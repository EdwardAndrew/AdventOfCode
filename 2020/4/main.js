const fs = require('fs')

const getPassports = () => fs
    .readFileSync('input.txt', { encoding: 'utf-8' })
    .split('\n\n')
    .map(s => s
        .replace(/\n/g, ' ')
        .split(' ')
        .reduce((acc, entry) => {
            const [k, v] = entry.split(':')
            acc[k] = v;
            return acc;
        }, {}));

const partOne = () => {
    const passports = getPassports();
    const requiredFields = [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid',
        //'cid'
    ];
    const validatePassport = p => {
        const keys = Object.keys(p);
        return requiredFields.every(f => keys.includes(f));
    }
    return passports.filter(validatePassport).length;
}

const partTwo = () => {
    const passports = getPassports();
    const requiredFields = [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid',
        //'cid'
    ];

    const validatePassport = p => {
        if (!requiredFields.every(f => Object.keys(p).includes(f))) return false;
        const entries = Object.entries(p);
        const isBetweenInc = (x, min, max) => x >= min && x <= max;
        const rules = {
            'byr': x => isBetweenInc(x, 1920, 2002),
            'iyr': x => isBetweenInc(x, 2010, 2020),
            'eyr': x => isBetweenInc(x, 2020, 2030),
            'hgt': x => {
                if (!RegExp(/^\d+(cm|in)$/g).test(x)) return false;
                const bounds = {
                    'cm': { min: 150, max: 193 },
                    'in': { min: 59, max: 76 }
                };
                const unit = x.slice(x.length - 2, x.length);
                const num = parseInt(x.slice(0, x.length - 2));
                return isBetweenInc(num, bounds[unit].min, bounds[unit].max)
            },
            'hcl': x => RegExp(/^#[a-f\d]{6}$/g).test(x),
            'ecl': x => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x),
            'pid': x => { console.log(x); return RegExp(/^[\d]{9}$/g).test(x)},
            'cid': () => true
        }
        return entries.every(e => rules[e[0]](e[1]));
    }

    return passports.filter(validatePassport).length;
}

console.log(partOne())
console.log(partTwo())
