const fs = require("fs");

const inputLoc = __dirname + "/input";

const readFile = (filepath) => {
  let buffer = fs.readFileSync(filepath);
  const input = buffer.toString().split("\n").map((val) => {return +val;});
  return input;
}

const findTopSum = () => {
  let contents = readFile(inputLoc);

  let maxSum = 0;
  let curSum = 0;

  // Check:
  // 1. Is the current val a 0? If so, then restart curSum
  // 2. Is the current val not a 0? If so... if the current sum + the new val > max, update max

  for (let i = 0; i < contents.length; i++) {
    if (contents[i] === 0) {
      curSum = 0;
    }
    if (curSum + contents[i] > maxSum) {
      maxSum = curSum + contents[i];
    }
    curSum = curSum + contents[i];
  }

  return maxSum;
}

const findTopKSum = () => {
  let contents = readFile(inputLoc);

}

console.log(findTopSum());
