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

const findTopKSum = (k = 3) => {
  let contents = readFile(inputLoc);
  let maxThreeHeap = new MaxHeap(k);

  let maxSum = 0;
  let curSum = 0;

  for (let i = 0; i < contents.length; i++) {
    if (contents[i] === 0) {
      curSum = 0;
    }
    if (curSum + contents[i] > maxSum) {
      maxSum = curSum + contents[i];
      maxThreeHeap.addToHeap(maxSum, maxThreeHeap);
    }
    curSum = curSum + contents[i];
  }

  let total = maxThreeHeap.getHeap().reduce((prev, cur) => { return prev = prev + cur }, 0);
  console.log("Final max: ", maxThreeHeap.getHeap(), total);
}

/**
 * MaxHeap
 * Lessons:
 * 1. Must always keep track of size and capacity, and add until you fill capacity
 * 2. Must always update from the bottom, replacing with parent
 */
class MaxHeap {
  constructor(k = 3) {
    this.size = 0;
    this.capacity = k;
    this.heap = new Array(k).fill(0);  
  }
  getSize () {
    return this.size;
  }
  getHeap() {
    return this.heap;
  }
  addToHeap(num) {
    if (this.size < this.capacity) {
      this.heap[this.size] = num;
      this.size++;
    } else {
      if (this.heap[this.size-1] < num) {
        this.heap[this.size-1] = num;
        this.updateHeap()
      }
    }
  }
  updateHeap() {
    for (let i = this.heap.length - 1; i >= 0; i--) {
      let parent = Math.floor((i)/2);
      if (this.heap[parent] < this.heap[i]) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      }
    }
  }
}


// console.log(findTopSum());
console.log(findTopKSum(3));
