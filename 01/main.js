const fs = require("fs");
const readline = require("readline");

const inputLoc = __dirname + "/input";

const readInterface = readline.createInterface({
    input: fs.createReadStream(inputLoc),
    // output: process.stdout, // keep if want to look at the whole thing
    console: false
});

let getFuelRequirements = function (mass) {
    return Math.floor(+mass/3) - 2;
}

let sumFuelRequirements = function() {
    return new Promise((resolve) => {
        let sum = 0;
        readInterface
            .on('line', function(line) {
                sum+=getFuelRequirements(line);
            })
            .on('close', () => {
                resolve(sum);
            });
    });
}

sumFuelRequirements().then((sum)=> {
    console.log("Total fuel requirement: ", sum);
});
