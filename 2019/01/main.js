const fs = require("fs");
const readline = require("readline");

const inputLoc = __dirname + "/input";

const readInterface = readline.createInterface({
    input: fs.createReadStream(inputLoc),
    // output: process.stdout, // keep if want to look at the whole thing
    console: false
});

let getFuelRequirements = function (mass) {    
    let fuel = Math.floor(+mass/3) - 2;
    return fuel;
}

let getAddedFuelRequirements = function (mass, fuel) {
    // Get the remaining fuel to add to current total fuel
    let remaining = getFuelRequirements(mass);
    fuel += remaining;

    // If the next iteration will be greater than 0, run this function again
    // Otherwise, we are not adding any more fuel, so return just the fuel
    if (getFuelRequirements(remaining) > 0 ) {
        return getAddedFuelRequirements(remaining, fuel);
    } else {
        return fuel;
    }
}

// Basic fuel calculation
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

// Reductive fuel calculation
let sumAddedFuelRequirements = function() {
    return new Promise((resolve) => {
        let sum = 0;
        let amounts = [];
        readInterface
            .on('line', function(line) {
                // Add current values to an array
                let current = getAddedFuelRequirements(line, sum);
                // console.log("\nLINE: %i SUM: %i CURRENT: %i\n", line, sum, current);
                amounts.push(current);
            })
            .on('close', () => {
                // Sum up the values in the array to a final sum
                sum = amounts.reduce((prev, cur) => {
                    return prev = prev + cur;
                }, sum);
                resolve(sum);
            });
    });
}

// Part 1: Simple fuel calculation
sumFuelRequirements().then((sum)=> {
    console.log("Total fuel requirement, part 1: ", sum);
});

// Part 2: Recursive fuel calculation
sumAddedFuelRequirements().then((sum) => {
    console.log("Total added fuel requirement, part 2: ", sum);
})
