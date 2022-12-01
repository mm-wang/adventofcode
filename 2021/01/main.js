const fs = require("fs");

const inputLoc = __dirname + "/input";

function readFile(filepath) {
    let buffer = fs.readFileSync(filepath);
    const input = buffer.toString().split("\n").map((val) => {return +val;});
    return input;
}

function findLargerThanPrev() {
    let elevations = readFile(inputLoc);
    elevations.pop() // Remove extra line at the end
    let count = 0;

    for (let i = 1; i < elevations.length; i++) {
        if (+elevations[i] > +elevations[i-1]) {
            count++;
        }
    }

    return count;
}

function findSumLargerThanPrev() {
    let elevations = readFile(inputLoc);
    let count = 0;
    let lastSum = 0;
    let curSum = 0;

    elevations.pop(); // Remove extra line at the end
    for (let i = 1; i < elevations.length-2; i++) {
        lastSum = elevations[i-1] + elevations[i] + elevations[i+1];
        curSum = elevations[i] + elevations[i+1] + elevations[i+2];
        if ((curSum > lastSum) && (i > 0)) {
            count++;
        }
    }
    return count;
}

// console.log(findLargerThanPrev());
console.log(findSumLargerThanPrev());
