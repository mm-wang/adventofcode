const fs = require("fs");
const readline = require("readline");

const inputLoc = __dirname + "/input";

const readInterface = readline.createInterface({
    input: fs.createReadStream(inputLoc),
    // output: process.stdout, // keep if want to look at the whole thing
    console: false
});

let readInput = function() {
    
}
