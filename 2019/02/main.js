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

            let second = array[i+1];
            let third = array[i+2];
            let position = array[i+3];
            console.log(cur, i, second, third, position);
            if (cur === 1) {
                array[position] = array[second] + array[third];
            } else if (cur === 2) {
                array[position] = array[second] * array[third];
            }
            return array[position]
        }
    });
}

readInput().then((contents) => {
    runIntcode(contents);
    console.log("Contents: ", contents);
})
