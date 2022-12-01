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

  let first = maxThreeHeap.pop();
  let second = maxThreeHeap.pop();
  let third = maxThreeHeap.pop();
  let total = [first, second, third].reduce((prev, cur) => { return prev = prev + cur }, 0);
  console.log("Final max: ", [first, second, third], total);
}

/**
 * MaxHeap
 * Lessons:
 * 1. Must always keep track of size and capacity, and add until you fill capacity
 * 2. Must always update from the bottom, replacing with parent
 * 3. Don't have capacity, just have unlimited heap, then pop top k
 */
class MaxHeap {
  constructor(k = 3) {
    this.size = 0;
    this.heap = [0];
  }
  getSize () {
    return this.size;
  }
  getHeap() {
    return this.heap;
  }
  addToHeap(num) {
      this.heap[this.size] = num;
      this.size++;
      this.updateHeap();
  }
  pop() {
    let popped = this.heap.shift();
    this.updateChildren();
    return popped;
  }
  updateHeap() {
    for (let i = this.heap.length - 1; i >= 0; i--) {
      let parent = Math.floor((i-1)/2);
      if (this.heap[parent] < this.heap[i]) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      }
    }
  }
  updateChildren() {
    for (let i = 0; i < this.heap.length; i++) {
      let left = 2*i + 1;
      let right = 2*i + 2;
      if (this.heap[left] && this.heap[right] && this.heap[left] > this.heap[right]) {
        if (this.heap[left] > this.heap[i]) {
          [this.heap[i], this.heap[left]] = [this.heap[left], this.heap[i]];
        }
      } else if (this.heap[left] && this.heap[right] && this.heap[left] < this.heap[right]) {
        if (this.heap[right] > this.heap[i]) {
          [this.heap[i], this.heap[right]] = [this.heap[right], this.heap[i]];
        }
      } else {
        if (this.heap[left] && this.heap[left] > this.heap[i]) {
          [this.heap[i], this.heap[left]] = [this.heap[left], this.heap[i]];
        } else if (this.heap[right] && this.heap[right] > this.heap[i]) {
          [this.heap[i], this.heap[right]] = [this.heap[right], this.heap[i]];
        }
      }
    }
  }
}


// console.log(findTopSum());
console.log(findTopKSum(6));
