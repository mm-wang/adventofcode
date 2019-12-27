const splitValueToNumbers = (num) => {
    const values = num.toString().split("").map((each) => { return +each;});
    return values;
}

const checkSameOrAllAscendingDigits = (digits) => {
    let allAscending = digits.reduce((valid, digit, i) => {
        if (i === 0) return valid = true;
        return valid && (digit >= digits[i-1]);
    }, true);

    let sameAdjacent = digits.reduce((valid, digit, i) => {
        if (i === 0) return valid = false;
        if (digits === digits[i-1]) {
            evenAdjacent[digit] += 1
        }
        return valid || (digit === digits[i-1]);
    }, false);

    return allAscending && sameAdjacent;
}

const checkEvenSameOrAllAscendingDigits = (digits) => {
    let evenAdjacent = {};
    let current = null;

    const allAscending = digits.reduce((valid, digit, i) => {
        if (i === 0) return valid = true;
        return valid && (digit >= digits[i-1]);
    }, true);

    const sameAdjacent = digits.reduce((valid, digit, i) => {
        if (i === 0) return valid = false;
        if (!evenAdjacent[digit]) evenAdjacent[digit] = 1;
        // Fix counting!
        if (digit === digits[i-1]) {
            evenAdjacent[digit] += 1;
            current = digit;
        }
        console.log(evenAdjacent[digit], current, digit);
        // if (digit === digits[i-1]) {
        //     current = digit;
        //     console.log("current: %d, digit: %d", current, digit);
        //     if (!evenAdjacent[digit]) {
        //         evenAdjacent[digit] = 0;
        //     }
        //     else if (evenAdjacent[digit] && current === digit) {
        //         evenAdjacent[digit] += 1;
        //     }
        // }
        return valid || (digit === digits[i-1]);
    }, false);

    const invalidAdjacent = Object.keys(evenAdjacent)
        .reduce((prev,numAdjacent) => {
            return prev && (evenAdjacent[numAdjacent] % 2 === 0)
        }, true);

    console.log("invalidAdjacent: ", invalidAdjacent, digits, evenAdjacent);
    return allAscending && sameAdjacent && !invalidAdjacent;
}

const isValidPassword = (num) => {
    let digits = splitValueToNumbers(num);
    let valid = checkSameOrAllAscendingDigits(digits);
    return valid;
}

const isValidEvenSamePassword = (num) => {
    let digits = splitValueToNumbers(num);
    let valid = checkEvenSameOrAllAscendingDigits(digits);
    return valid;
}

const findValidPasswords = (first, last) => {
    let valid = [];
    for (let i = first; i <= last; i++) {
        if (isValidPassword(i)) valid.push(i);
    }
    return valid;
}

const findValidEvenRepeatingPasswords = (first, last) => {
    let valid = [];
    for (let i = first; i <= last; i++) {
        if (isValidEvenSamePassword(i)) valid.push(i);
    }
    return valid;
}

// Part 1: Unique different passwords in range with duplicated digits and ascending digits
let allValid = findValidPasswords(254032, 789860);
let uniqueValid = new Set(allValid);
console.log("Number of different passwords in the range, part 1: ", allValid.length, uniqueValid.size);

// Part 2: Unique different passwords in range with even numbered duplicated digits and ascending digits
let allEvenValid = findValidEvenRepeatingPasswords(254999, 255066);
let uniqueEvenValid = new Set(allValid);
console.log("Number of different passwords with even adjacency in the range, part 2: ", uniqueEvenValid.size);
