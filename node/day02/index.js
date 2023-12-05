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

function gameIsPossible(bagstats, subset) {
  console.log(` bagstats begin: ${stringify(bagstats)}`);
  console.log(`subset provided: ${subset}`);

  for (combo of subset) {
    bagstats[combo[1]] -= combo[0];
  }
  console.log(`   bagstats end: ${stringify(bagstats)}`);

  return bagstats.blue >= 0 && bagstats.red >= 0 && bagstats.green >= 0;
}

(async function () {
  console.log("about to read file");
  var pairs = await processFile("./day02/data/day02sample.txt");
  console.log("file read");
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
  var possible = gameIsPossible(bag, subset);
  console.log(`Game is possible: ${possible}`);
})();
