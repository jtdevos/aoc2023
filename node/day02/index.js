const { readLines } = require("../common");
const { stringify } = JSON;

async function processFile(path) {
  const lines = await readLines(path);
  //split game name from scores
  const gamePairs = lines.map((line) => {
    const [gameid, gameline] = line.split(":");

    //split game line into subsets
    const subsets = gameline
      .trim()
      .split(";")
      .map((subsetline) => {
        //split subsets into count,color pairs
        const colorstrs = subsetline.trim().split(",");

        const cubePairs = colorstrs.map((colorstr) => {
          var [count, color] = colorstr.trim().split(" ");
          return [parseInt(count), color];
        });
        return cubePairs;
      });

    return [gameid, subsets];
  });
  return gamePairs;
}

function subsetIsPossible(bagstats, subset) {
  // console.log(` bagstats begin: ${stringify(bagstats)}`);
  // console.log(`subset provided: ${subset}`);
  for (combo of subset) {
    bagstats[combo[1]] -= combo[0];
  }
  // console.log(`   bagstats end: ${stringify(bagstats)}`);
  return bagstats.blue >= 0 && bagstats.red >= 0 && bagstats.green >= 0;
}

function getStats() {
  return bag = {
    red: 12,
    green: 13,
    blue: 14,
  };
}

// logic: game is possible if all subsets are possible
function gameIsPossible(game) {
  //determine if all the subsets in a game are possible
  var isPossible = true;
  game.forEach(subset => {
    isPossible = isPossible && subsetIsPossible(getStats(), subset);
  });
  return isPossible;
}

// logic game is possible if total number of cubes across all sets is possible 
function gameIsPossible2(game) {
  var stats = getStats();
  game.forEach( (subset) => {
    subset.forEach(([count, color])=>{
      // console.log(`color: ${color}\t count:${count}`);
      stats[color] -= count;
    });
  });
  var {red, green, blue} = stats;
  console.log(`stats: ${stringify(stats)}::red:${red} green:${green} blue:${blue}`);
  return red>=0 && green>=0 && blue>=0;
}

async function day2sample() {
  var pairs = await processFile("./day02/data/day02sample.txt");
  console.log(stringify(pairs, null, 2));
  var bag = {
    red: 12,
    green: 13,
    blue: 14,
  };
  var subset = [
    [2, "red"],
    [23, "blue"],
  ];
  var possible = subsetIsPossible(bag, subset);
  console.log(`Game is possible: ${possible}`);
};
//day2sample();

async function day2() {
  var pairs = await processFile("./day02/data/day02.txt");
  // var pairs = await processFile("./day02/data/day02sample.txt");

  var successCount = 0;
  var gameNum = 0;
  var gameSum = 0;
  for (pair of pairs) {
    gameNum++;

    var [gameid, game] = pair;
    var possible = gameIsPossible(game);
    console.log(`${gameid}: ${possible}`);
    if(possible) {
      successCount++;
      gameSum += gameNum;
    }
  }
  console.log(`\n\nsuccess count: ${successCount}, gamesum:${gameSum}`);
}


day2();