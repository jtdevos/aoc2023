const { readLines } = require("../common");

//return the first digit from a line, scanning left to right
function firstNum(line) {
  const reDigit = /\d/;
  for (let idx = 0; idx < line.length; idx++) {
    if (reDigit.test(line[idx])) {
      return parseInt(line[idx]);
    }
  }
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function wordsToNums(str) {
  const numwords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  numwords.forEach((val, i) => {
    str.replace(val, `${i}`);
  });
}

// Part 1 Solution
(async function () {
  const data = await readLines("./day01/data/input1.txt");
  console.log("got data");

  var grandTotal = 0;
  for (line of data) {
    var num1 = firstNum(line);
    var num2 = firstNum(reverseString(line));
    var tot = num1 * 10 + num2;

    console.log(`line is: ${line},\t tot:${tot}`);

    grandTotal += tot;
  }
  console.log(`Grand total was: ${grandTotal}`);
})();

console.log("hello");
