const fs = require("fs");
const readline = require("readline");

const inputLoc = __dirname + "/input";

const readInterface = readline.createInterface({
    input: fs.createReadStream(inputLoc),
    // output: process.stdout, // keep if want to look at the whole thing
    console: false
});

// Reads input as a comma separated string
let readInput = () => {
    return new Promise((resolve) => {
        let contents;
        readInterface
        .on('line', (line) => {
            // Convert current values to an array
            contents = line.split(",").map((val) => { return +val; });
        })
        .on('close', () => {
            resolve(contents);
        })
    });
}

let runIntcode = (array) => {
    return array.map((cur, i) => {
        if (i % 4 === 0) {
            if (cur === 99) return;

            let second = array[i+1]; // This will be the position to look for value
            let third = array[i+2]; // This will be the position to look for value
            let position = array[i+3];

            if (cur === 1) {
                array[position] = array[second] + array[third];
            } else if (cur === 2) {
                array[position] = array[second] * array[third];
            }
            return array[position]
        }
    });
}

// Part 1: Intcode computer for 1, 2, 99
readInput().then((contents) => {
    runIntcode(contents);
    console.log("Values of intcode computer, part 1: ", contents);
});
