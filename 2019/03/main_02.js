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
        let contents = [];
        readInterface
        .on('line', (line) => {
            // Convert current values to an array
            current = line.split(",");
            contents.push(current);
        })
        .on('close', () => {
            resolve(contents);
        })
    });
}

let convertToCoordinates = (curPathMap, pathPoint, x, y, pathLength) => {
    let direction = pathPoint.charAt(0);
    let steps = +pathPoint.slice(1);

    let stepsArray = Array.from(new Array(steps), (cur,i) => i+1)

    switch (direction) {
        case 'R':
            stepsArray.forEach((step) => {
                pathLength += 1;
                curPathMap.push({x: x + step, y: y, pathLength: pathLength});
            });       
            x += steps;
            break;
        case 'U':
            stepsArray.forEach((step) => {
                pathLength += 1;
                curPathMap.push({x: x, y: y + step, pathLength: pathLength});
            });       
            y += steps;
            break;
        case 'L':
            stepsArray.forEach((step) => {
                pathLength += 1;
                curPathMap.push({x: x - step, y: y, pathLength: pathLength});
            });       
            x -= steps;
            break;
        case 'D':
            stepsArray.forEach((step) => {
                pathLength += 1;
                curPathMap.push({x: x, y: y - step, pathLength: pathLength});
            });       
            y -= steps;
            break;
    }
    return [x, y, pathLength];
}

let convertPathToX = (pathMap) => {
    let converted = pathMap.reduce((prev, cur) => {
        if (prev && prev[cur.x]) {
            prev[cur.x].pathLength.push(cur.pathLength);
            prev[cur.x].y.push(cur.y);
        }
        else {
            prev[cur.x] = {
                pathLength: [cur.pathLength],
                y: [cur.y]
            };
        }
        return prev;
    }, {});
    return converted;
}

let findMatches = (fullPathMap) => {
    let initPath = convertPathToX(fullPathMap[0]);
    let nextPath = convertPathToX(fullPathMap[1]);

    let xMatches = [];
    let matches = [];

    // Finding the key in nextPath from the keys in initPath
    // Getting all X values that match
    Object.keys(initPath).forEach((eachX) => {
        let stringX = eachX.toString();
        if (Object.keys(nextPath).indexOf(stringX) !== -1) {
            xMatches.push(eachX);
        }
    });

    // Finding the Y matches from the X values
    // Pushing to the matches array
    xMatches.forEach((xMatch) => {
        let pathDistanceIndices = {
            init: {},
            next: {}
        };
        let yMatches = initPath[xMatch].y.filter((yMatch, i) => {
            let index = nextPath[xMatch].y.indexOf(yMatch);
            if (index !== -1) {
                pathDistanceIndices.init[xMatch+'-'+yMatch] = i;
                pathDistanceIndices.next[xMatch+'-'+yMatch] = index;
                return true;
            }
        });
        if (yMatches.length) {
            yMatches.forEach((yMatch) => {
                matches.push({x: xMatch, y: yMatch, 
                    initSteps: initPath[xMatch].pathLength[pathDistanceIndices.init[xMatch+"-"+yMatch]],
                    nextSteps: nextPath[xMatch].pathLength[pathDistanceIndices.next[xMatch+"-"+yMatch]]
                });
            });
        }
    });

    console.log("Matches: ", matches);
    return matches;  
}

let calcCombinedStepsDistance = (set) => {
    return set.initSteps + set.nextSteps;
}

let findClosestCombinedStepsDistance = (contents) => {
    let pathMap = [];
    contents.forEach((path, i) => {
        pathMap.push([]);
        let curX = 0;
        let curY = 0;
        let pathLength = 0;
        path.forEach((pathPoint) => {
            [curX, curY, pathLength] = 
                convertToCoordinates(pathMap[i], pathPoint, curX, curY, pathLength);
        });
    });
    let matches = findMatches(pathMap);
    let minimumDistance = matches.reduce((prev, cur) => {
        let dist = calcCombinedStepsDistance(cur);
        if (dist < prev) prev = dist;
        return prev;
    },Number.MAX_VALUE);
    return minimumDistance;
}

// Part 2: Finding closest intersection using length of path to get there
// Hint - the way to make this algorithm much more efficient is by
// keying the coordinates using X
readInput().then((contents) => {
    console.time("finding closest intersection");
    let minimum = findClosestCombinedStepsDistance(contents);
    console.log("Minimum combined steps distance from port, part 2: ", minimum);
    console.timeEnd("finding closest intersection");
});
