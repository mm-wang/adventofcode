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

let convertToCoordinates = (curPathMap, pathPoint, x, y) => {
    let direction = pathPoint.charAt(0);
    let steps = +pathPoint.slice(1);

    let stepsArray = Array.from(new Array(steps), (cur,i) => i+1)

    switch (direction) {
        case 'R':
            stepsArray.forEach((step) => {
                curPathMap.push({x: x + step, y: y});
            });       
            x += steps;
            break;
        case 'U':
            stepsArray.forEach((step) => {
                curPathMap.push({x: x, y: y + step});
            });       
            y += steps;
            break;
        case 'L':
            stepsArray.forEach((step) => {
                curPathMap.push({x: x - step, y: y});
            });       
            x -= steps;
            break;
        case 'D':
            stepsArray.forEach((step) => {
                curPathMap.push({x: x, y: y - step});
            });       
            y -= steps;
            break;
    }
    return [x, y];
}

let convertPathToX = (pathMap) => {
    let converted = pathMap.reduce((prev, cur) => {
        if (prev && prev[cur.x]) prev[cur.x].push(cur.y);
        else {
            prev[cur.x] = [cur.y];
        }
        return prev;
    }, {});
    return converted;
}

let findMatches = (fullPathMap) => {
    let length = fullPathMap.length;
    let matches = [];
    let initPath = fullPathMap[0];

    for (let i = 1; i < length; i++) {
        let curPath = fullPathMap[i];
        for (const curSet of curPath) {
            for (const initSet of initPath) {
                if (curSet.x === initSet.x && curSet.y === initSet.y) {
                    matches.push({x: curSet.x, y: curSet.y});
                }
            }
        }
    }
    console.log("Matches: ", matches);
    return matches;  
}

let calcManhattanDistance = (set) => {
    return Math.abs(set.x) + Math.abs(set.y);
}

let findClosestIntersection = (contents) => {
    let pathMap = [];
    contents.forEach((path, i) => {
        pathMap.push([]);
        let curX = 0;
        let curY = 0;
        path.forEach((pathPoint) => {
            [curX, curY] = convertToCoordinates(pathMap[i], pathPoint, curX, curY);
        });
    });
    let matches = findMatches(pathMap);
    let minimumDistance = matches.reduce((prev, cur) => {
        let dist = calcManhattanDistance(cur);
        if (dist < prev) prev = dist;
        return prev;
    },Number.MAX_VALUE);
    return minimumDistance;
}

readInput().then((contents) => {
    console.time("finding closest intersection");
    let minimum = findClosestIntersection(contents);
    console.log("Minimum Manhattan distance from port, part 1: ", minimum);
    console.timeEnd("finding closest intersection");
});
