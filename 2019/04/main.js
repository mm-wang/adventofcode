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
        return valid || (digit === digits[i-1]);
    }, false);

    return allAscending && sameAdjacent;
}

const checkEvenSameOrAllAscendingDigits = (digits) => {
    let evenAdjacent = {};
    let repeats = false;

    const allAscending = digits.reduce((valid, digit, i) => {
        if (i === 0) return valid = true;
        return valid && (digit >= digits[i-1]);
    }, true);

    const sameAdjacent = digits.reduce((valid, digit, i) => {
        if (i === 0) return valid = false;
        if (digit === digits[i-1]) {
            // Includes in evenAdjacent map if there isn't one there before
            // Keeps track of whether that is a repeating value
            // Adds 1 to the number of repeats
            if (!evenAdjacent[digit.toString()]) evenAdjacent[digit.toString()] = 0;
            if (!repeats) repeats = true;
            if (repeats) evenAdjacent[digit.toString()] += 1;
        } else {
            repeats = false;
        }
        return valid || (digit === digits[i-1]);
    }, false);

    // Checks if there's a value that only repeats once
    const validAdjacent = Object.values(evenAdjacent).reduce((prev, repeats) => {
        return prev || repeats === 1;
    }, false);

    return allAscending && sameAdjacent && validAdjacent;
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
let allEvenValid = findValidEvenRepeatingPasswords(254032, 789860);
let uniqueEvenValid = new Set(allEvenValid);
console.log("Number of different passwords with even adjacency in the range, part 2: ", uniqueEvenValid.size);
