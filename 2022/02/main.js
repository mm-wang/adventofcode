const fs = require("fs");

const inputLoc = __dirname + "/input";

const readFile = (filepath) => {
  let buffer = fs.readFileSync(filepath);
  const input = buffer.toString().split("\n")
    .map((val) => {if (val.length) return val.split(' ');})
    .filter(Boolean);
  return input;
}

/**
 * Part I
 */
// Paper beats rock (1-0), Scissors beats paper (2-1), Rock beats scissors (0-2)
const Play = {
  Rock: 0,
  Paper: 1,
  Scissors: 2,
}

const first = {
  A: Play.Rock,
  B: Play.Paper,
  C: Play.Scissors,
}

const second = {
  X: Play.Rock,
  Y: Play.Paper,
  Z: Play.Scissors,
}

const shape = {
  X: 1,
  Y: 2,
  Z: 3
}

const calculatePlayStrategy = () => {
  const plays = readFile(inputLoc);
  let outcome = -Number.MAX_SAFE_INTEGER;
  let outcomeScore = 0;
  let total = 0;
  for (let i = 0; i < plays.length; i++) {
    let opponent = plays[i][0];
    let you = plays[i][1];
    outcome = second[you] - first[opponent];
    outcomeScore = calculateOutcomeScore(outcome);
    total += shape[you] + outcomeScore;
  }

  return total;
}

const calculateOutcomeScore = (outcome) => {
  switch (outcome)  {
    case 1:
      return 6;
    case -2:
      return 6;
    case 0:
      return 3;
    default:
      return 0;
  }
}

/**
 * Part II
 */

const choice = {
  [Play.Rock]: 'X',
  [Play.Paper]: 'Y',
  [Play.Scissors]: 'Z',
}

const desired = {
  X: 0,
  Y: 3,
  Z: 6
}

const calculateDesiredPlay = () => {
  const plays = readFile(inputLoc);
  let total = 0;
  for (let i = 0; i < plays.length; i++) {
    let outcome = desired[plays[i][1]];
    let choice = pickPlay(plays[i][0], outcome);
    total += outcome + shape[choice];
  }
  return total;
}

const pickPlay = (opponent, outcome) => {
  console.log(opponent, outcome);
  switch(outcome) {
    case 3:
      return choice[first[opponent]];
    case 6:
      return choice[first[opponent]+1] || choice[first[opponent]-2]; // If you want to win against scissors, you play rock
    default:
      return choice[first[opponent]-1] || choice[2]; // If you want to lose to rock, you play scissors
  }
}

// console.log(calculatePlayStrategy());
console.log(calculateDesiredPlay());
