const { readLines } = require("../common");

async function processFile(path) {
  const lines = await readLines(path);
  //split game name from scores
  const gamePairs = lines.map((line) => {
    const [gameid, setsline] = line.split(":");

    return [gameid, setsline];
  });
  return gamePairs;
}

(async function () {
  console.log("about to read file");
  var pairs = await processFile("./day02/data/day02sample.txt");
  console.log("file read");
  console.log(pairs);
})();
